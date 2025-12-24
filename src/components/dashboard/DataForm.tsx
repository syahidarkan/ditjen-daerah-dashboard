
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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kodeSatker">Kode Satker *</Label>
            <Input id="kodeSatker" {...register("kodeSatker")} />
            {errors.kodeSatker && (
              <p className="text-sm text-red-600">{errors.kodeSatker.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="noGaji">No. Gaji *</Label>
            <Input id="noGaji" {...register("noGaji")} />
            {errors.noGaji && (
              <p className="text-sm text-red-600">{errors.noGaji.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bulan">Bulan *</Label>
            <Controller
              name="bulan"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {BULAN_OPTIONS.map((bulan) => (
                      <SelectItem key={bulan} value={bulan}>
                        {bulan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.bulan && (
              <p className="text-sm text-red-600">{errors.bulan.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tahun">Tahun *</Label>
            <Input
              id="tahun"
              type="number"
              {...register("tahun", { valueAsNumber: true })}
            />
            {errors.tahun && (
              <p className="text-sm text-red-600">{errors.tahun.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggal">Tanggal *</Label>
            <Input id="tanggal" type="date" {...register("tanggal")} />
            {errors.tanggal && (
              <p className="text-sm text-red-600">{errors.tanggal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jumlahHari">Jumlah Hari *</Label>
            <Input
              id="jumlahHari"
              type="number"
              {...register("jumlahHari", { valueAsNumber: true })}
            />
            {errors.jumlahHari && (
              <p className="text-sm text-red-600">{errors.jumlahHari.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">Data Pegawai</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nip">NIP (18 digit) *</Label>
            <Input id="nip" maxLength={18} {...register("nip")} />
            {errors.nip && (
              <p className="text-sm text-red-600">{errors.nip.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="namaPegawai">Nama Pegawai *</Label>
            <Input id="namaPegawai" {...register("namaPegawai")} />
            {errors.namaPegawai && (
              <p className="text-sm text-red-600">{errors.namaPegawai.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="kodeGol">Kode Golongan *</Label>
            <Input id="kodeGol" {...register("kodeGol")} />
            {errors.kodeGol && (
              <p className="text-sm text-red-600">{errors.kodeGol.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="golongan">Golongan *</Label>
            <Controller
              name="golongan"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Golongan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PNS">PNS</SelectItem>
                    <SelectItem value="Non-PNS">Non-PNS</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.golongan && (
              <p className="text-sm text-red-600">{errors.golongan.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="npwp">NPWP (15 digit) *</Label>
            <Input id="npwp" maxLength={15} {...register("npwp")} />
            {errors.npwp && (
              <p className="text-sm text-red-600">{errors.npwp.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">Data Bank</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kodeBankSpan">Kode Bank SPAN *</Label>
            <Input id="kodeBankSpan" {...register("kodeBankSpan")} />
            {errors.kodeBankSpan && (
              <p className="text-sm text-red-600">{errors.kodeBankSpan.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="namaBankSpan">Nama Bank SPAN *</Label>
            <Input id="namaBankSpan" {...register("namaBankSpan")} />
            {errors.namaBankSpan && (
              <p className="text-sm text-red-600">{errors.namaBankSpan.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="noRek">No. Rekening *</Label>
            <Input id="noRek" {...register("noRek")} />
            {errors.noRek && (
              <p className="text-sm text-red-600">{errors.noRek.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="namaCabangBank">Nama Cabang Bank *</Label>
            <Input id="namaCabangBank" {...register("namaCabangBank")} />
            {errors.namaCabangBank && (
              <p className="text-sm text-red-600">{errors.namaCabangBank.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 border-b pb-2">Gaji & Potongan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tarif">Tarif per Hari (Rp) *</Label>
            <Input
              id="tarif"
              type="number"
              placeholder="Contoh: 500000"
              {...register("tarif", { valueAsNumber: true })}
            />
            {errors.tarif && (
              <p className="text-sm text-red-600">{errors.tarif.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pph">PPH (%) *</Label>
            <Input
              id="pph"
              type="number"
              step="0.01"
              placeholder="Contoh: 5 untuk PPH 5%"
              {...register("pph", { valueAsNumber: true })}
            />
            {errors.pph && (
              <p className="text-sm text-red-600">{errors.pph.message}</p>
            )}
            <p className="text-xs text-gray-500">Input dalam persen. Contoh: 5 untuk PPH 5%</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kotor">Gaji Kotor (Auto)</Label>
            <Input
              id="kotor"
              type="number"
              value={isNaN(kotor) ? 0 : kotor}
              disabled
              className="bg-orange-50 text-orange-700 font-semibold"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Jumlah Hari × Tarif</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="potongan">Potongan (Auto)</Label>
            <Input
              id="potongan"
              type="number"
              value={isNaN(potongan) ? 0 : potongan}
              disabled
              className="bg-yellow-50 text-yellow-700 font-semibold"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Kotor × (PPH / 100)</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bersih">Gaji Bersih (Auto)</Label>
            <Input
              id="bersih"
              type="number"
              value={isNaN(bersih) ? 0 : bersih}
              disabled
              className="bg-green-50 text-green-700 font-semibold text-lg"
            />
            <p className="text-xs text-gray-500">Dihitung otomatis: Kotor - Potongan</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Batal
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : initialData ? "Update Data" : "Simpan Data"}
        </Button>
      </div>
    </form>
  );
}
