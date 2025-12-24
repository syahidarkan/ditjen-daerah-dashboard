import XLSX from 'xlsx';


const sampleData = [
  {
    'Kode Satker': '123456',
    'Bulan': 'Januari',
    'Tahun': 2025,
    'Tanggal': '2025-01-15',
    'No Gaji': 'GP001',
    'NIP': '199001012020121001',
    'Nama Pegawai': 'Ahmad Sudirman',
    'Kode Gol': 'III/a',
    'NPWP': '123456789012345',
    'Kode Bank SPAN': '002',
    'Nama Bank SPAN': 'BRI',
    'No Rek': '1234567890',
    'Nama Cabang Bank': 'Cabang Jakarta',
    'Jumlah Hari': 22,
    'Tarif': 500000,
    'PPH': 5,
    'Golongan': 'PNS'
  },
  {
    'Kode Satker': '123457',
    'Bulan': 'Januari',
    'Tahun': 2025,
    'Tanggal': '2025-01-15',
    'No Gaji': 'GP002',
    'NIP': '199002012020121002',
    'Nama Pegawai': 'Siti Rahmawati',
    'Kode Gol': 'II/b',
    'NPWP': '123456789012346',
    'Kode Bank SPAN': '008',
    'Nama Bank SPAN': 'Mandiri',
    'No Rek': '0987654321',
    'Nama Cabang Bank': 'Cabang Bandung',
    'Jumlah Hari': 20,
    'Tarif': 450000,
    'PPH': 5,
    'Golongan': 'PNS'
  },
  {
    'Kode Satker': '123458',
    'Bulan': 'Januari',
    'Tahun': 2025,
    'Tanggal': '2025-01-15',
    'No Gaji': 'GP003',
    'NIP': '199003012020121003',
    'Nama Pegawai': 'Budi Santoso',
    'Kode Gol': '',
    'NPWP': '123456789012347',
    'Kode Bank SPAN': '002',
    'Nama Bank SPAN': 'BRI',
    'No Rek': '5555666677',
    'Nama Cabang Bank': 'Cabang Surabaya',
    'Jumlah Hari': 25,
    'Tarif': 300000,
    'PPH': 10,
    'Golongan': 'Non-PNS'
  }
];


const worksheet = XLSX.utils.json_to_sheet(sampleData);


const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Gaji');


const instructions = [
  ['TEMPLATE EXCEL DATA GAJI'],
  ['DITJEN PEMBANGUNAN DAERAH'],
  [''],
  ['PETUNJUK PENGGUNAAN:'],
  ['1. Gunakan sheet "Data Gaji" untuk mengisi data'],
  ['2. Jangan mengubah nama kolom di baris header'],
  ['3. Pastikan format data sesuai dengan ketentuan'],
  [''],
  ['FORMAT KOLOM:'],
  ['Kolom', 'Format', 'Keterangan'],
  ['Kode Satker', 'Text', 'Kode satuan kerja'],
  ['Bulan', 'Text', 'Nama bulan (Januari-Desember)'],
  ['Tahun', 'Number', 'Tahun (2020-2100)'],
  ['Tanggal', 'Text', 'Format: YYYY-MM-DD'],
  ['No Gaji', 'Text', 'Nomor gaji'],
  ['NIP', 'Text', '18 digit NIP (wajib)'],
  ['Nama Pegawai', 'Text', 'Nama lengkap pegawai (wajib)'],
  ['Kode Gol', 'Text', 'Kode golongan (untuk Non-PNS boleh kosong)'],
  ['NPWP', 'Text', '15 digit NPWP (wajib)'],
  ['Kode Bank SPAN', 'Text', 'Kode bank SPAN'],
  ['Nama Bank SPAN', 'Text', 'Nama bank'],
  ['No Rek', 'Text', 'Nomor rekening'],
  ['Nama Cabang Bank', 'Text', 'Nama cabang bank'],
  ['Jumlah Hari', 'Number', 'Jumlah hari kerja (1-31)'],
  ['Tarif', 'Number', 'Tarif gaji PER HARI dalam Rupiah (contoh: 500000)'],
  ['PPH', 'Number', 'PPH dalam PERSEN (contoh: 5 untuk PPH 5%)'],
  ['Golongan', 'Text', 'PNS atau Non-PNS'],
  [''],
  ['KALKULASI OTOMATIS OLEH SISTEM:'],
  ['Field ini TIDAK PERLU diisi, akan dihitung otomatis:'],
  ['- Kotor = Jumlah Hari × Tarif'],
  ['- Potongan = Kotor × (PPH / 100)'],
  ['- Bersih = Kotor - Potongan'],
  [''],
  ['CONTOH PERHITUNGAN:'],
  ['Jumlah Hari: 22, Tarif: 500.000, PPH: 5%'],
  ['→ Kotor = 22 × 500.000 = 11.000.000'],
  ['→ Potongan = 11.000.000 × 5% = 550.000'],
  ['→ Bersih = 11.000.000 - 550.000 = 10.450.000'],
  [''],
  ['VALIDASI:'],
  ['- NIP harus tepat 18 digit'],
  ['- NPWP harus tepat 15 digit'],
  ['- Nama Pegawai wajib diisi'],
  ['- Golongan harus "PNS" atau "Non-PNS"'],
];

const instructionSheet = XLSX.utils.aoa_to_sheet(instructions);
XLSX.utils.book_append_sheet(workbook, instructionSheet, 'Petunjuk');


XLSX.writeFile(workbook, 'public/template_gaji.xlsx');

console.log('✅ Template Excel berhasil dibuat di public/template_gaji.xlsx');
