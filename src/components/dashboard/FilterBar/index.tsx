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
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">Filter Data</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuickFilter("reset")}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Tahun Filter */}
        <div className="space-y-2">
          <Label>Tahun</Label>
          <Select
            value={filters.tahun?.toString() || "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                tahun: value === "all" ? null : parseInt(value),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tahun</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bulan Filter */}
        <div className="space-y-2">
          <Label>Bulan</Label>
          <Select
            value={filters.bulan || "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                bulan: value === "all" ? null : value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Bulan</SelectItem>
              {BULAN_OPTIONS.map((bulan) => (
                <SelectItem key={bulan} value={bulan}>
                  {bulan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>Tanggal Dari</Label>
          <Input
            type="date"
            value={filters.dateRange.from || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, from: e.target.value || null },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Tanggal Sampai</Label>
          <Input
            type="date"
            value={filters.dateRange.to || ""}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                dateRange: { ...filters.dateRange, to: e.target.value || null },
              })
            }
          />
        </div>

        {/* Golongan Filter */}
        <div className="space-y-2">
          <Label>Golongan</Label>
          <Select
            value={filters.golongan}
            onValueChange={(value: "ALL" | "PNS" | "Non-PNS") =>
              onFiltersChange({
                ...filters,
                golongan: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua</SelectItem>
              <SelectItem value="PNS">PNS</SelectItem>
              <SelectItem value="Non-PNS">Non-PNS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 pt-2 border-t">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickFilter("bulan_ini")}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Bulan Ini
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickFilter("tahun_ini")}
        >
          Tahun Ini
        </Button>
      </div>

      {/* Filter Info */}
      {(filters.tahun || filters.bulan || filters.golongan !== "ALL" || filters.dateRange.from) && (
        <div className="text-sm text-gray-600 pt-2 border-t">
          <span className="font-medium">Filter aktif: </span>
          {filters.tahun && <span className="mr-2">Tahun: {filters.tahun}</span>}
          {filters.bulan && <span className="mr-2">Bulan: {filters.bulan}</span>}
          {filters.golongan !== "ALL" && <span className="mr-2">Golongan: {filters.golongan}</span>}
          {filters.dateRange.from && <span className="mr-2">Dari: {filters.dateRange.from}</span>}
          {filters.dateRange.to && <span>Sampai: {filters.dateRange.to}</span>}
        </div>
      )}
    </div>
  );
}
