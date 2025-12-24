# Dashboard CRUD Data Gaji Pegawai
## DITJEN PEMBANGUNAN DAERAH

> Sistem Informasi Manajemen Data Gaji Pegawai berbasis Web dengan fitur CRUD, Import/Export Excel, dan Advanced Filtering

---

## 📋 Daftar Isi

1. [Tentang Aplikasi](#tentang-aplikasi)
2. [Spesifikasi Teknis](#spesifikasi-teknis)
3. [Arsitektur Sistem](#arsitektur-sistem)
4. [Skema Database](#skema-database)
5. [Algoritma & Flow Sistem](#algoritma--flow-sistem)
6. [Fitur Aplikasi](#fitur-aplikasi)
7. [Struktur Folder](#struktur-folder)
8. [Cara Instalasi & Menjalankan](#cara-instalasi--menjalankan)
9. [Panduan Penggunaan](#panduan-penggunaan)
10. [Deployment ke Vercel](#deployment-ke-vercel)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Tentang Aplikasi

**Dashboard CRUD Data Gaji Pegawai** adalah aplikasi berbasis web yang dirancang untuk membantu DITJEN PEMBANGUNAN DAERAH dalam mengelola data gaji pegawai secara digital. Aplikasi ini menggantikan proses manual berbasis Excel dengan sistem yang lebih terstruktur, aman, dan efisien.

### Latar Belakang

Sebelumnya, pengelolaan data gaji pegawai dilakukan secara manual menggunakan file Excel yang tersebar, sehingga rentan terhadap:
- Kehilangan data
- Duplikasi data
- Kesalahan perhitungan manual
- Sulitnya melakukan filtering dan pencarian data
- Tidak ada validasi otomatis

### Solusi

Aplikasi web ini memberikan solusi dengan:
- **Single Source of Truth**: Semua data tersimpan dalam satu sistem
- **Auto-calculation**: Perhitungan gaji kotor dan bersih otomatis
- **Validasi Real-time**: Input data tervalidasi langsung
- **Import/Export Excel**: Tetap kompatibel dengan workflow Excel yang sudah ada
- **Advanced Filtering**: Pencarian data berdasarkan multiple kriteria
- **Client-side Database**: Tidak memerlukan server backend yang kompleks

### Target Pengguna

- Admin DITJEN PEMBANGUNAN DAERAH
- Staff Keuangan
- Manajer yang membutuhkan laporan data gaji

---

## 🔧 Spesifikasi Teknis

### Frontend Framework

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Vite** | 7.3.0 | Build tool modern dengan Hot Module Replacement (HMR) yang sangat cepat |
| **React** | 18.3.1 | Library JavaScript untuk membangun user interface dengan component-based architecture |
| **TypeScript** | 5.6.2 | Superset JavaScript dengan static typing untuk mengurangi bugs |

### UI Framework & Styling

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Tailwind CSS** | 4.0.0-beta.7 | Utility-first CSS framework untuk styling yang cepat dan konsisten |
| **shadcn/ui** | - | Collection komponen UI berbasis Radix UI dengan styling Tailwind |
| **Radix UI** | - | Primitive components yang accessible dan customizable |
| **Lucide React** | 0.468.0 | Icon library dengan 1000+ icons |

### State Management & Data Handling

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **TanStack Table** | 8.20.5 | Headless table library untuk sorting, pagination, filtering |
| **React Hook Form** | 7.54.2 | Form state management dengan minimal re-renders |
| **Zod** | 3.24.1 | Schema validation untuk TypeScript |
| **date-fns** | 4.1.0 | Library untuk manipulasi dan formatting tanggal |

### Excel Processing

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **SheetJS (xlsx)** | 0.18.5 | Library untuk membaca dan menulis file Excel (.xlsx, .xls) |

### Routing & Notifications

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React Router DOM** | 7.1.1 | Client-side routing dengan protected routes |
| **Sonner** | 1.7.3 | Toast notification library yang elegant |

### Database

| Teknologi | Fungsi |
|-----------|--------|
| **localStorage** | Browser-based storage untuk menyimpan data secara persistent di client-side (max ~5-10MB) |

### Development Tools

| Tool | Fungsi |
|------|--------|
| **ESLint** | Linting untuk menjaga kualitas kode |
| **PostCSS** | CSS processor untuk Tailwind |
| **TypeScript Compiler** | Compile TypeScript ke JavaScript |

### Browser Support

- Chrome/Edge (Chromium) 90+
- Firefox 88+
- Safari 14+

---

## 🏗️ Arsitektur Sistem

### Arsitektur Keseluruhan

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌─────────────┐  │
│  │  Login Page  │───▶│  Dashboard   │◀──▶│  LocalStorage│  │
│  │              │    │     Page     │    │   Database  │  │
│  └──────────────┘    └──────────────┘    └─────────────┘  │
│                             │                              │
│                             ▼                              │
│         ┌───────────────────────────────────┐              │
│         │   React Components & Hooks        │              │
│         ├───────────────────────────────────┤              │
│         │ - DataTable (TanStack Table)      │              │
│         │ - DataForm (React Hook Form)      │              │
│         │ - FilterBar                       │              │
│         │ - StatsCards                      │              │
│         │ - Import/Export Excel             │              │
│         └───────────────────────────────────┘              │
│                             │                              │
│                             ▼                              │
│         ┌───────────────────────────────────┐              │
│         │      Business Logic Layer         │              │
│         ├───────────────────────────────────┤              │
│         │ - database.ts (CRUD operations)   │              │
│         │ - calculations.ts (Auto-calc)     │              │
│         │ - excel.ts (Import/Export)        │              │
│         │ - auth.ts (Authentication)        │              │
│         │ - validations.ts (Zod schemas)    │              │
│         └───────────────────────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture (React)

```
App.tsx
├── LoginPage
│   └── LoginForm
│
└── DashboardPage (Protected Route)
    ├── DashboardLayout
    │   ├── Sidebar
    │   └── Topbar
    │       └── User Dropdown
    │
    ├── StatsCards (4 cards: Total Data, PNS, Kotor, Bersih)
    │
    ├── FilterBar
    │   ├── Tahun Filter (Select)
    │   ├── Bulan Filter (Select)
    │   ├── Date Range Picker (Calendar)
    │   ├── Golongan Filter (Select)
    │   └── Quick Filters (Bulan Ini, Tahun Ini, 3 Bulan Terakhir)
    │
    ├── Action Buttons
    │   ├── Add Data Button → AddDataDialog
    │   ├── Import Excel Button → ImportExcelDialog
    │   └── Export Button → Dropdown Menu
    │       ├── Export All
    │       ├── Export Filtered
    │       └── Export Selected
    │
    └── DataTable (TanStack Table)
        ├── Column Headers (sortable)
        ├── Data Rows
        │   └── Action Buttons (Edit, Delete)
        ├── Pagination
        ├── Row Selection (Bulk Delete)
        └── Column Visibility Toggle
```

### Data Flow

```
┌──────────────┐
│   User Input │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  React Component │
│  (Form/Button)   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Custom Hook     │
│  (useDataGaji)   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Validation      │
│  (Zod Schema)    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Business Logic  │
│  (database.ts)   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Auto-calculation│
│  (calculations.ts)│
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  localStorage    │
│  (Save/Retrieve) │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  UI Update       │
│  (Re-render)     │
└──────────────────┘
```

---

## 💾 Skema Database

### Struktur Data (localStorage)

Data disimpan dalam localStorage dengan 2 key utama:

1. **`ditjen_gaji_data`**: Array berisi semua data gaji pegawai
2. **`ditjen_auth_token`** & **`ditjen_auth_user`**: Data autentikasi user

### Schema Data Gaji (21 Fields)

```typescript
interface DataGaji {
  // Primary Key
  id: string;                    // UUID v4 (auto-generated)

  // Informasi Dasar
  kodeSatker: string;            // Kode Satuan Kerja
  bulan: string;                 // Bulan (Januari-Desember)
  tahun: number;                 // Tahun (2020-2100)
  tanggal: string;               // Format: YYYY-MM-DD
  noGaji: string;                // Nomor Gaji
  jumlahHari: number;            // Jumlah hari kerja (1-31)

  // Data Pegawai
  nip: string;                   // NIP 18 digit (wajib)
  namaPegawai: string;           // Nama lengkap pegawai
  kodeGol: string;               // Kode Golongan
  npwp: string;                  // NPWP 15 digit (wajib)
  golongan: "PNS" | "Non-PNS";   // Kategori pegawai

  // Data Bank
  kodeBankSpan: string;          // Kode Bank SPAN
  namaBankSpan: string;          // Nama Bank
  noRek: string;                 // Nomor Rekening
  namaCabangBank: string;        // Nama Cabang Bank

  // Data Gaji & Perhitungan
  tarif: number;                 // Tarif gaji per hari (dalam Rupiah)
  pph: number;                   // PPH dalam Persen (%) - contoh: 5 untuk 5%
  kotor: number;                 // Gaji Kotor (AUTO: jumlahHari × tarif)
  potongan: number;              // Potongan gaji (AUTO: kotor × pph/100)
  bersih: number;                // Gaji Bersih (AUTO: kotor - potongan)

  // Metadata
  createdAt: string;             // ISO DateTime (auto-generated)
  updatedAt: string;             // ISO DateTime (auto-updated)
}
```

### Validasi Data (Zod Schema)

```typescript
- kodeSatker: minimum 1 karakter
- bulan: minimum 1 karakter, harus dari BULAN_OPTIONS
- tahun: 2020 ≤ tahun ≤ 2100
- tanggal: format YYYY-MM-DD (regex validated)
- noGaji: minimum 1 karakter
- nip: EXACTLY 18 digit
- namaPegawai: minimum 1 karakter
- kodeGol: minimum 1 karakter
- npwp: EXACTLY 15 digit
- kodeBankSpan: minimum 1 karakter
- namaBankSpan: minimum 1 karakter
- noRek: minimum 1 karakter
- namaCabangBank: minimum 1 karakter
- jumlahHari: 1 ≤ hari ≤ 31
- tarif: ≥ 0
- pph: ≥ 0
- potongan: ≥ 0
- golongan: harus "PNS" atau "Non-PNS"
```

### Contoh Data

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "kodeSatker": "001234",
  "bulan": "Januari",
  "tahun": 2025,
  "tanggal": "2025-01-15",
  "noGaji": "G001/2025",
  "nip": "199001012010011001",
  "namaPegawai": "Budi Santoso",
  "kodeGol": "III/a",
  "npwp": "123456789012345",
  "kodeBankSpan": "002",
  "namaBankSpan": "BRI",
  "noRek": "1234567890",
  "namaCabangBank": "Jakarta Pusat",
  "jumlahHari": 22,
  "tarif": 500000,
  "pph": 5,
  "kotor": 11000000,
  "potongan": 550000,
  "bersih": 10450000,
  "golongan": "PNS",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

---

## ⚙️ Algoritma & Flow Sistem

### 1. Algoritma Auto-Calculation

**Gaji Kotor**
```
FUNCTION calculateKotor(jumlahHari, tarif):
    RETURN jumlahHari × tarif
END FUNCTION

Contoh:
jumlahHari = 22 hari
tarif = Rp 500.000 per hari
kotor = 22 × 500.000 = Rp 11.000.000
```

**Potongan Gaji**
```
FUNCTION calculatePotongan(kotor, pph):
    RETURN kotor × (pph / 100)
END FUNCTION

Contoh:
kotor = Rp 11.000.000
pph = 5% (input sebagai angka 5)
potongan = 11.000.000 × (5 / 100) = Rp 550.000
```

**Gaji Bersih**
```
FUNCTION calculateBersih(kotor, potongan):
    RETURN kotor - potongan
END FUNCTION

Contoh:
kotor = Rp 11.000.000
potongan = Rp 550.000
bersih = 11.000.000 - 550.000 = Rp 10.450.000
```

**Auto-Calculate (Combined)**
```
FUNCTION autoCalculate(jumlahHari, tarif, pph):
    kotor = calculateKotor(jumlahHari, tarif)
    potongan = calculatePotongan(kotor, pph)
    bersih = calculateBersih(kotor, potongan)
    RETURN { kotor, potongan, bersih }
END FUNCTION
```

### 2. Flow CRUD Operations

**CREATE (Tambah Data)**
```
START
  ↓
User mengisi form
  ↓
Submit form
  ↓
Validasi input (Zod schema)
  ↓
Valid? ──NO──> Tampilkan error message
  ↓ YES
Generate UUID untuk id
  ↓
Auto-calculate kotor & bersih
  ↓
Set createdAt & updatedAt = NOW
  ↓
Ambil data existing dari localStorage
  ↓
Push data baru ke array
  ↓
Save ke localStorage
  ↓
Update UI (refresh data)
  ↓
Tampilkan success notification
  ↓
END
```

**READ (Tampilkan Data)**
```
START
  ↓
Component mount (useEffect)
  ↓
Call getAllData()
  ↓
Ambil data dari localStorage key "ditjen_gaji_data"
  ↓
Parse JSON string → JavaScript array
  ↓
Data kosong? ──YES──> Tampilkan empty state
  ↓ NO
Apply filters (if any)
  ↓
Calculate statistics (total data, PNS, Non-PNS, total kotor, total bersih)
  ↓
Render ke TanStack Table
  ↓
END
```

**UPDATE (Edit Data)**
```
START
  ↓
User klik tombol Edit pada row
  ↓
Set selectedData = data row tersebut
  ↓
Buka EditDialog dengan form pre-filled
  ↓
User ubah data
  ↓
Submit form
  ↓
Validasi input (Zod schema)
  ↓
Valid? ──NO──> Tampilkan error message
  ↓ YES
Ambil data existing dari localStorage
  ↓
Find index by id
  ↓
Found? ──NO──> Return null (error)
  ↓ YES
Merge data lama dengan update baru
  ↓
Re-calculate kotor & bersih
  ↓
Set updatedAt = NOW
  ↓
Replace data di index tersebut
  ↓
Save ke localStorage
  ↓
Update UI (refresh data)
  ↓
Tampilkan success notification
  ↓
END
```

**DELETE (Hapus Data)**
```
START
  ↓
User klik tombol Delete
  ↓
Tampilkan confirmation dialog
  ↓
User confirm? ──NO──> Cancel
  ↓ YES
Ambil data existing dari localStorage
  ↓
Filter array untuk exclude id yang akan dihapus
  ↓
Save filtered array ke localStorage
  ↓
Update UI (refresh data)
  ↓
Tampilkan success notification
  ↓
END
```

### 3. Flow Import Excel

```
START
  ↓
User klik "Import Excel"
  ↓
User pilih file .xlsx atau .xls
  ↓
Read file menggunakan FileReader (readAsBinaryString)
  ↓
Parse file dengan SheetJS (XLSX.read)
  ↓
Ambil sheet pertama
  ↓
Convert sheet to JSON (XLSX.utils.sheet_to_json)
  ↓
Loop setiap row:
  │
  ├─> Transform column names ke field names
  │   (contoh: "Kode Satker" → kodeSatker)
  │
  ├─> Validasi NIP (harus 18 digit)
  │   ├─ Valid? ──NO──> Add to errors array
  │   └─ YES ↓
  │
  ├─> Validasi NPWP (harus 15 digit)
  │   ├─ Valid? ──NO──> Add to errors array
  │   └─ YES ↓
  │
  ├─> Validasi Nama Pegawai (wajib diisi)
  │   ├─ Valid? ──NO──> Add to errors array
  │   └─ YES ↓
  │
  └─> Add to successData array
  ↓
Ada error? ──YES──> Tampilkan preview + opsi confirm import
  ↓ NO
Auto-import semua data (bulkCreate)
  ↓
Generate id, createdAt, updatedAt untuk setiap row
  ↓
Auto-calculate kotor & bersih untuk setiap row
  ↓
Ambil data existing dari localStorage
  ↓
Concat dengan data baru
  ↓
Save ke localStorage
  ↓
Update UI (refresh data)
  ↓
Tampilkan success notification (X data berhasil diimport)
  ↓
END
```

### 4. Flow Export Excel

```
START
  ↓
User klik "Export Excel"
  ↓
Pilih opsi export:
  ├─> Export All Data
  ├─> Export Filtered Data
  └─> Export Selected Rows
  ↓
Ambil data sesuai opsi
  ↓
Transform data ke format Excel:
  │ - id → tidak diexport (internal)
  │ - kodeSatker → "Kode Satker"
  │ - bulan → "Bulan"
  │ - dst...
  ↓
Buat worksheet (XLSX.utils.json_to_sheet)
  ↓
Buat workbook baru (XLSX.utils.book_new)
  ↓
Append worksheet ke workbook dengan nama "Data Gaji"
  ↓
Hitung statistik untuk Summary Sheet:
  │ - Total Data
  │ - Total PNS
  │ - Total Non-PNS
  │ - Total Kotor
  │ - Total Bersih
  │ - Export Date
  ↓
Buat Summary Sheet (XLSX.utils.aoa_to_sheet)
  ↓
Append Summary Sheet ke workbook
  ↓
Generate filename dinamis:
  │ Format: Gaji_[Tahun]_[Bulan]_[Golongan]_YYYYMMDD.xlsx
  │ Contoh: Gaji_2025_Januari_PNS_20250115.xlsx
  ↓
Write file ke disk (XLSX.writeFile)
  ↓
Browser download file otomatis
  ↓
Tampilkan success notification
  ↓
END
```

### 5. Flow Authentication

```
START (Login)
  ↓
User input username & password
  ↓
Submit form
  ↓
Check credentials:
  username === "admin" AND password === "admin123"
  ↓
Valid? ──NO──> Tampilkan error "Username atau password salah"
  ↓ YES
Generate token (base64 encoded: username:timestamp:random)
  ↓
Set expiresAt = NOW + 7 days
  ↓
Create authToken object { token, user, expiresAt }
  ↓
Save token ke localStorage key "ditjen_auth_token"
  ↓
Save user info ke localStorage key "ditjen_auth_user"
  ↓
Update React state (setUser)
  ↓
Navigate to /dashboard
  ↓
END
```

```
START (Check Auth)
  ↓
Setiap route change atau page refresh
  ↓
Check localStorage:
  - ditjen_auth_token exists?
  - ditjen_auth_user exists?
  ↓
Both exist? ──NO──> Redirect to /login
  ↓ YES
Allow access to protected route
  ↓
END
```

```
START (Logout)
  ↓
User klik tombol Logout
  ↓
Remove ditjen_auth_token dari localStorage
  ↓
Remove ditjen_auth_user dari localStorage
  ↓
Clear React state (setUser = null)
  ↓
Navigate to /login
  ↓
END
```

### 6. Flow Filtering

```
START
  ↓
User mengatur filter (Tahun, Bulan, Date Range, Golongan, Search)
  ↓
Update filterState
  ↓
Loop setiap data dalam array:
  │
  ├─> Filter by Tahun
  │   filters.tahun !== null AND item.tahun !== filters.tahun
  │   ├─ TRUE? ──> Exclude item
  │   └─ FALSE ↓
  │
  ├─> Filter by Bulan
  │   filters.bulan !== null AND item.bulan !== filters.bulan
  │   ├─ TRUE? ──> Exclude item
  │   └─ FALSE ↓
  │
  ├─> Filter by Date Range
  │   filters.dateRange.from AND filters.dateRange.to
  │   ├─ Parse item.tanggal, from, to dengan date-fns
  │   ├─ Check: item.tanggal WITHIN [from, to]?
  │   ├─ FALSE? ──> Exclude item
  │   └─ TRUE ↓
  │
  ├─> Filter by Golongan
  │   filters.golongan !== "ALL" AND item.golongan !== filters.golongan
  │   ├─ TRUE? ──> Exclude item
  │   └─ FALSE ↓
  │
  ├─> Filter by Search Query (Global Search)
  │   filters.searchQuery !== ""
  │   ├─ Search dalam fields: kodeSatker, nip, namaPegawai,
  │   │                       noGaji, npwp, namaBankSpan, noRek
  │   ├─ Found match? ──NO──> Exclude item
  │   └─ YES ↓
  │
  └─> Include item in filtered result
  ↓
Return filtered data
  ↓
Re-calculate statistics dari filtered data
  ↓
Update table display
  ↓
END
```

### 7. Algoritma Generate UUID

```
FUNCTION generateUUID():
    template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

    FOR each character 'c' in template:
        IF c === 'x' OR c === 'y':
            random = Math.random() * 16 (0-15)

            IF c === 'x':
                value = random
            ELSE (c === 'y'):
                value = (random AND 0x3) OR 0x8  // Ensures valid UUID v4

            Replace c with value in hexadecimal

    RETURN UUID string
END FUNCTION

Contoh output: "a1b2c3d4-e5f6-4890-abcd-ef1234567890"
```

---

## ✨ Fitur Aplikasi

### 1. Authentication & Authorization
- ✅ **Login System**: Username & password authentication
- ✅ **Protected Routes**: Halaman dashboard hanya bisa diakses setelah login
- ✅ **Session Management**: Token tersimpan di localStorage (expire 7 hari)
- ✅ **Logout**: Clear session dan redirect ke login page
- ✅ **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

### 2. CRUD Operations (Create, Read, Update, Delete)

**CREATE (Tambah Data)**
- Form dengan 21 input fields
- Validasi real-time menggunakan Zod
- Auto-calculation untuk field `kotor` dan `bersih`
- Preview perhitungan sebelum submit
- Error handling dengan pesan yang jelas

**READ (Tampilkan Data)**
- Tabel interaktif menggunakan TanStack Table v8
- Sorting multi-column (klik header untuk sort)
- Pagination (10, 25, 50, 100 rows per page)
- Global search across multiple fields
- Column visibility toggle (show/hide columns)
- Responsive table (horizontal scroll di mobile)

**UPDATE (Edit Data)**
- Edit dialog dengan form pre-filled
- Validasi sama seperti create
- Auto-update `updatedAt` timestamp
- Re-calculate kotor & bersih otomatis

**DELETE (Hapus Data)**
- Single delete dengan confirmation dialog
- Bulk delete (pilih multiple rows → delete selected)
- Undo tidak tersedia (permanent delete)

### 3. Auto-Calculation

**Rumus Perhitungan (Sistem Otomatis):**
```
1. Gaji Kotor = Jumlah Hari × Tarif
2. Potongan = Gaji Kotor × (PPH / 100)
3. Gaji Bersih = Gaji Kotor - Potongan
```

**Fitur:**
- ✅ Real-time calculation saat input form
- ✅ PPH dalam format Persen (%) - User input angka 5 untuk 5%
- ✅ Preview hasil perhitungan sebelum save
- ✅ Auto-update saat edit data
- ✅ Validasi: kotor, potongan, dan bersih tidak bisa diinput manual (read-only)
- ✅ Semua kalkulasi dilakukan otomatis oleh sistem

**Contoh Perhitungan:**
```
Input (User hanya input ini):
- Jumlah Hari: 22 hari
- Tarif: Rp 500.000 per hari
- PPH: 5 (berarti 5%)

Output (Dihitung Otomatis oleh Sistem):
- Kotor: Rp 11.000.000  (22 × 500.000)
- Potongan: Rp 550.000  (11.000.000 × 5/100)
- Bersih: Rp 10.450.000  (11.000.000 - 550.000)
```

**Catatan Penting:**
- User HANYA perlu input: **Jumlah Hari**, **Tarif**, dan **PPH (%)**
- Field **Kotor**, **Potongan**, dan **Bersih** dihitung otomatis oleh sistem
- PPH diinput dalam format persen (contoh: input `5` untuk PPH 5%)
- Sistem akan otomatis menghitung potongan berdasarkan persentase PPH
- Tidak ada input manual untuk field yang dihitung otomatis

### 4. Advanced Filtering

**Filter Options:**

1. **Tahun** (Dropdown)
   - Menampilkan tahun unik dari data yang ada
   - Sorted descending (terbaru di atas)

2. **Bulan** (Dropdown)
   - 12 bulan: Januari - Desember
   - Filter data berdasarkan bulan

3. **Date Range** (Calendar Picker)
   - Pilih tanggal mulai (from) dan tanggal akhir (to)
   - Filter data dalam rentang tanggal tersebut

4. **Golongan** (Dropdown)
   - Pilihan: All, PNS, Non-PNS
   - Filter data berdasarkan kategori pegawai

5. **Global Search** (Input Text)
   - Search across fields: kodeSatker, NIP, nama pegawai, noGaji, NPWP, bank, no rekening
   - Case-insensitive
   - Debounced (delay 300ms untuk performa)

**Quick Filters:**
- 🔵 **Bulan Ini**: Otomatis filter data bulan dan tahun sekarang
- 🟢 **Tahun Ini**: Otomatis filter data tahun sekarang
- 🟡 **3 Bulan Terakhir**: Otomatis filter data 3 bulan terakhir dari hari ini

**Reset Filter:**
- Tombol "Reset" untuk clear semua filter sekaligus

### 5. Excel Import

**Fitur:**
- ✅ Upload file .xlsx atau .xls
- ✅ Template Excel tersedia (download dari aplikasi)
- ✅ Validasi otomatis untuk setiap row:
  - NIP harus 18 digit
  - NPWP harus 15 digit
  - Nama Pegawai wajib diisi
- ✅ Import Result Summary:
  - Jumlah data berhasil
  - Jumlah data gagal
  - List error dengan nomor row dan pesan error
- ✅ Preview 5 data valid pertama (jika ada error)
- ✅ Auto-import jika semua data valid
- ✅ Manual confirm jika ada error (hanya import yang valid)

**Excel Template Columns:**
```
1. Kode Satker
2. Bulan
3. Tahun
4. Tanggal (format: YYYY-MM-DD)
5. No Gaji
6. NIP (18 digit)
7. Nama Pegawai
8. Kode Gol
9. NPWP (15 digit)
10. Kode Bank SPAN
11. Nama Bank SPAN
12. No Rek
13. Nama Cabang Bank
14. Jumlah Hari
15. Tarif
16. PPH
17. Potongan
18. Golongan (PNS atau Non-PNS)
```

**Generate Template:**
```bash
node generate-template.js
```
File akan tersimpan di: `public/template_gaji.xlsx`

### 6. Excel Export

**Export Options:**

1. **Export All Data**
   - Export seluruh data tanpa filter
   - Format: `Gaji_YYYYMMDD.xlsx`

2. **Export Filtered Data**
   - Export data sesuai filter yang aktif
   - Format: `Gaji_[Tahun]_[Bulan]_[Golongan]_YYYYMMDD.xlsx`
   - Contoh: `Gaji_2025_Januari_PNS_20250115.xlsx`

3. **Export Selected Rows**
   - Export hanya row yang dipilih (checkbox)
   - Format: `Gaji_YYYYMMDD.xlsx`

**Excel Output:**

File Excel berisi 2 sheets:

**Sheet 1: "Data Gaji"**
- Semua data dengan 19 columns (exclude id, createdAt, updatedAt)
- Header columns dalam Bahasa Indonesia

**Sheet 2: "Summary"**
- Total Data
- Total PNS
- Total Non-PNS
- Total Kotor
- Total Bersih
- Export Date

### 7. Statistics Dashboard

**4 Stats Cards:**

1. **Total Data**
   - Jumlah seluruh data (berdasarkan filter aktif)
   - Icon: FileText
   - Color: Blue

2. **Total PNS**
   - Jumlah pegawai dengan golongan PNS
   - Icon: Users
   - Color: Green

3. **Total Gaji Kotor**
   - Sum dari semua gaji kotor
   - Format: Rp X.XXX.XXX
   - Icon: DollarSign
   - Color: Yellow

4. **Total Gaji Bersih**
   - Sum dari semua gaji bersih
   - Format: Rp X.XXX.XXX
   - Icon: TrendingUp
   - Color: Green

**Real-time Update:**
- Stats otomatis update saat:
  - Add/edit/delete data
  - Apply/change filter
  - Import data

### 8. UI/UX Features

**Design:**
- ✅ Clean & modern interface dengan shadcn/ui
- ✅ Consistent color scheme (Blue & Gray)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessible components (Radix UI)

**Feedback:**
- ✅ Toast notifications untuk setiap action (success/error)
- ✅ Loading states pada saat proses data
- ✅ Confirmation dialogs untuk destructive actions
- ✅ Form validation errors dengan pesan yang jelas
- ✅ Empty states saat tidak ada data

**Navigation:**
- ✅ Sidebar dengan menu Dashboard
- ✅ Topbar dengan user info dan logout button
- ✅ Breadcrumbs (future improvement)

**Performance:**
- ✅ Debounced search (mengurangi re-renders)
- ✅ Memoization dengan useMemo untuk expensive calculations
- ✅ Lazy loading components (future improvement)

---

## 📁 Struktur Folder

```
ditjen-dashboard/
│
├── public/                          # Static assets
│   ├── template_gaji.xlsx          # Excel template untuk import
│   └── vite.svg                    # Favicon
│
├── src/
│   ├── components/                 # React components
│   │   │
│   │   ├── ui/                    # shadcn/ui base components
│   │   │   ├── button.tsx         # Button component
│   │   │   ├── input.tsx          # Input field
│   │   │   ├── label.tsx          # Label
│   │   │   ├── select.tsx         # Dropdown select
│   │   │   ├── dialog.tsx         # Modal dialog
│   │   │   ├── table.tsx          # Table primitives
│   │   │   ├── card.tsx           # Card container
│   │   │   ├── badge.tsx          # Badge/pill
│   │   │   ├── checkbox.tsx       # Checkbox input
│   │   │   ├── calendar.tsx       # Date picker calendar
│   │   │   ├── popover.tsx        # Popover container
│   │   │   ├── dropdown-menu.tsx  # Dropdown menu
│   │   │   └── index.ts           # Export all UI components
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Sidebar.tsx        # Left sidebar navigation
│   │   │   ├── Topbar.tsx         # Top navigation bar
│   │   │   └── DashboardLayout.tsx # Main layout wrapper
│   │   │
│   │   ├── auth/                  # Authentication components
│   │   │   └── LoginForm.tsx      # Login form
│   │   │
│   │   └── dashboard/             # Dashboard-specific components
│   │       ├── StatsCards.tsx     # 4 statistics cards
│   │       ├── DataTable.tsx      # Main data table (TanStack)
│   │       ├── TableColumns.tsx   # Column definitions
│   │       ├── DataForm.tsx       # Reusable form (add/edit)
│   │       ├── AddDataDialog.tsx  # Add data modal
│   │       ├── EditDataDialog.tsx # Edit data modal
│   │       ├── DeleteConfirmDialog.tsx # Delete confirmation
│   │       ├── ImportExcelDialog.tsx   # Import Excel modal
│   │       ├── ExportButton.tsx   # Export dropdown button
│   │       └── FilterBar/         # Filter components
│   │           └── index.tsx      # Main filter bar
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts             # Authentication hook
│   │   ├── useDataGaji.ts         # Data CRUD operations hook
│   │   ├── useFilters.ts          # Filtering logic hook
│   │   └── useLocalStorage.ts     # localStorage wrapper hook
│   │
│   ├── lib/                       # Business logic & utilities
│   │   ├── database.ts            # localStorage CRUD operations
│   │   ├── calculations.ts        # Auto-calculation functions
│   │   ├── excel.ts               # Excel import/export logic
│   │   ├── auth.ts                # Authentication logic
│   │   ├── validations.ts         # Zod validation schemas
│   │   └── utils.ts               # Utility functions (formatCurrency, etc)
│   │
│   ├── pages/                     # Page components
│   │   ├── LoginPage.tsx          # Login page
│   │   ├── DashboardPage.tsx      # Main dashboard page
│   │   └── NotFoundPage.tsx       # 404 error page
│   │
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts               # All interfaces & types
│   │
│   ├── App.tsx                    # Root component with routing
│   ├── main.tsx                   # Entry point (ReactDOM.render)
│   └── index.css                  # Global CSS & Tailwind imports
│
├── generate-template.js           # Script untuk generate Excel template
│
├── package.json                   # Dependencies & scripts
├── package-lock.json              # Locked versions
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TS config
├── tsconfig.node.json             # Node-specific TS config
├── vite.config.ts                 # Vite build configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.js               # ESLint rules
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point
└── README.md                      # This file
```

### Penjelasan Struktur

**`/components`**: Berisi semua React components, dibagi menjadi:
- `ui/`: Base components dari shadcn/ui yang reusable
- `layout/`: Components untuk struktur layout (Sidebar, Topbar)
- `auth/`: Components untuk authentication
- `dashboard/`: Components spesifik untuk halaman dashboard

**`/hooks`**: Custom React hooks untuk state management dan business logic

**`/lib`**: Pure JavaScript/TypeScript functions untuk business logic tanpa React dependencies

**`/pages`**: Top-level page components yang di-render oleh React Router

**`/types`**: TypeScript type definitions untuk type safety

---

## 🚀 Cara Instalasi & Menjalankan

### Prasyarat

Pastikan sudah terinstall:
- **Node.js** versi 20.19+ atau 22.12+ ([Download](https://nodejs.org/))
- **npm** (included dengan Node.js) atau **yarn**
- **Git** (optional, untuk clone repository)
- **Code Editor**: Visual Studio Code (recommended)

### Langkah Instalasi di Laptop Baru

#### 1. Download Project

**Opsi A: Download ZIP**
- Download file ZIP
- Extract ke folder yang diinginkan
- Buka terminal di folder tersebut

#### 2. Install Dependencies

```bash
cd ditjen-dashboard
```

```bash
npm install
```

Perintah ini akan:
- Download semua package dari npm registry
- Install ke folder `node_modules/`
- Membuat file `package-lock.json` (jika belum ada)
- Durasi: ~2-5 menit (tergantung kecepatan internet)

**Jika ada error (opsional):**
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install

# Atau gunakan npm clean cache
npm cache clean --force
npm install
```

#### 3. Generate Excel Template (Optional)

```bash
node generate-template.js
```

File `template_gaji.xlsx` akan dibuat di folder `public/`

#### 4. Jalankan Development Server (Intinya)

```bash
npm run dev
```

Output:
```
VITE v7.3.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

#### 5. Buka Browser

Akses aplikasi di: **http://localhost:5173/**

Default login:
- Username: `admin`
- Password: `admin123`

### Commands Tersedia

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Jalankan development server (hot reload) |
| `npm run build` | Build untuk production (output: `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint untuk check code quality |

### Port Configuration

Default port: `5173`

Jika port sudah terpakai, Vite otomatis akan mencari port berikutnya (5174, 5175, dst).

Untuk set port custom:
```bash
npm run dev -- --port 3000
```

### Troubleshooting Instalasi

**Problem: "npm: command not found"**
- **Solusi**: Install Node.js dari https://nodejs.org/

**Problem: "EACCES: permission denied"**
- **Solusi** (Linux/Mac):
  ```bash
  sudo npm install
  ```

**Problem: "Cannot find module"**
- **Solusi**:
  ```bash
  rm -rf node_modules
  npm install
  ```

**Problem: Port 5173 sudah terpakai**
- **Solusi**: Ganti port dengan `--port 3000` atau stop aplikasi yang menggunakan port tersebut

**Problem: "Module not found: Can't resolve '@/...'"**
- **Solusi**: Path alias sudah dikonfigurasi di `vite.config.ts`, pastikan import menggunakan `@/` bukan `./`

---

## 📖 Panduan Penggunaan

### 1. Login ke Aplikasi

1. Buka browser dan akses `http://localhost:5173/`
2. Masukkan credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Klik tombol **"Login"**
4. Jika berhasil, akan redirect ke Dashboard

**Catatan**: Jika username atau password salah, akan muncul notifikasi error.

### 2. Navigasi Dashboard

Setelah login, Anda akan melihat:

**Topbar (Atas)**:
- Logo/Title: "Dashboard Data Gaji"
- User info dengan dropdown:
  - Nama: Administrator (admin)
  - Role: Admin
  - Tombol Logout

**Sidebar (Kiri)**:
- Menu Dashboard (active)

**Main Content**:
- Statistics Cards (4 cards)
- Filter Bar
- Action Buttons (Add, Import, Export)
- Data Table

### 3. Melihat Data (READ)

**Statistics Cards**:
- Menampilkan summary:
  - Total Data
  - Total PNS
  - Total Gaji Kotor
  - Total Gaji Bersih

**Data Table**:
- Scroll horizontal untuk melihat semua kolom
- Klik header kolom untuk sorting (ascending/descending)
- Gunakan pagination di bawah tabel (Next/Previous)
- Ubah jumlah rows per page (10, 25, 50, 100)

**Column Visibility**:
- Klik tombol "Columns" di atas tabel
- Checklist untuk show/hide kolom tertentu

### 4. Menambah Data (CREATE)

1. Klik tombol **"+ Tambah Data"** (tombol biru di atas tabel)
2. Dialog form akan muncul dengan 4 section:

   **Section 1: Informasi Dasar**
   - Kode Satker
   - No. Gaji
   - Bulan (dropdown)
   - Tahun
   - Tanggal (format: YYYY-MM-DD, contoh: 2025-01-15)
   - Jumlah Hari (1-31)

   **Section 2: Data Pegawai**
   - NIP (18 digit, contoh: 199001012010011001)
   - Nama Pegawai
   - Kode Golongan
   - NPWP (15 digit, contoh: 123456789012345)
   - Golongan (dropdown: PNS/Non-PNS)

   **Section 3: Data Bank**
   - Kode Bank SPAN
   - Nama Bank SPAN
   - No. Rekening
   - Nama Cabang Bank

   **Section 4: Gaji & Potongan**
   - Tarif per hari (dalam Rupiah, contoh: 500000)
   - PPH dalam Persen (contoh: 5 untuk PPH 5%)
   - **Kotor** (auto-calculated, read-only)
   - **Potongan** (auto-calculated, read-only)
   - **Bersih** (auto-calculated, read-only)

3. Isi semua field yang wajib (ditandai dengan `*`)
4. Lihat preview perhitungan Kotor, Potongan, dan Bersih (dihitung otomatis)
5. Klik **"Simpan Data"**
6. Jika berhasil, muncul notifikasi hijau "Data berhasil ditambahkan!"
7. Data baru akan muncul di tabel

**Validasi Error**:
- Jika ada field yang tidak valid, muncul pesan error berwarna merah di bawah field tersebut
- Contoh error:
  - "NIP harus 18 digit"
  - "NPWP harus 15 digit"
  - "Kode Satker wajib diisi"

### 5. Mengedit Data (UPDATE)

1. Pada row data yang ingin diedit, klik tombol **"Edit"** (icon Pencil)
2. Dialog form akan muncul dengan data yang sudah terisi
3. Ubah field yang ingin diubah
4. Perhitungan Kotor, Potongan, dan Bersih akan update otomatis
5. Klik **"Update Data"**
6. Jika berhasil, muncul notifikasi "Data berhasil diupdate!"
7. Data di tabel akan terupdate

### 6. Menghapus Data (DELETE)

**Single Delete:**
1. Pada row data yang ingin dihapus, klik tombol **"Delete"** (icon Trash)
2. Muncul confirmation dialog "Apakah Anda yakin ingin menghapus data ini?"
3. Klik **"Hapus"** untuk confirm atau **"Batal"** untuk cancel
4. Jika confirm, muncul notifikasi "Data berhasil dihapus!"
5. Data akan hilang dari tabel

**Bulk Delete (Multiple):**
1. Checklist beberapa row yang ingin dihapus (checkbox di kolom pertama)
2. Klik tombol **"Delete Selected"** di atas tabel
3. Muncul confirmation dialog dengan jumlah data yang akan dihapus
4. Klik **"Hapus"** untuk confirm
5. Semua data yang dipilih akan terhapus

### 7. Filtering Data

**Filter by Tahun:**
1. Klik dropdown "Semua Tahun"
2. Pilih tahun yang diinginkan
3. Tabel akan otomatis filter

**Filter by Bulan:**
1. Klik dropdown "Semua Bulan"
2. Pilih bulan (Januari-Desember)
3. Tabel akan otomatis filter

**Filter by Date Range:**
1. Klik input "Tanggal Mulai"
2. Pilih tanggal dari calendar
3. Klik input "Tanggal Akhir"
4. Pilih tanggal dari calendar
5. Tabel akan menampilkan data dalam rentang tanggal tersebut

**Filter by Golongan:**
1. Klik dropdown "Golongan"
2. Pilih "PNS" atau "Non-PNS"
3. Tabel akan filter sesuai pilihan

**Global Search:**
1. Ketik di search box "Cari data..."
2. Tabel akan filter otomatis (search di NIP, nama, kodeSatker, dll)

**Quick Filters:**
- Klik **"Bulan Ini"**: Otomatis filter data bulan & tahun sekarang
- Klik **"Tahun Ini"**: Otomatis filter data tahun sekarang
- Klik **"3 Bulan Terakhir"**: Otomatis filter data 3 bulan terakhir

**Reset Filter:**
- Klik tombol **"Reset"** untuk clear semua filter

**Catatan**: Filter bisa dikombinasikan (contoh: Tahun 2025 + Bulan Januari + Golongan PNS)

### 8. Import Data dari Excel

**Persiapan:**
1. Download template Excel:
   - Klik tombol **"Import Excel"**
   - Di dalam dialog, klik **"Download Template"**
   - File `template_gaji.xlsx` akan terdownload
2. Buka file template di Microsoft Excel atau Google Sheets
3. Isi data sesuai format (lihat contoh di row pertama)
4. Save file

**Import Process:**
1. Klik tombol **"Import Excel"**
2. Klik **"Pilih File"** atau drag & drop file
3. Pilih file .xlsx atau .xls yang sudah diisi
4. Aplikasi akan memproses file (tunggu beberapa detik)
5. Muncul **Import Result**:

   **Jika semua data valid:**
   - ✅ "X data berhasil diimport"
   - Data otomatis masuk ke tabel
   - Klik **"Tutup"**

   **Jika ada error:**
   - ✅ "X data berhasil"
   - ❌ "Y data gagal"
   - List error dengan nomor row dan pesan error
   - Preview 5 data valid pertama
   - Pilihan:
     - **"Import Data Valid"**: Import hanya yang valid
     - **"Batal"**: Cancel import

**Validasi:**
- NIP harus 18 digit
- NPWP harus 15 digit
- Nama Pegawai wajib diisi
- Format tanggal harus benar
- Golongan harus "PNS" atau "Non-PNS"

**Tips:**
- Jangan ubah header column di template
- Gunakan format tanggal YYYY-MM-DD (contoh: 2025-01-15)
- NIP dan NPWP harus berupa text (awali dengan tanda petik ' jika diperlukan)
- Pastikan tidak ada row kosong di tengah-tengah data

### 9. Export Data ke Excel

1. Klik tombol **"Export Excel"** (icon Download)
2. Pilih opsi export:

   **a. Export All Data**
   - Export seluruh data tanpa memperhatikan filter
   - Filename: `Gaji_YYYYMMDD.xlsx`

   **b. Export Filtered Data**
   - Export hanya data yang sesuai filter aktif
   - Filename: `Gaji_[Tahun]_[Bulan]_[Golongan]_YYYYMMDD.xlsx`
   - Contoh: `Gaji_2025_Januari_PNS_20250115.xlsx`

   **c. Export Selected Rows**
   - Export hanya row yang dichecklist
   - Filename: `Gaji_YYYYMMDD.xlsx`

3. File Excel akan otomatis terdownload
4. Buka file Excel untuk melihat hasil export

**Isi File Excel:**
- **Sheet "Data Gaji"**: Tabel data lengkap
- **Sheet "Summary"**: Statistik (Total Data, PNS, Non-PNS, Kotor, Bersih)

### 10. Logout

1. Klik nama user di Topbar (kanan atas)
2. Klik **"Logout"**
3. Akan redirect ke Login Page
4. Session akan dihapus (harus login lagi untuk akses dashboard)

---

## 🚢 Deployment ke Vercel

### Persiapan

1. **Buat akun Vercel**:
   - Kunjungi https://vercel.com/
   - Sign up dengan GitHub, GitLab, atau Bitbucket

2. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

### Metode 1: Deploy via Vercel CLI (Recommended)

**Step-by-Step:**

1. **Build project**:
   ```bash
   npm run build
   ```

   Output akan berada di folder `dist/`

2. **Login ke Vercel**:
   ```bash
   vercel login
   ```

   Pilih metode login (GitHub, Email, dll)

3. **Deploy**:
   ```bash
   vercel --prod
   ```

   Vercel akan:
   - Detect project configuration otomatis
   - Upload folder `dist/`
   - Deploy ke production
   - Memberikan URL production (contoh: `ditjen-dashboard.vercel.app`)

4. **Cek deployment**:
   - Buka URL yang diberikan
   - Test aplikasi di production

**Custom Domain (Optional):**
```bash
vercel domains add yourdomain.com
```

Follow instruksi untuk configure DNS.

### Metode 2: Deploy via Vercel Dashboard (Git Integration)

**Step-by-Step:**

1. **Push project ke Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-git-url>
   git push -u origin main
   ```

2. **Import project di Vercel**:
   - Login ke https://vercel.com/dashboard
   - Klik **"Add New Project"**
   - Import repository dari GitHub/GitLab/Bitbucket
   - Pilih repository `ditjen-dashboard`

3. **Configure project**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Klik **"Deploy"**
   - Tunggu proses build (2-5 menit)
   - Setelah selesai, klik URL untuk melihat aplikasi

5. **Auto-deployment**:
   - Setiap push ke branch `main` akan otomatis re-deploy
   - Preview deployments untuk setiap pull request

### Environment Variables (Jika Diperlukan)

Jika ada environment variables (API keys, dll):

1. Di Vercel Dashboard → Project Settings → Environment Variables
2. Tambahkan variable dengan format:
   - Key: `VITE_API_KEY`
   - Value: `your-api-key`
3. Redeploy project

Di kode, akses dengan:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

### Monitoring & Analytics

- **Deployments**: Lihat history deployments di dashboard
- **Analytics**: Enable di Project Settings → Analytics
- **Logs**: Realtime logs di dashboard untuk debugging

### Custom Domain

1. Di Vercel Dashboard → Project Settings → Domains
2. Klik **"Add Domain"**
3. Masukkan domain (contoh: `dashboard.ditjen.go.id`)
4. Configure DNS sesuai instruksi Vercel:
   - Type: `A` Record
   - Name: `@` atau `dashboard`
   - Value: `76.76.21.21` (Vercel IP)
5. Tunggu DNS propagation (1-48 jam)

### SSL Certificate

- Vercel otomatis provide SSL certificate (HTTPS)
- Certificate auto-renew
- No configuration needed

### Rollback

Jika deployment bermasalah:

1. Di Vercel Dashboard → Deployments
2. Pilih deployment sebelumnya yang stable
3. Klik **"Promote to Production"**
4. Instant rollback tanpa downtime

---

## 🔧 Troubleshooting

### 1. Aplikasi Tidak Bisa Login

**Problem**: Setelah input username dan password, tidak terjadi apa-apa atau muncul error.

**Kemungkinan Penyebab & Solusi**:

- **Username/password salah**
  - Pastikan menggunakan:
    - Username: `admin` (lowercase)
    - Password: `admin123`

- **localStorage disabled di browser**
  - Cek browser settings → Privacy → Allow cookies and site data
  - Jangan gunakan Incognito/Private mode (localStorage mungkin dibatasi)

- **Console error**
  - Buka Developer Tools (F12)
  - Lihat tab Console untuk error messages
  - Screenshot error dan konsultasikan

### 2. Data Tidak Tersimpan / Hilang Setelah Refresh

**Problem**: Setelah tambah data dan refresh page, data hilang.

**Kemungkinan Penyebab & Solusi**:

- **localStorage di-clear browser**
  - Jangan clear browser data/cookies saat aplikasi sedang digunakan
  - Backup data dengan export Excel secara berkala

- **Browser mode Private/Incognito**
  - localStorage di private mode akan di-clear setelah tab ditutup
  - Gunakan normal mode untuk penggunaan production

- **Quota localStorage penuh**
  - localStorage limit ~5-10MB per domain
  - Hapus data lama yang tidak diperlukan
  - Export data berkala dan clear localStorage

- **Bug di code**
  - Check console untuk error
  - Verify bahwa fungsi `createData()` dipanggil dengan benar

### 3. Import Excel Gagal / Error

**Problem**: Upload file Excel tapi tidak terjadi apa-apa atau muncul error.

**Kemungkinan Penyebab & Solusi**:

- **Format file salah**
  - Pastikan file berformat .xlsx atau .xls
  - Jangan gunakan .csv atau format lain

- **Header column tidak sesuai template**
  - Download template dari aplikasi
  - Copy-paste header dari template
  - Jangan ubah nama column

- **Data tidak valid**
  - NIP harus EXACTLY 18 digit (tidak boleh kurang/lebih)
  - NPWP harus EXACTLY 15 digit
  - Format tanggal: YYYY-MM-DD (contoh: 2025-01-15)
  - Golongan harus "PNS" atau "Non-PNS" (case-sensitive)

- **File terlalu besar**
  - Excel parser bisa lambat untuk file >1000 rows
  - Split data menjadi beberapa file kecil
  - Import secara bertahap

- **NIP/NPWP berformat number, bukan text**
  - Excel otomatis convert ke number (menghilangkan leading zeros)
  - Solution: Format cell sebagai Text sebelum input
  - Atau awali dengan tanda petik `'` (contoh: `'199001012010011001`)

### 4. Table Tidak Menampilkan Data

**Problem**: Tabel kosong padahal sudah ada data di localStorage.

**Kemungkinan Penyebab & Solusi**:

- **Filter terlalu ketat**
  - Check apakah ada filter aktif (tahun, bulan, search, dll)
  - Klik tombol **"Reset"** untuk clear semua filter

- **Data corrupt di localStorage**
  - Buka Developer Tools (F12) → Application → Local Storage
  - Lihat key `ditjen_gaji_data`
  - Jika value-nya bukan valid JSON array, hapus key tersebut
  - Refresh page dan import data ulang

- **JavaScript error**
  - Buka Console (F12) untuk lihat error
  - Refresh page (Ctrl+R atau Cmd+R)

### 5. Auto-Calculation Tidak Berfungsi

**Problem**: Kolom Kotor dan Bersih tidak ter-calculate otomatis.

**Kemungkinan Penyebab & Solusi**:

- **Input tarif, pph, atau potongan kosong**
  - Pastikan semua field diisi dengan angka valid
  - Minimal value: 0

- **Input bukan number**
  - Pastikan input field tidak mengandung karakter selain angka
  - Contoh SALAH: "Rp 5000000" (ada "Rp")
  - Contoh BENAR: "5000000"

- **React state belum update**
  - Wait beberapa detik, calculation berjalan real-time dengan debounce
  - Jika masih tidak update, refresh page

### 6. Export Excel Error

**Problem**: Klik export tapi file tidak terdownload atau muncul error.

**Kemungkinan Penyebab & Solusi**:

- **Browser block download**
  - Check address bar untuk notification "Download blocked"
  - Klik "Allow" untuk izinkan download

- **Tidak ada data untuk di-export**
  - Pastikan ada data di tabel
  - Jika export selected, pastikan ada row yang dipilih (checklist)

- **SheetJS error**
  - Check console untuk error message
  - Try export dengan data yang lebih sedikit dulu (filter by tahun)

### 7. Build Error di Production

**Problem**: `npm run build` gagal dengan error.

**Kemungkinan Penyebab & Solusi**:

- **TypeScript error**
  ```bash
  npm run build
  ```

  Jika ada error, fix TypeScript errors terlebih dahulu.

- **Missing dependencies**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run build
  ```

- **Out of memory**
  ```bash
  export NODE_OPTIONS="--max-old-space-size=4096"
  npm run build
  ```

### 8. Deployment Vercel Gagal

**Problem**: Deployment di Vercel gagal atau site tidak bisa diakses.

**Kemungkinan Penyebab & Solusi**:

- **Build command salah**
  - Di Vercel dashboard → Project Settings → Build & Development Settings
  - Build Command: `npm run build`
  - Output Directory: `dist`

- **Node version tidak compatible**
  - Tambahkan file `.nvmrc` di root project:
    ```
    20
    ```
  - Atau set di vercel.json:
    ```json
    {
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "framework": "vite",
      "nodejs": "20.x"
    }
    ```

- **Dependencies error**
  - Pastikan `package-lock.json` ter-commit di Git
  - Vercel akan install dependencies sesuai lock file

- **Environment variables missing**
  - Jika aplikasi butuh env variables, set di Vercel Dashboard
  - Project Settings → Environment Variables

### 9. Performa Lambat

**Problem**: Aplikasi terasa lambat, especially saat filter atau search.

**Kemungkinan Penyebab & Solusi**:

- **Data terlalu banyak (>5000 rows)**
  - TanStack Table bisa handle ribuan rows, tapi browser bisa lambat
  - Solution: Implementasi server-side pagination (future improvement)
  - Workaround: Filter data by tahun untuk reduce rows

- **Search debounce terlalu cepat**
  - Default debounce: 300ms
  - Bisa diubah di `useFilters.ts` jika diperlukan

- **Browser extension conflict**
  - Disable ad blockers atau extensions yang modify DOM
  - Try di Incognito mode untuk test

### 10. Data Corrupt / Tidak Konsisten

**Problem**: Data menampilkan value yang aneh atau tidak konsisten.

**Solusi**:

1. **Backup data dulu**:
   - Export all data ke Excel
   - Save file sebagai backup

2. **Clear localStorage**:
   - Buka Developer Tools (F12)
   - Application → Local Storage
   - Right-click → Clear
   - Refresh page

3. **Import ulang dari backup**:
   - Import file Excel yang sudah di-backup
   - Verify data sudah benar

4. **Preventif**:
   - Jangan manually edit localStorage
   - Selalu gunakan aplikasi untuk manage data
   - Export backup secara berkala

---

## 📝 Catatan Penting untuk Sidang Skripsi

### Konsep yang Perlu Dipahami

1. **Client-Side Storage (localStorage)**:
   - Data disimpan di browser user, bukan di server
   - Limit: ~5-10MB per domain
   - Persistent: Data tetap ada setelah browser ditutup
   - Trade-off: Tidak ada sinkronisasi antar device

2. **Single Page Application (SPA)**:
   - Aplikasi hanya punya 1 HTML file (`index.html`)
   - Navigasi menggunakan client-side routing (React Router)
   - Tidak ada page reload saat pindah halaman
   - Faster user experience

3. **Component-Based Architecture**:
   - UI dibagi menjadi komponen-komponen kecil yang reusable
   - Setiap komponen punya state dan props sendiri
   - Easier to maintain dan test

4. **Type Safety dengan TypeScript**:
   - Mengurangi runtime errors
   - Better IDE autocomplete
   - Self-documenting code

5. **Reactive State Management**:
   - UI otomatis update saat data berubah
   - Menggunakan React hooks (useState, useEffect, useMemo)
   - Unidirectional data flow

### Fitur Unggulan yang Bisa Ditonjolkan

1. **Auto-Calculation**:
   - Mengurangi human error dalam perhitungan
   - Real-time feedback

2. **Data Validation**:
   - Mencegah data tidak valid masuk ke sistem
   - User-friendly error messages

3. **Import/Export Excel**:
   - Kompatibel dengan workflow existing
   - Memudahkan migrasi data

4. **Advanced Filtering**:
   - Multiple filter criteria
   - Quick filters untuk use case umum

5. **Responsive Design**:
   - Bisa diakses dari desktop, tablet, mobile

### Limitasi yang Perlu Dijelaskan

1. **Tidak Ada Backend**:
   - Data hanya tersimpan di browser
   - Tidak ada multi-user collaboration
   - Data tidak ter-backup otomatis

2. **Tidak Ada Role-Based Access Control (RBAC)**:
   - Hanya 1 user (admin)
   - Semua user punya akses penuh

3. **Tidak Ada Audit Trail**:
   - Tidak ada history siapa yang ubah data
   - Tidak ada versioning

4. **localStorage Limit**:
   - Max data ~5-10MB
   - Untuk data sangat banyak, perlu backend database

### Future Improvements (Untuk Diskusi)

1. **Backend Integration**:
   - Node.js + Express + PostgreSQL/MySQL
   - RESTful API atau GraphQL
   - Multi-user support

2. **Authentication & Authorization**:
   - JWT-based auth
   - Role-based permissions (Admin, User, Read-only)

3. **Advanced Features**:
   - Audit trail & activity log
   - Data versioning & rollback
   - Real-time collaboration (WebSocket)
   - Advanced reporting & charts
   - Email notifications

4. **Performance Optimization**:
   - Server-side pagination
   - Lazy loading
   - Virtual scrolling untuk large tables

5. **Security**:
   - HTTPS enforcement
   - Input sanitization
   - CSRF protection
   - Rate limiting

### Tips Presentasi Sidang

1. **Demo Live**:
   - Siapkan data dummy yang sudah ada
   - Show case fitur-fitur utama
   - Prepare untuk offline demo (jika internet bermasalah)

2. **Explain Architecture**:
   - Gunakan diagram arsitektur di README ini
   - Jelaskan flow data dari UI ke localStorage

3. **Show Code Quality**:
   - Mention TypeScript untuk type safety
   - Explain component reusability
   - Show validation schemas

4. **Diskusi Trade-offs**:
   - Why localStorage instead of backend? (Simplicity, no server cost, fast development)
   - Why client-side rendering? (Better UX, no server load)

5. **Prepare untuk Pertanyaan Umum**:
   - "Bagaimana jika data hilang?" → Export backup berkala
   - "Bagaimana multi-user?" → Future improvement dengan backend
   - "Bagaimana keamanan data?" → localStorage bisa di-encrypt, tapi current implementation fokus ke functionality dulu
   - "Scalability?" → localStorage limit ~5-10MB, untuk production butuh backend

---

## 📄 License

MIT License

Copyright (c) 2025 DITJEN PEMBANGUNAN DAERAH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 📞 Kontak & Support

Untuk pertanyaan atau bantuan terkait aplikasi ini, silakan hubungi:

- **Email**: admin@ditjen.go.id
- **GitHub Issues**: [Project Issues](https://github.com/your-repo/issues)
- **Dokumentasi Online**: [Documentation](https://your-docs-url.com)

---

**Dibuat dengan ❤️ untuk DITJEN PEMBANGUNAN DAERAH**

*Last Updated: 2025-12-23*
