
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { Info } from 'lucide-react';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';

const EducationStep: React.FC = () => {
  const { form } = useFormContext();
  if (!form) return null;
  
  return (
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
      
      <StepNavigation />
    </AnimatedSectionWrapper>
  );
};

export default EducationStep;
