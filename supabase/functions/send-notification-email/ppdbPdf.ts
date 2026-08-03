// Generator PDF "Biaya PPDB" — hasil generate dari dokumen Google Docs pesantren.
import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib@1.17.1';

export interface PpdbPdfData {
  nama: string;
  nik?: string;
  hp?: string;
  waktu: string;
}

const BIAYA: Array<[string, string]> = [
  ['Pendaftaran', 'Rp. 250.000,-'],
  ['Uang Pangkal', 'Rp. 2.000.000,-'],
  ['SPP Bulanan (Juli)', 'Rp. 700.000,-'],
  ['Lemari Pakaian', 'Rp. 400.000,-'],
  ['Kasur', 'Rp. 150.000,-'],
  ['Seragam Gamis', 'Rp. 250.000,-'],
];

const TOTAL = 'Rp. 2.950.000,-';

const ALUR = [
  '1. Membayar biaya pendaftaran',
  '2. Mengambil formulir pendaftaran',
  '3. Melengkapi berkas',
  '4. Seleksi masuk',
  '5. Pengumuman hasil seleksi',
  '6. Pendaftaran ulang (pelunasan biaya PPDB)',
];

const SYARAT = [
  '• Mengisi formulir + bayar biaya pendaftaran',
  '• Foto kopi ijazah MI / SD legalisir 3 lembar',
  '• Foto kopi KK 3 lembar',
  '• Akte lahir 3 lembar',
  '• Pasfoto 3x4 = 3 lembar, 4x6 = 3 lembar',
];

export async function generatePpdbPdf(data: PpdbPdfData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const green = rgb(0.102, 0.361, 0.278);
  const gold = rgb(0.831, 0.647, 0.227);
  const dark = rgb(0.06, 0.09, 0.16);
  const grey = rgb(0.39, 0.45, 0.55);

  const M = 50;
  const W = 595.28;
  let y = 800;

  // Header band
  page.drawRectangle({ x: 0, y: 762, width: W, height: 80, color: green });
  page.drawText('BIAYA PENERIMAAN PESERTA DIDIK BARU (PPDB)', {
    x: M, y: 808, size: 13, font: bold, color: rgb(1, 1, 1),
  });
  page.drawText('PONDOK PESANTREN IRSYADUL HAQ', {
    x: M, y: 789, size: 12, font: bold, color: gold,
  });
  page.drawText('Manado, Sulawesi Utara', { x: M, y: 772, size: 9, font, color: rgb(0.9, 0.93, 0.9) });

  y = 730;
  const idRow = (label: string, value: string) => {
    page.drawText(label, { x: M, y, size: 10, font, color: grey });
    page.drawText(': ' + value, { x: M + 150, y, size: 10, font: bold, color: dark });
    y -= 18;
  };
  idRow('NAMA CALON SANTRI', data.nama);
  idRow('NIK CALON SANTRI', data.nik && data.nik.length > 0 ? data.nik : '-');
  idRow('NO. HP', data.hp && data.hp.length > 0 ? data.hp : '-');

  y -= 14;
  page.drawText('RINCIAN BIAYA', { x: M, y, size: 11, font: bold, color: green });
  y -= 8;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1, color: gold });
  y -= 20;

  for (const [label, value] of BIAYA) {
    page.drawText(label, { x: M, y, size: 10, font, color: dark });
    page.drawText(value, { x: W - M - font.widthOfTextAtSize(value, 10), y, size: 10, font, color: dark });
    y -= 18;
  }

  y -= 4;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.7, color: grey });
  y -= 18;
  page.drawText('Jumlah Total', { x: M, y, size: 11, font: bold, color: green });
  page.drawText(TOTAL, {
    x: W - M - bold.widthOfTextAtSize(TOTAL, 11), y, size: 11, font: bold, color: green,
  });

  y -= 40;
  const colTop = y;
  page.drawText('Alur Pendaftaran', { x: M, y, size: 11, font: bold, color: green });
  page.drawText('Syarat Pendaftaran', { x: W / 2, y, size: 11, font: bold, color: green });
  y -= 18;

  let leftY = y;
  for (const line of ALUR) {
    page.drawText(line, { x: M, y: leftY, size: 9.5, font, color: dark, maxWidth: W / 2 - M - 10 });
    leftY -= 16;
  }
  let rightY = y;
  for (const line of SYARAT) {
    page.drawText(line, { x: W / 2, y: rightY, size: 9.5, font, color: dark, maxWidth: W / 2 - M - 10 });
    rightY -= 16;
  }

  y = Math.min(leftY, rightY) - 50;
  if (y < 140) y = 140;

  page.drawText('Mudir Pondok Pesantren Irsyadul Haq', { x: M, y, size: 10, font, color: dark });
  page.drawText('ROSIHAN ANWAR, S.Pd.', { x: M, y: y - 46, size: 10.5, font: bold, color: dark });
  const stamp = data.waktu + ' WITA';
  page.drawText(stamp, {
    x: W - M - font.widthOfTextAtSize(stamp, 9), y: y - 46, size: 9, font, color: grey,
  });

  page.drawLine({ start: { x: M, y: 70 }, end: { x: W - M, y: 70 }, thickness: 0.7, color: gold });
  page.drawText('Dokumen ini dibuat otomatis oleh sistem pendaftaran www.irsyadulhaq.or.id', {
    x: M, y: 56, size: 8, font, color: grey,
  });

  return await pdf.save();
}
