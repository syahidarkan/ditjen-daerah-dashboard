import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RotateCcw, Calendar as CalendarIcon } from "lucide-react";
import { BULAN_OPTIONS } from "@/types";
import type { FilterState } from "@/types";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableYears: number[];
}

export function FilterBar({ filters, onFiltersChange, availableYears }: FilterBarProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = BULAN_OPTIONS[new Date().getMonth()];

  const handleQuickFilter = (type: "bulan_ini" | "tahun_ini" | "reset") => {
    if (type === "bulan_ini") {
      onFiltersChange({
        ...filters,
        bulan: currentMonth,
        tahun: currentYear,
      });
    } else if (type === "tahun_ini") {
      onFiltersChange({
        ...filters,
        bulan: null,
        tahun: currentYear,
      });
    } else {
      onFiltersChange({
        tahun: null,
        bulan: null,
        dateRange: { from: null, to: null },
        golongan: "ALL",
        searchQuery: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700">Filter Data</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickFilter("reset")}
          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Tahun Filter */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm">Tahun</Label>
          <Select
            value={filters.tahun?.toString() || "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                tahun: value === "all" ? null : parseInt(value),
              })
            }
          >
            <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
              <SelectValue placeholder="Semua Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs sm:text-sm">Semua Tahun</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()} className="text-xs sm:text-sm">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bulan Filter */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm">Bulan</Label>
          <Select
            value={filters.bulan || "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                bulan: value === "all" ? null : value,
              })
            }
          >
            <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
              <SelectValue placeholder="Semua Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs sm:text-sm">Semua Bulan</SelectItem>
              {BULAN_OPTIONS.map((bulan) => (
                <SelectItem key={bulan} value={bulan} className="text-xs sm:text-sm">
                  {bulan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm">Tanggal Dari</Label>
          <Input
            type="date"
            value={filters.dateRange.from || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, from: e.target.value || null },
              })
            }
            className="h-9 sm:h-10 text-xs sm:text-sm"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm">Tanggal Sampai</Label>
          <Input
            type="date"
            value={filters.dateRange.to || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, to: e.target.value || null },
              })
            }
            className="h-9 sm:h-10 text-xs sm:text-sm"
          />
        </div>

        {/* Golongan Filter */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-sm">Golongan</Label>
          <Select
            value={filters.golongan}
            onValueChange={(value: "ALL" | "PNS" | "Non-PNS") =>
              onFiltersChange({
                ...filters,
                golongan: value,
              })
            }
          >
            <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL" className="text-xs sm:text-sm">Semua</SelectItem>
              <SelectItem value="PNS" className="text-xs sm:text-sm">PNS</SelectItem>
              <SelectItem value="Non-PNS" className="text-xs sm:text-sm">Non-PNS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickFilter("bulan_ini")}
          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Bulan Ini
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickFilter("tahun_ini")}
          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
        >
          Tahun Ini
        </Button>
      </div>

      {/* Filter Info */}
      {(filters.tahun || filters.bulan || filters.golongan !== "ALL" || filters.dateRange.from) && (
        <div className="text-xs sm:text-sm text-gray-600 pt-2 border-t">
          <span className="font-medium">Filter aktif: </span>
          <span className="inline-flex flex-wrap gap-1">
            {filters.tahun && <span className="mr-2">Tahun: {filters.tahun}</span>}
            {filters.bulan && <span className="mr-2">Bulan: {filters.bulan}</span>}
            {filters.golongan !== "ALL" && <span className="mr-2">Golongan: {filters.golongan}</span>}
            {filters.dateRange.from && <span className="mr-2">Dari: {filters.dateRange.from}</span>}
            {filters.dateRange.to && <span>Sampai: {filters.dateRange.to}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
