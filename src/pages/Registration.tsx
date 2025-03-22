import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Info, CalendarIcon } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import PatternBackground from '@/components/ui/PatternBackground';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

const Registration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxEzSJ7GkECBJ_hFe4EGhcmqe9pmCTfgPCvvYB0cEC8oVr8BHjnnz0hKJXCUAxYL5MFbQ/exec';
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: undefined,
      dateOfBirth: undefined,
      placeOfBirth: "",
      email: "",
      phone: "",
      nisn: "",
      nik: "",
      address: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",
      previousSchool: "",
      schoolAddress: "",
      schoolDistrict: "",
      schoolCity: "",
      schoolProvince: "",
      graduationYear: "",
      program: undefined,
      familyCardNumber: "",
      fatherName: "",
      fatherStatus: undefined,
      fatherNik: "",
      fatherOccupation: "",
      motherName: "",
      motherStatus: undefined,
      motherNik: "",
      motherEducation: "",
      parentsIncome: undefined,
      healthConditions: "",
      allergies: "",
      medications: "",
      howDidYouHear: "",
      additionalNotes: "",
      agreeTerms: false,
    },
  });
  
  const nextStep = () => {
    const fieldsByStep = {
      1: ['fullName', 'gender', 'dateOfBirth', 'placeOfBirth', 'email', 'phone', 'nisn', 'nik', 'address', 'district', 'city', 'province', 'postalCode'] as const,
      2: ['previousSchool', 'schoolAddress', 'schoolDistrict', 'schoolCity', 'schoolProvince', 'graduationYear'] as const,
      3: ['program'] as const,
      4: ['familyCardNumber', 'fatherName', 'fatherStatus', 'fatherNik', 'fatherOccupation', 'motherName', 'motherStatus', 'motherNik', 'motherEducation', 'parentsIncome'] as const,
    };

    form.trigger(fieldsByStep[step as keyof typeof fieldsByStep]).then((valid) => {
      if (valid) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        toast({
          title: "Data Tidak Lengkap",
          description: "Mohon lengkapi semua field yang diperlukan.",
          variant: "destructive",
        });
      }
    });
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit = async (data: FormValues) => {
    if (!data.agreeTerms) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Mohon setujui syarat dan ketentuan.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const spreadsheetData = {
        timestamp: new Date().toISOString(),
        fullName: data.fullName,
        gender: data.gender === 'male' ? 'Laki-laki' : 'Perempuan',
        dateOfBirth: data.dateOfBirth,
        placeOfBirth: data.placeOfBirth || "",
        email: data.email,
        phone: data.phone,
        nisn: data.nisn,
        nik: data.nik,
        address: data.address,
        district: data.district,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        previousSchool: data.previousSchool,
        schoolAddress: data.schoolAddress,
        schoolDistrict: data.schoolDistrict,
        schoolCity: data.schoolCity,
        schoolProvince: data.schoolProvince,
        graduationYear: data.graduationYear,
        program: data.program === 'islamic-studies' ? 'Program Studi Islam' :
                 data.program === 'tahfidz' ? 'Program Tahfidz Quran' :
                 data.program === 'academic-islamic' ? 'Program Terpadu Akademik-Islam' :
                 data.program === 'leadership' ? 'Program Kepemimpinan Islam' : '',
        familyCardNumber: data.familyCardNumber,
        fatherName: data.fatherName,
        fatherStatus: data.fatherStatus === 'alive' ? 'Hidup' : 'Meninggal',
        fatherNik: data.fatherNik,
        fatherOccupation: data.fatherOccupation,
        motherName: data.motherName,
        motherStatus: data.motherStatus === 'alive' ? 'Hidup' : 'Meninggal',
        motherNik: data.motherNik,
        motherEducation: data.motherEducation,
        parentsIncome: data.parentsIncome === 'below_1M' ? 'Di bawah 1 juta' :
                      data.parentsIncome === '1M_3M' ? '1 juta - 3 juta' :
                      data.parentsIncome === '3M_5M' ? '3 juta - 5 juta' :
                      data.parentsIncome === '5M_10M' ? '5 juta - 10 juta' :
                      data.parentsIncome === 'above_10M' ? 'Di atas 10 juta' : '',
        healthConditions: data.healthConditions || "Tidak Ada",
        allergies: data.allergies || "Tidak Ada",
        medications: data.medications || "Tidak Ada",
        howDidYouHear: data.howDidYouHear || "",
        additionalNotes: data.additionalNotes || ""
      };
      
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spreadsheetData),
      });
      
      console.log('Form submitted to Google Sheets');
      
      toast({
        title: "Pendaftaran Terkirim!",
        description: "Terima kasih atas pendaftaran Anda. Kami akan menghubungi Anda segera.",
      });
      
      setStep(6);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengirim formulir. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const steps = [
    { number: 1, title: 'Informasi Pribadi' },
    { number: 2, title: 'Latar Belakang Pendidikan' },
    { number: 3, title: 'Pilihan Program' },
    { number: 4, title: 'Informasi Keluarga' },
    { number: 5, title: 'Tinjauan & Kirim' },
  ];
  
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
          <PatternBackground className="absolute inset-0 -z-10 opacity-30" patternType="dots" patternColor="#ffffff" patternOpacity={0.1} />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSectionWrapper className="text-center mb-8">
              <span className="inline-block px-4 py-1 mb-4 rounded-full bg-islamic-gold/20 text-islamic-cream text-sm font-medium">
                Bergabung dengan Komunitas Kami
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                Pendaftaran Santri
              </h1>
              <p className="text-islamic-cream/90 max-w-2xl mx-auto mb-6">
                Lengkapi formulir di bawah ini untuk mendaftar di Pondok Pesantren Islam Irsyadulhaq.
              </p>
            </AnimatedSectionWrapper>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <div className="hidden md:flex justify-between items-center max-w-3xl mx-auto mb-8">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step === s.number ? 'bg-islamic-teal text-white' : step > s.number ? 'bg-islamic-teal/20 text-islamic-teal' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step > s.number ? <CheckCircle2 size={20} /> : s.number}
                    </div>
                    <span 
                      className={`mt-2 text-sm ${
                        step === s.number ? 'text-islamic-teal font-medium' : step > s.number ? 'text-islamic-teal' : 'text-gray-400'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="md:hidden flex items-center justify-center mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-islamic-teal text-white"
                >
                  {step}
                </div>
                <span className="ml-3 text-lg font-medium text-islamic-teal">
                  {steps.find(s => s.number === step)?.title}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 h-2 rounded-full max-w-3xl mx-auto">
                <div 
                  className="bg-islamic-teal h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(step / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {step === 6 ? (
                <AnimatedSectionWrapper animation="scale-in" className="glass-card p-8 rounded-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-islamic-teal/20 flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-islamic-teal" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-islamic-navy mb-4">
                    Pendaftaran Berhasil Dikirim!
                  </h2>
                  <p className="text-islamic-slate mb-8">
                    Terima kasih telah mendaftar di Pondok Pesantren Islam Irsyadulhaq. Pendaftaran Anda telah diterima dan akan segera kami tinjau. Anda akan menerima email konfirmasi dengan petunjuk lebih lanjut.
                  </p>
                  <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start mb-8">
                    <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-islamic-slate">
                      ID pendaftaran Anda adalah <span className="font-medium">IH-{Math.floor(Math.random() * 900000) + 100000}</span>. Harap simpan nomor ini untuk referensi di masa mendatang. Jika Anda memiliki pertanyaan, silakan hubungi kantor penerimaan kami.
                    </p>
                  </div>
                  <a href="/" className="btn-primary inline-flex items-center space-x-2">
                    <span>Kembali ke Beranda</span>
                    <ChevronRight size={18} />
                  </a>
                </AnimatedSectionWrapper>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card p-8 rounded-lg">
                    {step === 1 && (
                      <AnimatedSectionWrapper animation="fade-in">
                        <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                          Informasi Pribadi
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-6 mb-8">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Calon Santri (Sesuai Ijazah) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan nama lengkap" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Jenis Kelamin *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="male" id="male" />
                                      <Label htmlFor="male">Laki-laki</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="female" id="female" />
                                      <Label htmlFor="female">Perempuan</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="dateOfBirth"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Tanggal Lahir (Sesuai Ijazah) *</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <button
                                          className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "dd MMMM yyyy")
                                          ) : (
                                            <span>Pilih tanggal</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        className={cn("p-3 pointer-events-auto")}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="placeOfBirth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tempat Lahir *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan tempat lahir" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="nisn"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>NISN (Sesuai Ijazah) *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan NISN" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="nik"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>NIK Calon Santri (Sesuai Kartu Keluarga) *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan NIK" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan alamat email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nomor HP / Nomor WhatsApp *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan nomor HP/WhatsApp" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <h3 className="text-lg font-display font-semibold text-islamic-navy mt-4 mb-2">
                            Alamat Lengkap
                          </h3>
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Alamat *</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Masukkan alamat lengkap" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="district"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kecamatan *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan kecamatan" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kabupaten/Kota *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan kabupaten/kota" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="province"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Provinsi *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan provinsi" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="postalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kode Pos *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan kode pos" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary inline-flex items-center space-x-2"
                          >
                            <span>Langkah Selanjutnya</span>
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </AnimatedSectionWrapper>
                    )}
                    
                    {step === 2 && (
                      <AnimatedSectionWrapper animation="fade-in">
                        <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                          Latar Belakang Pendidikan
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-6 mb-8">
                          <FormField
                            control={form.control}
                            name="previousSchool"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Sekolah Asal (harus jelas dan lengkap) *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan nama sekolah asal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="schoolAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Alamat Sekolah Asal *</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Masukkan alamat sekolah asal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="schoolDistrict"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kecamatan *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan kecamatan" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="schoolCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kabupaten *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan kabupaten" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="schoolProvince"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Provinsi *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan provinsi" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="graduationYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tahun Kelulusan *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan tahun kelulusan" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="p-4 rounded-lg bg-islamic-teal/10 flex items-start">
                            <Info size={20} className="text-islamic-teal mt-0.5 mr-3 flex-shrink-0" />
                            <p className="text-sm text-islamic-slate">
                              Harap siapkan berkas transkrip akademik dan ijazah dari sekolah asal Anda untuk proses verifikasi pada tahap selanjutnya.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Langkah Sebelumnya
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary inline-flex items-center space-x-2"
                          >
                            <span>Langkah Selanjutnya</span>
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </AnimatedSectionWrapper>
                    )}
                    
                    {step === 3 && (
                      <AnimatedSectionWrapper animation="fade-in">
                        <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                          Pilihan Program
                        </h2>
                        
                        <div className="mb-8">
                          <p className="text-islamic-slate mb-6">
                            Silakan pilih program yang ingin Anda ikuti. Setiap program memiliki kurikulum dan fokus yang berbeda.
                          </p>
                          
                          <FormField
                            control={form.control}
                            name="program"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-4"
                                  >
                                    {[
                                      {
                                        value: 'islamic-studies',
                                        title: 'Program Studi Islam',
                                        description: 'Fokus pada ilmu keislaman, Al-Quran, Hadits, dan Fiqih.',
                                      },
                                      {
                                        value: 'tahfidz',
                                        title: 'Program Tahfidz Quran',
                                        description: 'Program intensif menghafal Al-Quran dengan pendampingan studi Islam pendukung.',
                                      },
                                      {
                                        value: 'academic-islamic',
                                        title: 'Program Terpadu Akademik-Islam',
                                        description: 'Kurikulum seimbang antara mata pelajaran akademik dan studi Islam.',
                                      },
                                      {
                                        value: 'leadership',
                                        title: 'Program Kepemimpinan Islam',
                                        description: 'Fokus pada pengembangan keterampilan kepemimpinan Islami bersama studi reguler.',
                                      },
                                    ].map((programOption) => (
                                      <div 
                                        key={programOption.value}
                                        className={`p-4 border rounded-lg transition-all duration-300 ${
                                          field.value === programOption.value 
                                            ? 'border-islamic-teal bg-islamic-teal/5' 
                                            : 'border-gray-200 hover:border-islamic-teal/50'
                                        }`}
                                      >
                                        <div className="flex items-start">
                                          <RadioGroupItem value={programOption.value} id={programOption.value} className="mt-1 mr-3" />
                                          <div>
                                            <Label htmlFor={programOption.value} className="font-medium text-islamic-navy">
                                              {programOption.title}
                                            </Label>
                                            <p className="text-sm text-islamic-slate mt-1">
                                              {programOption.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Langkah Sebelumnya
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary inline-flex items-center space-x-2"
                          >
                            <span>Langkah Selanjutnya</span>
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </AnimatedSectionWrapper>
                    )}
                    
                    {step === 4 && (
                      <AnimatedSectionWrapper animation="fade-in">
                        <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                          Informasi Keluarga
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-6 mb-8">
                          <FormField
                            control={form.control}
                            name="familyCardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nomor Kartu Keluarga *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan nomor kartu keluarga" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <h3 className="text-lg font-display font-semibold text-islamic-navy mt-4 mb-2">
                            Data Ayah
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="fatherName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nama Ayah *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan nama ayah" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="fatherStatus"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Status Hidup *</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="alive" id="father-alive" />
                                        <Label htmlFor="father-alive">Masih Hidup</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="deceased" id="father-deceased" />
                                        <Label htmlFor="father-deceased">Sudah Meninggal</Label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="fatherNik"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nomor KTP/NIK Ayah *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan nomor KTP/NIK ayah" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="fatherOccupation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Pekerjaan Ayah *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan pekerjaan ayah" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <h3 className="text-lg font-display font-semibold text-islamic-navy mt-4 mb-2">
                            Data Ibu
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="motherName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nama Ibu *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan nama ibu" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="motherStatus"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Status Hidup *</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="alive" id="mother-alive" />
                                        <Label htmlFor="mother-alive">Masih Hidup</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="deceased" id="mother-deceased" />
                                        <Label htmlFor="mother-deceased">Sudah Meninggal</Label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="motherNik"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nomor KTP/NIK Ibu *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan nomor KTP/NIK ibu" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="motherEducation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Pendidikan Ibu *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Masukkan pendidikan terakhir ibu" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="parentsIncome"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Penghasilan Orang Tua (per bulan) *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="below_1M" id="income-below-1m" />
                                      <Label htmlFor="income-below-1m">Di bawah 1 juta rupiah</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="1M_3M" id="income-1m-3m" />
                                      <Label htmlFor="income-1m-3m">1 juta - 3 juta rupiah</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="3M_5M" id="income-3m-5m" />
                                      <Label htmlFor="income-3m-5m">3 juta - 5 juta rupiah</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="5M_10M" id="income-5m-10m" />
                                      <Label htmlFor="income-5m-10m">5 juta - 10 juta rupiah</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="above_10M" id="income-above-10m" />
                                      <Label htmlFor="income-above-10m">Di atas 10 juta rupiah</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Langkah Sebelumnya
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary inline-flex items-center space-x-2"
                          >
                            <span>Langkah Selanjutnya</span>
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </AnimatedSectionWrapper>
                    )}
                    
                    {step === 5 && (
                      <AnimatedSectionWrapper animation="fade-in">
                        <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
                          Tinjauan & Kirim
                        </h2>
                        
                        <div className="mb-8">
                          <p className="text-islamic-slate mb-6">
                            Silakan tinjau informasi Anda sebelum mengirimkan pendaftaran. Anda dapat kembali ke langkah sebelumnya untuk melakukan perubahan jika diperlukan.
                          </p>
                          
                          <div className="space-y-6">
                            <div className="p-4 rounded-lg border border-gray-200">
                              <h3 className="font-medium text-islamic-navy mb-3">Informasi Pribadi</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div>
                                  <span className="text-islamic-slate">Nama Lengkap:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("fullName")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Jenis Kelamin:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("gender") === 'male' ? 'Laki-laki' : form.getValues("gender") === 'female' ? 'Perempuan' : ''}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Tanggal Lahir:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("dateOfBirth") ? format(form.getValues("dateOfBirth"), 'dd MMMM yyyy') : ''}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Tempat Lahir:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("placeOfBirth")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Email:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("email")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Telepon:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("phone")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">NISN:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("nisn")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">NIK:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("nik")}</span>
                                </div>
                                <div className="md:col-span-2">
                                  <span className="text-islamic-slate">Alamat:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("address")}, {form.getValues("district")}, {form.getValues("city")}, {form.getValues("province")}, {form.getValues("postalCode")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-lg border border-gray-200">
                              <h3 className="font-medium text-islamic-navy mb-3">Latar Belakang Pendidikan</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div>
                                  <span className="text-islamic-slate">Sekolah Sebelumnya:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("previousSchool")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Tahun Kelulusan:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("graduationYear")}</span>
                                </div>
                                <div className="md:col-span-2">
                                  <span className="text-islamic-slate">Alamat Sekolah:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("schoolAddress")}, {form.getValues("schoolDistrict")}, {form.getValues("schoolCity")}, {form.getValues("schoolProvince")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-lg border border-gray-200">
                              <h3 className="font-medium text-islamic-navy mb-3">Pilihan Program</h3>
                              <div className="text-sm">
                                <span className="text-islamic-slate">Program Terpilih:</span>
                                <span className="ml-2 text-islamic-navy">
                                  {form.getValues("program") === 'islamic-studies' && 'Program Studi Islam'}
                                  {form.getValues("program") === 'tahfidz' && 'Program Tahfidz Quran'}
                                  {form.getValues("program") === 'academic-islamic' && 'Program Terpadu Akademik-Islam'}
                                  {form.getValues("program") === 'leadership' && 'Program Kepemimpinan Islam'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-4 rounded-lg border border-gray-200">
                              <h3 className="font-medium text-islamic-navy mb-3">Informasi Keluarga</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <div>
                                  <span className="text-islamic-slate">Nomor Kartu Keluarga:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("familyCardNumber")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Nama Ayah:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("fatherName")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Status Ayah:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("fatherStatus") === 'alive' ? 'Masih Hidup' : 
                                     form.getValues("fatherStatus") === 'deceased' ? 'Sudah Meninggal' : ''}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">NIK Ayah:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("fatherNik")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Pekerjaan Ayah:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("fatherOccupation")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Nama Ibu:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("motherName")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Status Ibu:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("motherStatus") === 'alive' ? 'Masih Hidup' : 
                                     form.getValues("motherStatus") === 'deceased' ? 'Sudah Meninggal' : ''}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">NIK Ibu:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("motherNik")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Pendidikan Ibu:</span>
                                  <span className="ml-2 text-islamic-navy">{form.getValues("motherEducation")}</span>
                                </div>
                                <div>
                                  <span className="text-islamic-slate">Penghasilan Orang Tua:</span>
                                  <span className="ml-2 text-islamic-navy">
                                    {form.getValues("parentsIncome") === 'below_1M' ? 'Di bawah 1 juta rupiah' :
                                     form.getValues("parentsIncome") === '1M_3M' ? '1 juta - 3 juta rupiah' :
                                     form.getValues("parentsIncome") === '3M_5M' ? '3 juta - 5 juta rupiah' :
                                     form.getValues("parentsIncome") === '5M_10M' ? '5 juta - 10 juta rupiah' :
                                     form.getValues("parentsIncome") === 'above_10M' ? 'Di atas 10 juta rupiah' : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-8 mb-6">
                            <FormField
                              control={form.control}
                              name="agreeTerms"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="mt-1"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Saya menyatakan bahwa semua informasi di atas benar dan setuju untuk mematuhi semua peraturan dan ketentuan Pondok Pesantren Islam Irsyadulhaq. Saya memahami bahwa informasi yang salah dapat menyebabkan penolakan pendaftaran atau pembatalan penerimaan.
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="btn-outline"
                          >
                            Langkah Sebelumnya
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary inline-flex items-center space-x-2"
                          >
                            {isSubmitting ? (
                              <span>Mengirim...</span>
                            ) : (
                              <>
                                <span>Kirim Pendaftaran</span>
                                <ChevronRight size={18} />
                              </>
                            )}
                          </button>
                        </div>
                      </AnimatedSectionWrapper>
                    )}
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Registration;
