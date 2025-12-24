
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gajiSchema, type GajiFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BULAN_OPTIONS, type DataGaji, type CreateDataGaji } from "@/types";
import { autoCalculate } from "@/lib/calculations";

interface DataFormProps {
  initialData?: DataGaji;
  onSubmit: (data: CreateDataGaji) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DataForm({ initialData, onSubmit, onCancel, isLoading = false }: DataFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    
    control,
    formState: { errors },
  } = useForm<GajiFormData>({
    resolver: zodResolver(gajiSchema),
    defaultValues: initialData
      ? {
          kodeSatker: initialData.kodeSatker,
          bulan: initialData.bulan,
          tahun: initialData.tahun,
          tanggal: initialData.tanggal,
          noGaji: initialData.noGaji,
          nip: initialData.nip,
          namaPegawai: initialData.namaPegawai,
          kodeGol: initialData.kodeGol,
          npwp: initialData.npwp,
          kodeBankSpan: initialData.kodeBankSpan,
          namaBankSpan: initialData.namaBankSpan,
          noRek: initialData.noRek,
          namaCabangBank: initialData.namaCabangBank,
          jumlahHari: initialData.jumlahHari,
          tarif: initialData.tarif,
          pph: initialData.pph,
          golongan: initialData.golongan,
        }
      : {
          tahun: new Date().getFullYear(),
          tarif: 0,
          pph: 0,
          jumlahHari: 1,
        },
  });

  const jumlahHari = watch("jumlahHari");
  const tarif = watch("tarif");
  const pph = watch("pph");

  const { kotor, potongan, bersih } = autoCalculate({ jumlahHari, tarif, pph });

  const onFormSubmit = (data: GajiFormData) => {
    const submitData: CreateDataGaji = {
      ...data,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 border-b pb-2">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="kodeSatker" className="text-xs sm:text-sm">Kode Satker *</Label>
            <Input id="kodeSatker" {...register("kodeSatker")} className="h-9 sm:h-10 text-sm" />
            {errors.kodeSatker && (
              <p className="text-xs sm:text-sm text-red-600">{errors.kodeSatker.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="noGaji" className="text-xs sm:text-sm">No. Gaji *</Label>
            <Input id="noGaji" {...register("noGaji")} className="h-9 sm:h-10 text-sm" />
            {errors.noGaji && (
              <p className="text-xs sm:text-sm text-red-600">{errors.noGaji.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="bulan" className="text-xs sm:text-sm">Bulan *</Label>
            <Controller
              name="bulan"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Pilih Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {BULAN_OPTIONS.map((bulan) => (
                      <SelectItem key={bulan} value={bulan} className="text-xs sm:text-sm">
                        {bulan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bulan && (
              <p className="text-xs sm:text-sm text-red-600">{errors.bulan.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="tahun" className="text-xs sm:text-sm">Tahun *</Label>
            <Input
              id="tahun"
              type="number"
              {...register("tahun", { valueAsNumber: true })}
              className="h-9 sm:h-10 text-sm"
            />
            {errors.tahun && (
              <p className="text-xs sm:text-sm text-red-600">{errors.tahun.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="tanggal" className="text-xs sm:text-sm">Tanggal *</Label>
            <Input id="tanggal" type="date" {...register("tanggal")} className="h-9 sm:h-10 text-sm" />
            {errors.tanggal && (
              <p className="text-xs sm:text-sm text-red-600">{errors.tanggal.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="jumlahHari" className="text-xs sm:text-sm">Jumlah Hari *</Label>
            <Input
              id="jumlahHari"
              type="number"
              {...register("jumlahHari", { valueAsNumber: true })}
              className="h-9 sm:h-10 text-sm"
            />
            {errors.jumlahHari && (
              <p className="text-xs sm:text-sm text-red-600">{errors.jumlahHari.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 border-b pb-2">Data Pegawai</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="nip" className="text-xs sm:text-sm">NIP (18 digit) *</Label>
            <Input id="nip" maxLength={18} {...register("nip")} className="h-9 sm:h-10 text-sm" />
            {errors.nip && (
              <p className="text-xs sm:text-sm text-red-600">{errors.nip.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="namaPegawai" className="text-xs sm:text-sm">Nama Pegawai *</Label>
            <Input id="namaPegawai" {...register("namaPegawai")} className="h-9 sm:h-10 text-sm" />
            {errors.namaPegawai && (
              <p className="text-xs sm:text-sm text-red-600">{errors.namaPegawai.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="kodeGol" className="text-xs sm:text-sm">Kode Golongan *</Label>
            <Input id="kodeGol" {...register("kodeGol")} className="h-9 sm:h-10 text-sm" />
            {errors.kodeGol && (
              <p className="text-xs sm:text-sm text-red-600">{errors.kodeGol.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="golongan" className="text-xs sm:text-sm">Golongan *</Label>
            <Controller
              name="golongan"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                    <SelectValue placeholder="Pilih Golongan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PNS" className="text-xs sm:text-sm">PNS</SelectItem>
                    <SelectItem value="Non-PNS" className="text-xs sm:text-sm">Non-PNS</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.golongan && (
              <p className="text-xs sm:text-sm text-red-600">{errors.golongan.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="npwp" className="text-xs sm:text-sm">NPWP (15 digit) *</Label>
            <Input id="npwp" maxLength={15} {...register("npwp")} className="h-9 sm:h-10 text-sm" />
            {errors.npwp && (
              <p className="text-xs sm:text-sm text-red-600">{errors.npwp.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 border-b pb-2">Data Bank</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="kodeBankSpan" className="text-xs sm:text-sm">Kode Bank SPAN *</Label>
            <Input id="kodeBankSpan" {...register("kodeBankSpan")} className="h-9 sm:h-10 text-sm" />
            {errors.kodeBankSpan && (
              <p className="text-xs sm:text-sm text-red-600">{errors.kodeBankSpan.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="namaBankSpan" className="text-xs sm:text-sm">Nama Bank SPAN *</Label>
            <Input id="namaBankSpan" {...register("namaBankSpan")} className="h-9 sm:h-10 text-sm" />
            {errors.namaBankSpan && (
              <p className="text-xs sm:text-sm text-red-600">{errors.namaBankSpan.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="noRek" className="text-xs sm:text-sm">No. Rekening *</Label>
            <Input id="noRek" {...register("noRek")} className="h-9 sm:h-10 text-sm" />
            {errors.noRek && (
              <p className="text-xs sm:text-sm text-red-600">{errors.noRek.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="namaCabangBank" className="text-xs sm:text-sm">Nama Cabang Bank *</Label>
            <Input id="namaCabangBank" {...register("namaCabangBank")} className="h-9 sm:h-10 text-sm" />
            {errors.namaCabangBank && (
              <p className="text-xs sm:text-sm text-red-600">{errors.namaCabangBank.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 border-b pb-2">Gaji & Potongan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="tarif" className="text-xs sm:text-sm">Tarif per Hari (Rp) *</Label>
            <Input
              id="tarif"
              type="number"
              placeholder="Contoh: 500000"
              {...register("tarif", { valueAsNumber: true })}
              className="h-9 sm:h-10 text-sm"
            />
            {errors.tarif && (
              <p className="text-xs sm:text-sm text-red-600">{errors.tarif.message}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="pph" className="text-xs sm:text-sm">PPH (%) *</Label>
            <Input
              id="pph"
              type="number"
              step="0.01"
              placeholder="Contoh: 5 untuk PPH 5%"
              {...register("pph", { valueAsNumber: true })}
              className="h-9 sm:h-10 text-sm"
            />
            {errors.pph && (
              <p className="text-xs sm:text-sm text-red-600">{errors.pph.message}</p>
            )}
            <p className="text-xs text-gray-500">Input dalam persen. Contoh: 5 untuk PPH 5%</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="kotor" className="text-xs sm:text-sm">Gaji Kotor (Auto)</Label>
            <Input
              id="kotor"
              type="number"
              value={isNaN(kotor) ? 0 : kotor}
              disabled
              className="bg-orange-50 text-orange-700 font-semibold h-9 sm:h-10 text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Jumlah Hari × Tarif</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="potongan" className="text-xs sm:text-sm">Potongan (Auto)</Label>
            <Input
              id="potongan"
              type="number"
              value={isNaN(potongan) ? 0 : potongan}
              disabled
              className="bg-yellow-50 text-yellow-700 font-semibold h-9 sm:h-10 text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Kotor × (PPH / 100)</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2 md:col-span-2">
            <Label htmlFor="bersih" className="text-xs sm:text-sm">Gaji Bersih (Auto)</Label>
            <Input
              id="bersih"
              type="number"
              value={isNaN(bersih) ? 0 : bersih}
              disabled
              className="bg-green-50 text-green-700 font-semibold text-base sm:text-lg h-10 sm:h-11"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Kotor - Potongan</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-3 sm:pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="w-full sm:w-auto text-sm h-9 sm:h-10">
          Batal
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto text-sm h-9 sm:h-10">
          {isLoading ? "Menyimpan..." : initialData ? "Update Data" : "Simpan Data"}
        </Button>
      </div>
    </form>
  );
}
