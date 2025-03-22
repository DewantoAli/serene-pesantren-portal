
import React from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { Label } from "@/components/ui/label";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';

const FamilyInfoStep: React.FC = () => {
  const { form } = useFormContext();
  if (!form) return null;
  
  return (
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
      
      <StepNavigation />
    </AnimatedSectionWrapper>
  );
};

export default FamilyInfoStep;
