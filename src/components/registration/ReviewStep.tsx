
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { format } from "date-fns";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';

const ReviewStep: React.FC = () => {
  const { form } = useFormContext();
  if (!form) return null;
  
  return (
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
      
      <StepNavigation submitButton={true} />
    </AnimatedSectionWrapper>
  );
};

export default ReviewStep;
