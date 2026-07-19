
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL,
  content_key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (page_key, content_key)
);

GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page content"
  ON public.page_content FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can insert page content"
  ON public.page_content FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins and editors can update page content"
  ON public.page_content FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete page content"
  ON public.page_content FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
