
import * as z from "zod";

export const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Nama lengkap diperlukan"),
  gender: z.enum(["male", "female"], {
    required_error: "Pilih jenis kelamin",
  }),
  dateOfBirth: z.date({
    required_error: "Tanggal lahir diperlukan",
  }),
  placeOfBirth: z.string().min(1, "Tempat lahir diperlukan"),
  email: z.string().email("Alamat email tidak valid"),
  phone: z.string().min(1, "Nomor HP/WhatsApp diperlukan"),
  nisn: z.string().min(1, "NISN diperlukan"),
  nik: z.string().min(1, "NIK diperlukan"),
  address: z.string().min(1, "Alamat lengkap diperlukan"),
  district: z.string().min(1, "Kecamatan diperlukan"),
  city: z.string().min(1, "Kabupaten/Kota diperlukan"),
  province: z.string().min(1, "Provinsi diperlukan"),
  postalCode: z.string().min(1, "Kode pos diperlukan"),
  
  // Educational Background
  previousSchool: z.string().min(1, "Nama sekolah asal diperlukan"),
  schoolAddress: z.string().min(1, "Alamat sekolah asal diperlukan"),
  schoolDistrict: z.string().min(1, "Kecamatan sekolah diperlukan"),
  schoolCity: z.string().min(1, "Kabupaten sekolah diperlukan"),
  schoolProvince: z.string().min(1, "Provinsi sekolah diperlukan"),
  graduationYear: z.string().min(1, "Tahun kelulusan diperlukan"),
  
  // Program Selection
  program: z.enum(["islamic-studies", "tahfidz", "academic-islamic", "leadership"], {
    required_error: "Pilih program",
  }),
  
  // Family Information
  familyCardNumber: z.string().min(1, "Nomor Kartu Keluarga diperlukan"),
  
  // Father Information
  fatherName: z.string().min(1, "Nama ayah diperlukan"),
  fatherStatus: z.enum(["alive", "deceased"], {
    required_error: "Pilih status hidup ayah",
  }),
  fatherNik: z.string().min(1, "NIK ayah diperlukan"),
  fatherOccupation: z.string().min(1, "Pekerjaan ayah diperlukan"),
  
  // Mother Information
  motherName: z.string().min(1, "Nama ibu diperlukan"),
  motherStatus: z.enum(["alive", "deceased"], {
    required_error: "Pilih status hidup ibu",
  }),
  motherNik: z.string().min(1, "NIK ibu diperlukan"),
  motherEducation: z.string().min(1, "Pendidikan ibu diperlukan"),
  
  // Parents Income
  parentsIncome: z.enum(["below_1M", "1M_3M", "3M_5M", "5M_10M", "above_10M"], {
    required_error: "Pilih penghasilan orang tua",
  }),
  
  // Additional Information
  healthConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  
  // Additional Information
  howDidYouHear: z.string().optional(),
  additionalNotes: z.string().optional(),
  
  // Agreement
  agreeTerms: z.boolean().refine(value => value === true, {
    message: "Anda harus menyetujui syarat dan ketentuan",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
