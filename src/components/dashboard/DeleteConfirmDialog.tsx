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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Konfirmasi Hapus Data
          </DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            Anda yakin ingin menghapus data gaji berikut?
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">NIP:</span>
              <span className="font-semibold">{data.nip}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Nama:</span>
              <span className="font-semibold">{data.namaPegawai}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">Periode:</span>
              <span className="font-semibold">
                {data.bulan} {data.tahun}
              </span>
            </div>
          </div>

          <p className="text-sm text-red-600 font-medium">
            Data yang dihapus tidak dapat dikembalikan!
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Menghapus..." : "Ya, Hapus Data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
