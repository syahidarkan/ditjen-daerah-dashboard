import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataForm } from "./DataForm";
import type { DataGaji, CreateDataGaji } from "@/types";

interface EditDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: DataGaji | null;
  onSubmit: (id: string, data: CreateDataGaji) => Promise<void>;
  isLoading?: boolean;
}

export function EditDataDialog({
  open,
  onOpenChange,
  data,
  onSubmit,
  isLoading = false,
}: EditDataDialogProps) {
  const handleSubmit = async (formData: CreateDataGaji) => {
    if (data) {
      await onSubmit(data.id, formData);
      onOpenChange(false);
    }
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-base sm:text-lg md:text-xl">Edit Data Gaji</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Ubah data gaji pegawai {data.namaPegawai} (NIP: {data.nip}).
            Field yang ditandai dengan * wajib diisi.
          </DialogDescription>
        </DialogHeader>
        <DataForm
          initialData={data}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
