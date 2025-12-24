import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet } from "lucide-react";
import { exportToExcel, generateExportFilename } from "@/lib/excel";
import type { DataGaji, FilterState } from "@/types";

interface ExportButtonProps {
  allData: DataGaji[];
  filteredData: DataGaji[];
  selectedData: DataGaji[];
  filters: FilterState;
}

export function ExportButton({
  allData,
  filteredData,
  selectedData,
  filters,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type: "all" | "filtered" | "selected") => {
    setIsExporting(true);

    try {
      let dataToExport: DataGaji[] = [];
      let filename = "";

      switch (type) {
        case "all":
          dataToExport = allData;
          filename = generateExportFilename();
          break;
        case "filtered":
          dataToExport = filteredData;
          filename = generateExportFilename(
            filters.tahun,
            filters.bulan,
            filters.golongan !== "ALL" ? filters.golongan : null
          );
          break;
        case "selected":
          dataToExport = selectedData;
          filename = `Gaji_Selected_${new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "")}.xlsx`;
          break;
      }

      if (dataToExport.length === 0) {
        alert("Tidak ada data untuk diexport");
        return;
      }

      exportToExcel(dataToExport, filename);
    } catch (error: any) {
      alert(`Gagal export data: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Mengexport..." : "Export Excel"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Pilih Data yang Diexport</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("all")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Export Semua Data</span>
            <span className="text-xs text-gray-500">{allData.length} data</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("filtered")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span>Export Data Terfilter</span>
            <span className="text-xs text-gray-500">
              {filteredData.length} data
            </span>
          </div>
        </DropdownMenuItem>
        {selectedData.length > 0 && (
          <DropdownMenuItem onClick={() => handleExport("selected")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span>Export Data Terpilih</span>
              <span className="text-xs text-gray-500">
                {selectedData.length} data
              </span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
