// Manifest of editable content fields for CMS pages.
// Keep keys stable — they map to rows in public.page_content.

export type FieldType = 'text' | 'textarea' | 'image';

export interface ContentField {
  key: string;
  label: string;
  type: FieldType;
  defaultValue: string;
  helper?: string;
}

export interface PageManifest {
  key: string;
  label: string;
  fields: ContentField[];
}

export const PAGE_MANIFESTS: PageManifest[] = [
  {
    key: 'beranda',
    label: 'Beranda',
    fields: [
      { key: 'hero_badge', label: 'Badge Hero', type: 'text', defaultValue: 'Penerimaan Santri Baru 2026/2027 dibuka' },
      { key: 'hero_title_line1', label: 'Judul Hero — Baris 1', type: 'text', defaultValue: 'Menempa generasi' },
      { key: 'hero_title_line2', label: 'Judul Hero — Baris 2 (kata "Rabbani" akan dicetak miring gold)', type: 'text', defaultValue: 'Rabbani yang' },
      { key: 'hero_title_line3', label: 'Judul Hero — Baris 3', type: 'text', defaultValue: 'berpijak pada Sunnah.' },
      { key: 'hero_desc', label: 'Deskripsi Hero', type: 'textarea', defaultValue: 'Pondok Pesantren Irsyadul Haq Manado mendidik santri dengan Al-Qur’an, As-Sunnah, dan pemahaman Salafush Shalih — dipadu akademik modern dan pembinaan karakter yang utuh.' },
      { key: 'hero_cta_primary', label: 'Tombol Utama', type: 'text', defaultValue: 'Daftar Santri Baru' },
      { key: 'hero_cta_secondary', label: 'Tombol Kedua', type: 'text', defaultValue: 'Kenali Pesantren' },
      { key: 'hero_image', label: 'Gambar Hero', type: 'image', defaultValue: 'https://ik.imagekit.io/uzuuvayyu/building_LixplpNC1?updatedAt=1742674414873' },

      { key: 'stat1_value', label: 'Statistik 1 — Nilai', type: 'text', defaultValue: '2021' },
      { key: 'stat1_label', label: 'Statistik 1 — Label', type: 'text', defaultValue: 'Tahun Didirikan' },
      { key: 'stat2_value', label: 'Statistik 2 — Nilai', type: 'text', defaultValue: '25+' },
      { key: 'stat2_label', label: 'Statistik 2 — Label', type: 'text', defaultValue: 'Santri Aktif' },
      { key: 'stat3_value', label: 'Statistik 3 — Nilai', type: 'text', defaultValue: '7+' },
      { key: 'stat3_label', label: 'Statistik 3 — Label', type: 'text', defaultValue: 'Pengajar' },
      { key: 'stat4_value', label: 'Statistik 4 — Nilai', type: 'text', defaultValue: '2' },
      { key: 'stat4_label', label: 'Statistik 4 — Label', type: 'text', defaultValue: 'Program Unggulan' },

      { key: 'ppdb_title', label: 'PPDB — Judul', type: 'text', defaultValue: 'Penerimaan Murid Baru 2026/2027' },
      { key: 'ppdb_desc', label: 'PPDB — Deskripsi', type: 'textarea', defaultValue: 'Sistem Penerimaan Murid Baru (SPMB) Pondok Pesantren Irsyadul Haq telah dibuka. Bergabung dan mulai perjalanan menuntut ilmu bersama kami.' },
      { key: 'ppdb_image', label: 'PPDB — Gambar Brosur', type: 'image', defaultValue: 'https://ik.imagekit.io/uzuuvayyu/brosur%20pesantren%20PPDB%2026%20-%2027.png?updatedAt=1762378813879' },

      { key: 'programs_title', label: 'Program — Judul', type: 'text', defaultValue: 'Pendidikan Islam yang komprehensif.' },
      { key: 'programs_subtitle', label: 'Program — Subjudul', type: 'textarea', defaultValue: 'Membina santri secara intelektual, spiritual, dan sosial dalam satu ekosistem pendidikan yang utuh.' },
      { key: 'program1_title', label: 'Program 1 — Judul', type: 'text', defaultValue: 'Tahfidz Al-Qur’an' },
      { key: 'program1_desc', label: 'Program 1 — Deskripsi', type: 'textarea', defaultValue: 'Program menghafal Al-Qur’an dengan metode terstruktur, tajwid yang benar, dan bimbingan intensif.' },
      { key: 'program2_title', label: 'Program 2 — Judul', type: 'text', defaultValue: 'Pendidikan Formal' },
      { key: 'program2_desc', label: 'Program 2 — Deskripsi', type: 'textarea', defaultValue: 'Kurikulum MTs terpadu yang menyeimbangkan ilmu agama dan pengetahuan umum sesuai standar nasional.' },
      { key: 'program3_title', label: 'Program 3 — Judul', type: 'text', defaultValue: 'Pembentukan Karakter' },
      { key: 'program3_desc', label: 'Program 3 — Deskripsi', type: 'textarea', defaultValue: 'Adab, akhlak, dan kepemimpinan santri dibina melalui keseharian yang berlandaskan Sunnah.' },

      { key: 'about_title', label: 'Tentang — Judul', type: 'text', defaultValue: 'Warisan ilmu, dijaga dengan ketulusan.' },
      { key: 'about_desc', label: 'Tentang — Deskripsi', type: 'textarea', defaultValue: 'Sejak 2021, Pondok Pesantren Irsyadul Haq Manado berdedikasi membentuk santri berilmu, beramal, dan berdakwah dengan cara yang benar sesuai pemahaman Salafush Shalih.' },
      { key: 'about_image1', label: 'Tentang — Gambar 1', type: 'image', defaultValue: 'https://ik.imagekit.io/uzuuvayyu/1709315665488.jpg?updatedAt=1742526194093' },
      { key: 'about_image2', label: 'Tentang — Gambar 2', type: 'image', defaultValue: 'https://ik.imagekit.io/uzuuvayyu/building_LixplpNC1?updatedAt=1742674414873' },

      { key: 'cta_title', label: 'CTA — Judul', type: 'textarea', defaultValue: 'Mulai perjalanan santri anda bersama Irsyadul Haq.' },
      { key: 'cta_desc', label: 'CTA — Deskripsi', type: 'textarea', defaultValue: 'Bergabunglah dengan komunitas pendidikan yang mendidik hati, akal, dan akhlak di atas bimbingan Al-Qur’an dan As-Sunnah.' },
    ],
  },
  {
    key: 'tentang',
    label: 'Tentang',
    fields: [
      { key: 'hero_badge', label: 'Badge Hero', type: 'text', defaultValue: 'Our Story' },
      { key: 'hero_title', label: 'Judul Hero', type: 'text', defaultValue: 'About Irsyadul Haq Manado' },
      { key: 'hero_desc', label: 'Deskripsi Hero', type: 'textarea', defaultValue: 'Learn about our journey, mission, and vision in providing exceptional Islamic education.' },

      { key: 'story_title', label: 'Sejarah — Judul', type: 'text', defaultValue: 'A Legacy of Islamic Education Excellence' },
      { key: 'story_p1', label: 'Sejarah — Paragraf 1', type: 'textarea', defaultValue: 'Pesantren Irsyadul Haq didirikan pada tahun 2021 dengan visi Mencetak generasi Rabbani dan Beraqidah lurus yang berlandaskan Al Qur\'an dan As sunnah sebagaimana Pemahaman Salafush Shalih.' },
      { key: 'story_p2', label: 'Sejarah — Paragraf 2', type: 'textarea', defaultValue: 'Dimulai dengan hanya 5 Santri dan 3 Ustadz di tempat sederhana, pesantren kami telah berkembang menjadi Pesantren ternama dengan lebih dari 20 Santri, fasilitas modern, dan kurikulum komprehensif yang menyeimbangkan studi Islam dengan keunggulan akademis.' },
      { key: 'story_p3', label: 'Sejarah — Paragraf 3', type: 'textarea', defaultValue: 'Selama ini, kami tetap berkomitmen pada prinsip-prinsip dasar kami sambil beradaptasi dengan lanskap pendidikan yang terus berubah. Saat ini, Irsyadulhaq berdiri sebagai bukti dedikasi kami untuk menyediakan pendidikan Islam berkualitas yang mempersiapkan Santri untuk sukses di dunia dan akhirat.' },
      { key: 'story_image', label: 'Sejarah — Gambar', type: 'image', defaultValue: 'https://ik.imagekit.io/uzuuvayyu/WhatsApp%20Image%202025-02-22%20at%209.56.40%20AM.jpeg?updatedAt=1742526180427' },

      { key: 'vision_title', label: 'Visi — Judul', type: 'text', defaultValue: 'Our Vision' },
      { key: 'vision_desc', label: 'Visi — Deskripsi', type: 'textarea', defaultValue: 'Mencetak generasi Rabbani dan Beraqidah lurus yang berlandaskan Al Qur\'an dan As sunnah sebagaimana Pemahaman Salafush Shalih' },
      { key: 'mission_title', label: 'Misi — Judul', type: 'text', defaultValue: 'Our Mission' },
      { key: 'mission_intro', label: 'Misi — Intro', type: 'textarea', defaultValue: 'Our guiding principles and aspirations for the future.' },

      { key: 'cta_title', label: 'CTA — Judul', type: 'text', defaultValue: 'Join Our Community' },
      { key: 'cta_desc', label: 'CTA — Deskripsi', type: 'textarea', defaultValue: 'Become part of our growing family at Irsyadulhaq Islamic Boarding School. Applications for the upcoming academic year are now open.' },
    ],
  },
  {
    key: 'organisasi',
    label: 'Organisasi',
    fields: [
      { key: 'hero_badge', label: 'Badge Hero', type: 'text', defaultValue: 'Our Organization' },
      { key: 'hero_title', label: 'Judul Hero', type: 'text', defaultValue: 'Organizational Structure' },
      { key: 'hero_desc', label: 'Deskripsi Hero', type: 'textarea', defaultValue: 'Meet the dedicated team of professionals who lead Irsyadulhaq Islamic Boarding School.' },

      { key: 'leadership_title', label: 'Pengasuh — Judul', type: 'text', defaultValue: 'Pengasuh Pondok Pesanten Irsyadul Haq' },
      { key: 'leadership_desc', label: 'Pengasuh — Deskripsi', type: 'textarea', defaultValue: 'Our school is guided by experienced leaders committed to excellence in Islamic education.' },

      // Six leadership cards
      ...([1, 2, 3, 4, 5, 6].flatMap((n) => {
        const defaults = [
          { name: 'Andi Frans Maramis (Abu Surya)', position: 'Ketua Yayasan', education: 'Al-Azhar University', experience: 'Ketua Yayasan Manarul Ilmi' },
          { name: 'Ustadz Sofyan Chalid bin Idham Ruray, Lc Hafizhahullah', position: 'Pembina Pondok', education: 'Alumni LIPIA Universitas Muhammad bin Su’ud Al-Islamiyah Arab Saudi', experience: 'Pembina Pondok Pesantren' },
          { name: 'Ustadz Sofyan Ahmad Madiu, Hafizhahullah', position: 'Pembina Pondok', education: 'Alumni Universitas Islamabad Pakistan', experience: 'Pembina Pondok Pesantren' },
          { name: 'Ustadz Rosihan Anwar, SP.d', position: 'Mudir Pondok', education: 'Sarjana Pendidikan Institut Agama Islam', experience: 'Mudir Pesantren' },
          { name: 'Hadi Supriyanto, SE', position: 'Kepala Madrasah', education: 'Sarjana Ekonomi Universitas Samratulangi', experience: 'Kepala Madrasah Pesantren' },
          { name: "Ustadz Abu Sa'id Hafizhahullah", position: 'Pengasuh Santri', education: 'Alumni Pondok Pesantren', experience: 'Pengasuh Santri Pensatren' },
        ][n - 1];
        return [
          { key: `leader${n}_name`, label: `Pengasuh ${n} — Nama`, type: 'text' as FieldType, defaultValue: defaults.name },
          { key: `leader${n}_position`, label: `Pengasuh ${n} — Jabatan`, type: 'text' as FieldType, defaultValue: defaults.position },
          { key: `leader${n}_education`, label: `Pengasuh ${n} — Pendidikan`, type: 'text' as FieldType, defaultValue: defaults.education },
          { key: `leader${n}_experience`, label: `Pengasuh ${n} — Pengalaman`, type: 'text' as FieldType, defaultValue: defaults.experience },
          { key: `leader${n}_photo`, label: `Pengasuh ${n} — Foto`, type: 'image' as FieldType, defaultValue: 'https://ik.imagekit.io/uzuuvayyu/250x250%20px.jpg?updatedAt=1742526171703' },
        ];
      })),

      { key: 'contact_title', label: 'Kontak — Judul', type: 'text', defaultValue: 'Would You Like to Visit Our Campus?' },
      { key: 'contact_desc', label: 'Kontak — Deskripsi', type: 'textarea', defaultValue: 'Schedule a tour to visit our campus and meet with our faculty and staff members.' },
    ],
  },
];

export const getManifest = (pageKey: string) =>
  PAGE_MANIFESTS.find((p) => p.key === pageKey);
