import { useState, useMemo } from "react";
import type { DataGaji, FilterState } from "@/types";
import { getCurrentYear, getCurrentMonth } from "@/lib/utils";
import { format, isWithinInterval, parseISO } from "date-fns";

const initialFilterState: FilterState = {
  tahun: null,
  bulan: null,
  dateRange: {
    from: null,
    to: null,
  },
  golongan: "ALL",
  searchQuery: "",
};

export const useFilters = (data: DataGaji[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (filters.tahun && item.tahun !== filters.tahun) {
        return false;
      }

      if (filters.bulan && item.bulan !== filters.bulan) {
        return false;
      }

      if (filters.dateRange.from && filters.dateRange.to) {
        try {
          const itemDate = parseISO(item.tanggal);
          const fromDate = parseISO(filters.dateRange.from);
          const toDate = parseISO(filters.dateRange.to);

          if (!isWithinInterval(itemDate, { start: fromDate, end: toDate })) {
            return false;
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }

      if (filters.golongan !== "ALL" && item.golongan !== filters.golongan) {
        return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableFields = [
          item.kodeSatker,
          item.nip,
          item.namaPegawai,
          item.noGaji,
          item.npwp,
          item.namaBankSpan,
          item.noRek,
        ];

        const match = searchableFields.some((field) =>
          String(field).toLowerCase().includes(query)
        );

        if (!match) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const setTahunFilter = (tahun: number | null) => {
    setFilters((prev) => ({ ...prev, tahun }));
  };

  const setBulanFilter = (bulan: string | null) => {
    setFilters((prev) => ({ ...prev, bulan }));
  };

  const setDateRangeFilter = (from: string | null, to: string | null) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { from, to },
    }));
  };

  const setGolonganFilter = (golongan: "ALL" | "PNS" | "Non-PNS") => {
    setFilters((prev) => ({ ...prev, golongan }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const applyBulanIni = () => {
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();
    setFilters((prev) => ({
      ...prev,
      tahun: currentYear,
      bulan: currentMonth,
      dateRange: { from: null, to: null },
    }));
  };

  const applyTahunIni = () => {
    const currentYear = getCurrentYear();
    setFilters((prev) => ({
      ...prev,
      tahun: currentYear,
      bulan: null,
      dateRange: { from: null, to: null },
    }));
  };

  const apply3BulanTerakhir = () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    setFilters((prev) => ({
      ...prev,
      tahun: null,
      bulan: null,
      dateRange: {
        from: format(threeMonthsAgo, "yyyy-MM-dd"),
        to: format(today, "yyyy-MM-dd"),
      },
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.tahun !== null ||
      filters.bulan !== null ||
      filters.dateRange.from !== null ||
      filters.dateRange.to !== null ||
      filters.golongan !== "ALL" ||
      filters.searchQuery !== ""
    );
  }, [filters]);

  return {
    filters,
    filteredData,
    setFilters,
    setTahunFilter,
    setBulanFilter,
    setDateRangeFilter,
    setGolonganFilter,
    setSearchQuery,
    applyBulanIni,
    applyTahunIni,
    apply3BulanTerakhir,
    resetFilters,
    hasActiveFilters,
  };
};
