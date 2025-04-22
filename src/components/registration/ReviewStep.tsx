
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const ReviewStep: React.FC = () => {
  const { form } = useFormContext();
  if (!form) return null;
  
  const formValues = form.getValues();
  
  return (
    <AnimatedSectionWrapper animation="fade-in">
      <h2 className="text-2xl font-display font-bold text-islamic-navy mb-6">
        Tinjauan & Kirim Pendaftaran
      </h2>
      
      <div className="mb-8">
        <p className="text-islamic-slate mb-6">
          Silakan tinjau informasi yang telah Anda berikan sebelum mengirimkan formulir pendaftaran.
        </p>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6 bg-islamic-cream/10 p-1">
            <TabsTrigger value="personal" className="data-[state=active]:bg-islamic-teal data-[state=active]:text-white">
              Data Pribadi
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-islamic-teal data-[state=active]:text-white">
              Pendidikan
            </TabsTrigger>
            <TabsTrigger value="program" className="data-[state=active]:bg-islamic-teal data-[state=active]:text-white">
              Program
            </TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-islamic-teal data-[state=active]:text-white">
              Keluarga
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="bg-islamic-cream/10 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-islamic-navy mb-2">Data Pribadi</h3>
                <ul className="space-y-2">
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Nama Lengkap:</span>
                    <span className="font-medium text-islamic-navy">{formValues.fullName}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Jenis Kelamin:</span>
                    <span className="font-medium text-islamic-navy">
                      {formValues.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                    </span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Tanggal Lahir:</span>
                    <span className="font-medium text-islamic-navy">{formValues.dateOfBirth}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Tempat Lahir:</span>
                    <span className="font-medium text-islamic-navy">{formValues.placeOfBirth}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">NISN:</span>
                    <span className="font-medium text-islamic-navy">{formValues.nisn}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">NIK:</span>
                    <span className="font-medium text-islamic-navy">{formValues.nik}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-islamic-navy mb-2">Kontak & Alamat</h3>
                <ul className="space-y-2">
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Email:</span>
                    <span className="font-medium text-islamic-navy">{formValues.email || "-"}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">No. HP/WhatsApp:</span>
                    <span className="font-medium text-islamic-navy">{formValues.phone}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Alamat:</span>
                    <span className="font-medium text-islamic-navy">{formValues.address}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Kecamatan, Kota/Kabupaten:</span>
                    <span className="font-medium text-islamic-navy">{formValues.district}, {formValues.city}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Provinsi:</span>
                    <span className="font-medium text-islamic-navy">{formValues.province}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Kode Pos:</span>
                    <span className="font-medium text-islamic-navy">{formValues.postalCode}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="bg-islamic-cream/10 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium text-islamic-navy mb-2">Riwayat Pendidikan</h3>
            <ul className="space-y-2">
              <li className="flex flex-col">
                <span className="text-sm text-islamic-slate">Sekolah Asal:</span>
                <span className="font-medium text-islamic-navy">{formValues.previousSchool}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-islamic-slate">Alamat Sekolah:</span>
                <span className="font-medium text-islamic-navy">{formValues.schoolAddress}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-islamic-slate">Kecamatan/Kota/Provinsi Sekolah:</span>
                <span className="font-medium text-islamic-navy">
                  {formValues.schoolDistrict}, {formValues.schoolCity}, {formValues.schoolProvince}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-islamic-slate">Tahun Kelulusan:</span>
                <span className="font-medium text-islamic-navy">{formValues.graduationYear}</span>
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="program" className="bg-islamic-cream/10 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium text-islamic-navy mb-2">Program yang Dipilih</h3>
            <div className="p-4 border border-islamic-teal/30 rounded-lg bg-islamic-teal/5">
              <span className="font-medium text-islamic-navy block mb-1">
                {formValues.program === 'islamic-studies' ? 'Program Studi Islam' :
                formValues.program === 'tahfidz' ? 'Program Tahfidz Quran' :
                formValues.program === 'academic-islamic' ? 'Program Terpadu Akademik-Islam' :
                formValues.program === 'leadership' ? 'Program Kepemimpinan Islam' : ''}
              </span>
            </div>
          </TabsContent>
          
          <TabsContent value="family" className="bg-islamic-cream/10 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-islamic-navy mb-2">Data Keluarga</h3>
                <ul className="space-y-2">
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Nomor Kartu Keluarga:</span>
                    <span className="font-medium text-islamic-navy">{formValues.familyCardNumber}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Penghasilan Orang Tua:</span>
                    <span className="font-medium text-islamic-navy">
                      {formValues.parentsIncome === 'below_1M' ? 'Di bawah 1 juta' :
                      formValues.parentsIncome === '1M_3M' ? '1 juta - 3 juta' :
                      formValues.parentsIncome === '3M_5M' ? '3 juta - 5 juta' :
                      formValues.parentsIncome === '5M_10M' ? '5 juta - 10 juta' :
                      formValues.parentsIncome === 'above_10M' ? 'Di atas 10 juta' : ''}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-islamic-navy mb-2">Data Ayah</h3>
                <ul className="space-y-2">
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Nama Ayah:</span>
                    <span className="font-medium text-islamic-navy">{formValues.fatherName}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Status:</span>
                    <span className="font-medium text-islamic-navy">
                      {formValues.fatherStatus === 'alive' ? 'Masih Hidup' : 'Sudah Meninggal'}
                    </span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">NIK Ayah:</span>
                    <span className="font-medium text-islamic-navy">{formValues.fatherNik}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Pekerjaan:</span>
                    <span className="font-medium text-islamic-navy">{formValues.fatherOccupation}</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-islamic-navy mb-2">Data Ibu</h3>
                <ul className="space-y-2">
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Nama Ibu:</span>
                    <span className="font-medium text-islamic-navy">{formValues.motherName}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Status:</span>
                    <span className="font-medium text-islamic-navy">
                      {formValues.motherStatus === 'alive' ? 'Masih Hidup' : 'Sudah Meninggal'}
                    </span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">NIK Ibu:</span>
                    <span className="font-medium text-islamic-navy">{formValues.motherNik}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm text-islamic-slate">Pendidikan Terakhir:</span>
                    <span className="font-medium text-islamic-navy">{formValues.motherEducation}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mb-6 p-4 border border-islamic-teal rounded-lg bg-islamic-teal/5">
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="agree-terms"
                />
              </FormControl>
              <div>
                <Label htmlFor="agree-terms" className="text-islamic-navy">
                  Saya menyatakan bahwa semua informasi yang diberikan adalah benar dan akurat
                </Label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-islamic-slate">
          Dengan mengirimkan formulir ini, Anda menyetujui syarat dan ketentuan pendaftaran Pondok Pesantren Irsyadul Haq Manado.
        </p>
        
        <StepNavigation showNext={false} submitButton={true} />
      </div>
    </AnimatedSectionWrapper>
  );
};

export default ReviewStep;
