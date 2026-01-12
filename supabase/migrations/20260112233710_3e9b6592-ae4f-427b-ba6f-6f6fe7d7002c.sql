-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create activities table for Kegiatan Santri
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    time TEXT,
    location TEXT,
    participants TEXT,
    media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    media_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on activities
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Public can view published activities
CREATE POLICY "Anyone can view published activities"
ON public.activities
FOR SELECT
USING (is_published = true);

-- Admins and editors can view all activities
CREATE POLICY "Admins and editors can view all activities"
ON public.activities
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

-- Admins and editors can insert activities
CREATE POLICY "Admins and editors can insert activities"
ON public.activities
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

-- Admins and editors can update activities
CREATE POLICY "Admins and editors can update activities"
ON public.activities
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'editor')
);

-- Only admins can delete activities
CREATE POLICY "Admins can delete activities"
ON public.activities
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_activities_updated_at
BEFORE UPDATE ON public.activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial activities data
INSERT INTO public.activities (title, description, date, time, location, participants, media_type, media_url) VALUES
('Kajian Tafsir Al-Quran', 'Kajian mendalam tentang tafsir Al-Quran dengan menggunakan pendekatan klasik dan kontemporer.', '15 Januari 2025', '08:00 - 10:00', 'Masjid Utama', 'Seluruh Santri', 'image', 'https://ik.imagekit.io/uzuuvayyu/3.jpeg?updatedAt=1749089018271'),
('Pembiasaan Bahasa Inggris', 'Kegiatan percakapan santri dalam bahasa Inggris Hari Kemerdekaan Indonesia.', '17 Agustus 2025', '14:00 - 17:00', 'Aula Pesantren', 'Santri Tahfidz', 'video', 'https://youtube.com/embed/6NO0tb6TcVo'),
('Pembiasaan Bahasa Arab', 'Kegiatan percakapan santri dalam bahasa Arab.', '28 Januari 2025', '06:00 - 12:00', 'Desa Sekitar', 'Santri Kelas Atas', 'video', 'https://youtube.com/embed/ooKSulHGEu8'),
('Menulis Al-Quran', 'Belajar menulis indah dengan huruf Arab.', '5 Februari 2025', '19:30 - 21:00', 'Ruang Kelas', 'Santri Senior', 'video', 'https://www.youtube.com/embed/LAtHFfhg4Y4'),
('Rihlah Santri dan Pembina', 'Perjalanan edukatif mengunjungi tempat-tempat bersejarah Islam untuk memperluas wawasan.', '19 Agustus 2025', '09:00 - 17:00', 'Pantai Ranowangko', 'Seluruh Santri', 'video', 'https://www.youtube.com/embed/Sz7dCHaLST8'),
('Kerja Bakti', 'Kerja Bakti santri bersama ustadz dan pembina.', '18 Februari 2025', '13:00 - 16:00', 'Halaman Pesantren', 'Santri Berbakat', 'video', 'https://youtube.com/embed/hxn-tJaa5FY');