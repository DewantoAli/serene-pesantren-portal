
import React, { useState } from 'react';
import AnimatedSectionWrapper from '@/components/ui/AnimatedSectionWrapper';
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { useFormContext } from '@/contexts/FormContext';
import StepNavigation from './StepNavigation';

const PersonalInfoStep: React.FC = () => {
  const { form } = useFormContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInputValue, setDateInputValue] = useState("");
  
  if (!form) return null;
  
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (date: Date) => void) => {
    const value = e.target.value;
    setDateInputValue(value);
    
    // Try to parse the date
    try {
      // Attempt to parse with different formats (dd/MM/yyyy or yyyy-MM-dd)
      let parsedDate: Date | null = null;
      
      if (value.includes('/')) {
        parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      } else if (value.includes('-')) {
        parsedDate = parse(value, 'yyyy-MM-dd', new Date());
      }
      
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        onChange(parsedDate);
      }
    } catch (error) {
      // Invalid date format, just update the input value
    }
  };
  
  return (
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
                
                <div className="flex flex-col space-y-2">
                  {/* Direct date input */}
                  <FormControl>
                    <Input 
                      placeholder="DD/MM/YYYY atau YYYY-MM-DD" 
                      value={dateInputValue || (field.value ? format(field.value, 'dd/MM/yyyy') : '')}
                      onChange={(e) => handleDateInputChange(e, field.onChange)}
                    />
                  </FormControl>
                  
                  {/* Calendar picker option */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        type="button"
                        className="flex items-center justify-center w-full"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>Atau pilih dari kalender</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (date) {
                            setDateInputValue(format(date, 'dd/MM/yyyy'));
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <FormDescription>
                  Format: DD/MM/YYYY atau YYYY-MM-DD
                </FormDescription>
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
                <FormLabel>Email Address (Opsional)</FormLabel>
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
      
      <StepNavigation showPrev={false} />
    </AnimatedSectionWrapper>
  );
};

export default PersonalInfoStep;
