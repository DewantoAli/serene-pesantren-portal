
// Ini adalah template script Google Apps Script yang perlu dibuat
// Salin kode ini ke dalam Google Apps Script dan gunakan sebagai endpoint

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Mendapatkan data yang dikirim dari formulir
    var data = JSON.parse(e.postData.contents);
    
    // Mendapatkan spreadsheet yang aktif (pastikan sudah dibuat sebelumnya)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Pendaftaran") || ss.insertSheet("Pendaftaran");
    
    // Jika sheet baru, tambahkan header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Nama Lengkap", 
        "Jenis Kelamin", 
        "Tanggal Lahir", 
        "Tempat Lahir", 
        "Email", 
        "Telepon", 
        "NISN", 
        "NIK", 
        "Alamat Lengkap", 
        "Kecamatan", 
        "Kabupaten/Kota", 
        "Provinsi", 
        "Kode Pos", 
        "Sekolah Asal", 
        "Alamat Sekolah", 
        "Kecamatan Sekolah", 
        "Kabupaten Sekolah", 
        "Provinsi Sekolah", 
        "Tahun Lulus", 
        "Program", 
        "Nomor Kartu Keluarga", 
        "Nama Ayah", 
        "Status Ayah", 
        "NIK Ayah", 
        "Pekerjaan Ayah", 
        "Nama Ibu", 
        "Status Ibu", 
        "NIK Ibu", 
        "Pendidikan Ibu", 
        "Penghasilan Orang Tua", 
        "Kondisi Kesehatan", 
        "Alergi", 
        "Obat-obatan", 
        "Darimana Mengetahui", 
        "Catatan Tambahan"
      ]);
    }
    
    // Menambahkan data baru ke spreadsheet
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.gender,
      data.dateOfBirth,
      data.placeOfBirth,
      data.email,
      data.phone,
      data.nisn,
      data.nik,
      data.address,
      data.district,
      data.city,
      data.province,
      data.postalCode,
      data.previousSchool,
      data.schoolAddress,
      data.schoolDistrict,
      data.schoolCity,
      data.schoolProvince,
      data.graduationYear,
      data.program,
      data.familyCardNumber,
      data.fatherName,
      data.fatherStatus,
      data.fatherNik,
      data.fatherOccupation,
      data.motherName,
      data.motherStatus,
      data.motherNik,
      data.motherEducation,
      data.parentsIncome,
      data.healthConditions,
      data.allergies,
      data.medications,
      data.howDidYouHear,
      data.additionalNotes
    ]);
    
    // Mengembalikan respons berhasil
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Mengembalikan respons error
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
