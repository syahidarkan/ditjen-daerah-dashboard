
export interface DataGaji {
  id: string;
  kodeSatker: string;
  bulan: string;
  tahun: number;
  tanggal: string;
  noGaji: string;
  nip: string;
  namaPegawai: string;
  kodeGol: string;
  npwp: string;
  kodeBankSpan: string;
  namaBankSpan: string;
  noRek: string;
  namaCabangBank: string;
  jumlahHari: number;
  tarif: number;
  pph: number;
  kotor: number;
  potongan: number;
  bersih: number;
  golongan: "PNS" | "Non-PNS";
  createdAt: string;
  updatedAt: string;
}


export type CreateDataGaji = Omit<DataGaji, 'id' | 'kotor' | 'potongan' | 'bersih' | 'createdAt' | 'updatedAt'>;


export type UpdateDataGaji = Partial<Omit<DataGaji, 'id' | 'createdAt'>>;


export interface AuthUser {
  username: string;
  name: string;
  role: string;
}


export interface AuthToken {
  token: string;
  user: AuthUser;
  expiresAt: string;
}


export interface FilterState {
  tahun: number | null;
  bulan: string | null;
  dateRange: {
    from: string | null;
    to: string | null;
  };
  golongan: "ALL" | "PNS" | "Non-PNS";
  searchQuery: string;
}


export interface DashboardStats {
  totalData: number;
  totalPNS: number;
  totalNonPNS: number;
  totalKotor: number;
  totalBersih: number;
}


export interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    message: string;
  }>;
}


export const BULAN_OPTIONS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
] as const;

export type Bulan = typeof BULAN_OPTIONS[number];
