import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react";
import { importFromExcel } from "@/lib/excel";
import { bulkCreate } from "@/lib/database";
import type { ImportResult } from "@/types";

interface ImportExcelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ImportExcelDialog({ open, onOpenChange, onSuccess }: ImportExcelDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setImportResult(null);
    setPreviewData([]);

    try {
      const { data, result } = await importFromExcel(file);
      setImportResult(result);
      setPreviewData(data.slice(0, 5)); 

      if (result.success > 0) {

        if (result.failed === 0) {
          bulkCreate(data);
          setTimeout(() => {
            onSuccess();
            onOpenChange(false);
          }, 1500);
        }
      }
    } catch (error: any) {
      setImportResult({
        success: 0,
        failed: 1,
        errors: [{ row: 0, message: error.message }],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = () => {
    if (previewData.length > 0) {
      bulkCreate(previewData);
      onSuccess();
      onOpenChange(false);
    }
  };

  const handleDownloadTemplate = () => {

    const link = document.createElement("a");
    link.href = "/template_gaji.xlsx";
    link.download = "template_gaji.xlsx";
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-base sm:text-lg md:text-xl">Import Data dari Excel</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Upload file Excel yang berisi data gaji pegawai. Pastikan format sesuai dengan template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-medium text-blue-900 mb-1">Template Excel</h4>
                <p className="text-xs sm:text-sm text-blue-700 mb-2">
                  Download template Excel untuk melihat format yang benar.
                </p>
                <div className="bg-blue-100 rounded px-2 sm:px-3 py-1.5 sm:py-2 mb-3">
                  <p className="text-xs text-blue-800 font-medium mb-1">Catatan Penting:</p>
                  <ul className="text-xs text-blue-800 space-y-0.5 list-disc list-inside">
                    <li>PPH dalam format <strong>Persen</strong> (contoh: 5 untuk PPH 5%)</li>
                    <li>Tarif adalah tarif <strong>per hari</strong> (contoh: 500000)</li>
                    <li><strong>Kotor, Potongan, Bersih</strong> dihitung otomatis (tidak perlu diisi)</li>
                  </ul>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTemplate}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
                >
                  <FileSpreadsheet className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
              Pilih file Excel untuk diupload
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              File harus berformat .xlsx atau .xls
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full sm:w-auto text-sm h-9 sm:h-10"
            >
              {isLoading ? "Memproses..." : "Pilih File"}
            </Button>
          </div>

          {importResult && (
            <div className="space-y-3 sm:space-y-4">
              {importResult.success > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-green-900">
                        {importResult.success} data berhasil diimport
                      </h4>
                      {importResult.failed === 0 && (
                        <p className="text-xs sm:text-sm text-green-700 mt-1">
                          Semua data telah berhasil diimport ke sistem.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {importResult.failed > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-medium text-red-900 mb-2">
                        {importResult.failed} data gagal diimport
                      </h4>
                      <div className="space-y-1 text-xs sm:text-sm text-red-700">
                        {importResult.errors.slice(0, 5).map((error, idx) => (
                          <p key={idx} className="wrap-break-word">
                            Baris {error.row}: {error.message}
                          </p>
                        ))}
                        {importResult.errors.length > 5 && (
                          <p className="font-medium">
                            Dan {importResult.errors.length - 5} error lainnya...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {previewData.length > 0 && importResult.failed > 0 && (
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                    Preview Data Valid (5 pertama):
                  </h4>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-60">
                      <table className="w-full text-xs sm:text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-2 sm:px-4 py-2 text-left whitespace-nowrap">NIP</th>
                            <th className="px-2 sm:px-4 py-2 text-left whitespace-nowrap">Nama</th>
                            <th className="px-2 sm:px-4 py-2 text-left whitespace-nowrap">Bulan</th>
                            <th className="px-2 sm:px-4 py-2 text-left whitespace-nowrap">Tahun</th>
                            <th className="px-2 sm:px-4 py-2 text-left whitespace-nowrap">Golongan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{row.nip}</td>
                              <td className="px-2 sm:px-4 py-2">{row.namaPegawai}</td>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{row.bulan}</td>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{row.tahun}</td>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap">{row.golongan}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 flex justify-end">
                    <Button onClick={handleConfirmImport} className="w-full sm:w-auto text-sm h-9 sm:h-10">
                      Import {previewData.length} Data Valid
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
