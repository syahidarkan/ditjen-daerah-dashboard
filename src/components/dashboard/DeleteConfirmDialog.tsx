import { AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DataGaji } from "@/types";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DataGaji | null;
  onConfirm: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  data,
  onConfirm,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  const handleConfirm = async () => {
    if (data) {
      await onConfirm(data.id);
      onOpenChange(false);
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] sm:max-w-md p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="flex items-center gap-2 text-red-600 text-base sm:text-lg">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            Konfirmasi Hapus Data
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Anda yakin ingin menghapus data gaji berikut?
          </p>

          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="font-medium text-gray-600">NIP:</span>
              <span className="font-semibold truncate ml-2">{data.nip}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="font-medium text-gray-600">Nama:</span>
              <span className="font-semibold truncate ml-2">{data.namaPegawai}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="font-medium text-gray-600">Periode:</span>
              <span className="font-semibold">
                {data.bulan} {data.tahun}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-red-600 font-medium">
            Data yang dihapus tidak dapat dikembalikan!
          </p>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto text-sm h-9 sm:h-10"
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto text-sm h-9 sm:h-10"
          >
            {isLoading ? "Menghapus..." : "Ya, Hapus Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
