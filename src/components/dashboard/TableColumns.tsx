import type { ColumnDef } from "@tanstack/react-table";
import type { DataGaji } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface TableColumnsProps {
  onEdit: (data: DataGaji) => void;
  onDelete: (data: DataGaji) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: TableColumnsProps): ColumnDef<DataGaji>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nip",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NIP
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "namaPegawai",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama Pegawai
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "golongan",
    header: "Golongan",
    cell: ({ row }) => {
      const golongan = row.getValue("golongan") as string;
      return (
        <Badge variant={golongan === "PNS" ? "default" : "secondary"}>
          {golongan}
        </Badge>
      );
    },
  },
  {
    accessorKey: "bulan",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bulan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tahun
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = row.getValue("tanggal") as string;
      return <span className="text-sm">{formatDate(date)}</span>;
    },
  },
  {
    accessorKey: "tarif",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tarif
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const tarif = row.getValue("tarif") as number;
      return <span className="font-medium">{formatCurrency(tarif)}</span>;
    },
  },
  {
    accessorKey: "pph",
    header: "PPH",
    cell: ({ row }) => {
      const pph = row.getValue("pph") as number;
      return <span>{formatCurrency(pph)}</span>;
    },
  },
  {
    accessorKey: "kotor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kotor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const kotor = row.getValue("kotor") as number;
      return (
        <span className="font-semibold text-orange-600">
          {formatCurrency(kotor)}
        </span>
      );
    },
  },
  {
    accessorKey: "potongan",
    header: "Potongan",
    cell: ({ row }) => {
      const potongan = row.getValue("potongan") as number;
      return <span className="text-red-600">{formatCurrency(potongan)}</span>;
    },
  },
  {
    accessorKey: "bersih",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bersih
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const bersih = row.getValue("bersih") as number;
      return (
        <span className="font-semibold text-green-600">
          {formatCurrency(bersih)}
        </span>
      );
    },
  },
  {
    accessorKey: "kodeSatker",
    header: "Kode Satker",
  },
  {
    accessorKey: "noGaji",
    header: "No. Gaji",
  },
  {
    accessorKey: "npwp",
    header: "NPWP",
  },
  {
    accessorKey: "namaBankSpan",
    header: "Bank",
  },
  {
    accessorKey: "noRek",
    header: "No. Rekening",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(data)}
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(data)}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
