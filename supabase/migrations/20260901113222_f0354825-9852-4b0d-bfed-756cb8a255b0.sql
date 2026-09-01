-- 1. Move privileged role check into a non-API schema
create schema if not exists private;
revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated, service_role;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
revoke all on function private.has_role(uuid, public.app_role) from public, anon;
grant execute on function private.has_role(uuid, public.app_role) to authenticated, service_role;

-- 2. Repoint all policies to private.has_role
drop policy "Admins and editors can view all activities" on public.activities;
drop policy "Admins and editors can insert activities" on public.activities;
drop policy "Admins and editors can update activities" on public.activities;
drop policy "Admins can delete activities" on public.activities;
drop policy "Admins can view all roles" on public.user_roles;
drop policy "Admins can manage roles" on public.user_roles;
drop policy "Admins and editors can insert page content" on public.page_content;
drop policy "Admins and editors can update page content" on public.page_content;
drop policy "Admins can delete page content" on public.page_content;

create policy "Admins and editors can view all activities" on public.activities for select to authenticated
  using (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'));
create policy "Admins and editors can insert activities" on public.activities for insert to authenticated
  with check ((private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor')) and created_by = auth.uid());
create policy "Admins and editors can update activities" on public.activities for update to authenticated
  using (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'))
  with check (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'));
create policy "Admins can delete activities" on public.activities for delete to authenticated
  using (private.has_role(auth.uid(),'admin'));

create policy "Admins can view all roles" on public.user_roles for select to authenticated
  using (private.has_role(auth.uid(),'admin'));
create policy "Admins can manage roles" on public.user_roles for all to authenticated
  using (private.has_role(auth.uid(),'admin')) with check (private.has_role(auth.uid(),'admin'));

create policy "Admins and editors can insert page content" on public.page_content for insert to authenticated
  with check (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'));
create policy "Admins and editors can update page content" on public.page_content for update to authenticated
  using (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'))
  with check (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor'));
create policy "Admins can delete page content" on public.page_content for delete to authenticated
  using (private.has_role(auth.uid(),'admin'));

-- 3. public.has_role becomes a plain invoker wrapper (no more SECURITY DEFINER in the API schema)
drop function if exists public.has_role(uuid, public.app_role);
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select private.has_role(_user_id, _role)
$$;
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

-- 4. created_by defaults to the signed-in user
alter table public.activities alter column created_by set default auth.uid();

-- 5. Storage: only admins/editors may write activity images
drop policy if exists "Authenticated users can upload activity images" on storage.objects;
drop policy if exists "Authenticated users can update activity images" on storage.objects;
drop policy if exists "Authenticated users can delete activity images" on storage.objects;

create policy "Admins and editors can upload activity images" on storage.objects for insert to authenticated
  with check (bucket_id = 'activity-images' and (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor')));
create policy "Admins and editors can update activity images" on storage.objects for update to authenticated
  using (bucket_id = 'activity-images' and (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor')))
  with check (bucket_id = 'activity-images' and (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor')));
create policy "Admins and editors can delete activity images" on storage.objects for delete to authenticated
  using (bucket_id = 'activity-images' and (private.has_role(auth.uid(),'admin') or private.has_role(auth.uid(),'editor')));