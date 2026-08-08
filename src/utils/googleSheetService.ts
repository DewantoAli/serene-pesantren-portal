
import { FormValues } from '@/schemas/registrationSchema';

const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxEzSJ7GkECBJ_hFe4EGhcmqe9pmCTfgPCvvYB0cEC8oVr8BHjnnz0hKJXCUAxYL5MFbQ/exec';

export const submitToGoogleSheet = async (data: FormValues) => {
  try {
    const spreadsheetData = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      gender: data.gender === 'male' ? 'Laki-laki' : 'Perempuan',
      dateOfBirth: data.dateOfBirth || "",
      placeOfBirth: data.placeOfBirth || "",
      email: data.email || "",
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
    
    // Gunakan mode CORS + Content-Type sederhana (tanpa preflight) agar
    // respons dari Apps Script bisa dibaca dan pengiriman benar-benar diverifikasi.
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(spreadsheetData),
    });

    if (!response.ok) {
      throw new Error(`Pengiriman gagal (HTTP ${response.status})`);
    }

    const raw = (await response.text()).trim();

    // Apps Script biasanya membalas JSON {"result":"success"} atau teks biasa.
    let ok = raw.length > 0;
    try {
      const parsed = JSON.parse(raw);
      ok =
        parsed?.result === 'success' ||
        parsed?.status === 'success' ||
        parsed?.success === true;
      if (!ok) {
        throw new Error(parsed?.message || 'Server menolak data pendaftaran.');
      }
    } catch (parseError) {
      // Bukan JSON: anggap berhasil hanya bila respons tidak kosong dan tidak mengandung error
      if (parseError instanceof Error && parseError.name !== 'SyntaxError') {
        throw parseError;
      }
      if (!ok || /error|exception/i.test(raw)) {
        throw new Error('Server tidak mengonfirmasi penerimaan data pendaftaran.');
      }
    }

    return true;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

