
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
    var sheet = ss.getSheetByName("SPMB 2025-2026") || ss.insertSheet("Pendaftaran");
    
    // Jika sheet baru, tambahkan header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Nama Lengkap", 
        "Jenis Kelamin", 
        "Tanggal Lahir", 
        "Tempat Lahir", 
        "ID Nasional", 
        "Email", 
        "Telepon", 
        "Alamat", 
        "Sekolah Sebelumnya", 
        "Tahun Kelulusan", 
        "Nilai Sebelumnya",
        "Program",
        "Nama Wali",
        "Hubungan",
        "Telepon Wali",
        "Email Wali",
        "Pekerjaan Wali",
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
      data.nationalId,
      data.email,
      data.phone,
      data.address,
      data.previousSchool,
      data.graduationYear,
      data.previousGrade,
      data.program,
      data.parentName,
      data.parentRelation,
      data.parentPhone,
      data.parentEmail,
      data.parentOccupation,
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
