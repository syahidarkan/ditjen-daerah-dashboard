import { z } from "zod";

export const gajiSchema = z.object({
  kodeSatker: z.string().min(1, "Kode Satker wajib diisi"),
  bulan: z.string().min(1, "Bulan wajib diisi"),
  tahun: z.number().min(2020, "Tahun minimal 2020").max(2100, "Tahun maksimal 2100"),
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD"),
  noGaji: z.string().min(1, "No. Gaji wajib diisi"),
  nip: z.string().length(18, "NIP harus 18 digit"),
  namaPegawai: z.string().min(1, "Nama Pegawai wajib diisi"),
  kodeGol: z.string().min(1, "Kode Golongan wajib diisi"),
  npwp: z.string().length(15, "NPWP harus 15 digit"),
  kodeBankSpan: z.string().min(1, "Kode Bank SPAN wajib diisi"),
  namaBankSpan: z.string().min(1, "Nama Bank SPAN wajib diisi"),
  noRek: z.string().min(1, "No. Rekening wajib diisi"),
  namaCabangBank: z.string().min(1, "Nama Cabang Bank wajib diisi"),
  jumlahHari: z.number().min(1, "Jumlah Hari minimal 1").max(31, "Jumlah Hari maksimal 31"),
  tarif: z.number().min(0, "Tarif harus lebih dari atau sama dengan 0"),
  pph: z.number().min(0, "PPH (dalam persen) harus lebih dari atau sama dengan 0"),
  golongan: z.enum(["PNS", "Non-PNS"], {
    message: "Golongan harus PNS atau Non-PNS",
  }),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type GajiFormData = z.infer<typeof gajiSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
