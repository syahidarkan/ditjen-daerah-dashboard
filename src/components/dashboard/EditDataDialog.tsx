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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Data Gaji</DialogTitle>
          <DialogDescription>
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
