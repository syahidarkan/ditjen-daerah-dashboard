import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataForm } from "./DataForm";
import type { CreateDataGaji } from "@/types";

interface AddDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDataGaji) => Promise<void>;
  isLoading?: boolean;
}

export function AddDataDialog({ open, onOpenChange, onSubmit, isLoading = false }: AddDataDialogProps) {
  const handleSubmit = async (data: CreateDataGaji) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data Gaji</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menambahkan data gaji pegawai baru.
            Field yang ditandai dengan * wajib diisi.
          </DialogDescription>
        </DialogHeader>
        <DataForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
