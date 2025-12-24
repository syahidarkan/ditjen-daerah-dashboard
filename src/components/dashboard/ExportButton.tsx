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
        <Button disabled={isExporting} className="w-full sm:w-auto text-sm h-9 sm:h-10" size="sm">
          <Download className="h-4 w-4 mr-2" />
          <span className="sm:inline">{isExporting ? "Mengexport..." : "Export Excel"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 sm:w-56">
        <DropdownMenuLabel className="text-xs sm:text-sm">Pilih Data yang Diexport</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("all")} className="text-xs sm:text-sm">
          <FileSpreadsheet className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <div className="flex flex-col">
            <span>Export Semua Data</span>
            <span className="text-xs text-gray-500">{allData.length} data</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("filtered")} className="text-xs sm:text-sm">
          <FileSpreadsheet className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <div className="flex flex-col">
            <span>Export Data Terfilter</span>
            <span className="text-xs text-gray-500">
              {filteredData.length} data
            </span>
          </div>
        </DropdownMenuItem>
        {selectedData.length > 0 && (
          <DropdownMenuItem onClick={() => handleExport("selected")} className="text-xs sm:text-sm">
            <FileSpreadsheet className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
