import * as XLSX from "xlsx";
import type { DataGaji, CreateDataGaji, ImportResult } from "@/types";

export const importFromExcel = async (file: File): Promise<{
  data: CreateDataGaji[];
  result: ImportResult;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const successData: CreateDataGaji[] = [];
        const errors: Array<{ row: number; message: string }> = [];

        jsonData.forEach((row: any, index: number) => {
          try {
            const transformedRow: CreateDataGaji = {
              kodeSatker: String(row["Kode Satker"] || ""),
              bulan: String(row["Bulan"] || ""),
              tahun: Number(row["Tahun"]) || new Date().getFullYear(),
              tanggal: String(row["Tanggal"] || ""),
              noGaji: String(row["No Gaji"] || ""),
              nip: String(row["NIP"] || ""),
              namaPegawai: String(row["Nama Pegawai"] || ""),
              kodeGol: String(row["Kode Gol"] || ""),
              npwp: String(row["NPWP"] || ""),
              kodeBankSpan: String(row["Kode Bank SPAN"] || ""),
              namaBankSpan: String(row["Nama Bank SPAN"] || ""),
              noRek: String(row["No Rek"] || ""),
              namaCabangBank: String(row["Nama Cabang Bank"] || ""),
              jumlahHari: Number(row["Jumlah Hari"]) || 0,
              tarif: Number(row["Tarif"]) || 0,
              pph: Number(row["PPH"]) || 0,
              golongan: (row["Golongan"] === "PNS" || row["Golongan"] === "Non-PNS")
                ? row["Golongan"]
                : "Non-PNS",
            };

            if (!transformedRow.nip || transformedRow.nip.length !== 18) {
              throw new Error("NIP harus 18 digit");
            }
            if (!transformedRow.npwp || transformedRow.npwp.length !== 15) {
              throw new Error("NPWP harus 15 digit");
            }
            if (!transformedRow.namaPegawai) {
              throw new Error("Nama Pegawai wajib diisi");
            }

            successData.push(transformedRow);
          } catch (error: any) {
            errors.push({
              row: index + 2,
              message: error.message || "Invalid data format",
            });
          }
        });

        const result: ImportResult = {
          success: successData.length,
          failed: errors.length,
          errors,
        };

        resolve({ data: successData, result });
      } catch (error: any) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsBinaryString(file);
  });
};

export const exportToExcel = (
  data: DataGaji[],
  filename: string = "Gaji_Export.xlsx"
): void => {
  try {
    const exportData = data.map((item) => ({
      "Kode Satker": item.kodeSatker,
      "Bulan": item.bulan,
      "Tahun": item.tahun,
      "Tanggal": item.tanggal,
      "No Gaji": item.noGaji,
      "NIP": item.nip,
      "Nama Pegawai": item.namaPegawai,
      "Kode Gol": item.kodeGol,
      "NPWP": item.npwp,
      "Kode Bank SPAN": item.kodeBankSpan,
      "Nama Bank SPAN": item.namaBankSpan,
      "No Rek": item.noRek,
      "Nama Cabang Bank": item.namaCabangBank,
      "Jumlah Hari": item.jumlahHari,
      "Tarif": item.tarif,
      "PPH": item.pph,
      "Kotor": item.kotor,
      "Potongan": item.potongan,
      "Bersih": item.bersih,
      "Golongan": item.golongan,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Gaji");

    const totalPNS = data.filter((d) => d.golongan === "PNS").length;
    const totalNonPNS = data.filter((d) => d.golongan === "Non-PNS").length;
    const totalKotor = data.reduce((sum, d) => sum + d.kotor, 0);
    const totalBersih = data.reduce((sum, d) => sum + d.bersih, 0);

    const summary = [
      ["Ringkasan Export"],
      [""],
      ["Total Data", data.length],
      ["Total PNS", totalPNS],
      ["Total Non-PNS", totalNonPNS],
      ["Total Kotor", totalKotor],
      ["Total Bersih", totalBersih],
      [""],
      ["Export Date", new Date().toLocaleString("id-ID")],
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summary);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const finalFilename = filename.includes(".xlsx")
      ? filename
      : `${filename}_${timestamp}.xlsx`;

    XLSX.writeFile(workbook, finalFilename);
  } catch (error: any) {
    console.error("Error exporting to Excel:", error);
    throw new Error(`Failed to export data: ${error.message}`);
  }
};

export const generateExportFilename = (
  tahun?: number | null,
  bulan?: string | null,
  golongan?: string | null
): string => {
  const parts = ["Gaji"];

  if (tahun) parts.push(String(tahun));
  if (bulan) parts.push(bulan);
  if (golongan && golongan !== "ALL") parts.push(golongan);

  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  parts.push(timestamp);

  return `${parts.join("_")}.xlsx`;
};
