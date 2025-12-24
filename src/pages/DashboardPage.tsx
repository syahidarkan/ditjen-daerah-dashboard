import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DataTable } from "@/components/dashboard/DataTable";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AddDataDialog } from "@/components/dashboard/AddDataDialog";
import { EditDataDialog } from "@/components/dashboard/EditDataDialog";
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog";
import { ImportExcelDialog } from "@/components/dashboard/ImportExcelDialog";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { createColumns } from "@/components/dashboard/TableColumns";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useDataGaji } from "@/hooks/useDataGaji";
import { useFilters } from "@/hooks/useFilters";
import { calculateStats } from "@/lib/calculations";
import { getUniqueYears } from "@/lib/database";
import type { DataGaji, CreateDataGaji } from "@/types";
import { toast } from "sonner";

export function DashboardPage() {
  const { data: allData, loading, addData, editData, removeData, removeBulk, refreshData } = useDataGaji();
  const { filters, filteredData, setFilters } = useFilters(allData);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<DataGaji | null>(null);
  const [selectedRows] = useState<DataGaji[]>([]);

  const stats = useMemo(() => {
    return calculateStats(filteredData);
  }, [filteredData]);

  const availableYears = useMemo(() => {
    return getUniqueYears();
  }, [allData]);

  const columns = useMemo(
    () =>
      createColumns({
        onEdit: (data) => {
          setSelectedData(data);
          setEditDialogOpen(true);
        },
        onDelete: (data) => {
          setSelectedData(data);
          setDeleteDialogOpen(true);
        },
      }),
    []
  );

  const handleAddData = async (data: CreateDataGaji) => {
    try {
      await addData(data);
      toast.success("Data berhasil ditambahkan!");
      setAddDialogOpen(false);
    } catch (error: any) {
      toast.error(`Gagal menambah data: ${error.message}`);
    }
  };

  const handleEditData = async (id: string, data: CreateDataGaji) => {
    try {
      await editData(id, data);
      toast.success("Data berhasil diupdate!");
      setEditDialogOpen(false);
    } catch (error: any) {
      toast.error(`Gagal update data: ${error.message}`);
    }
  };

  const handleDeleteData = async (id: string) => {
    try {
      await removeData(id);
      toast.success("Data berhasil dihapus!");
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(`Gagal menghapus data: ${error.message}`);
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    try {
      await removeBulk(ids);
      toast.success(`${ids.length} data berhasil dihapus!`);
    } catch (error: any) {
      toast.error(`Gagal menghapus data: ${error.message}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Gaji</h1>
            <p className="text-gray-600 mt-1">
              Kelola data gaji pegawai DITJEN Pembangunan Daerah
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setImportDialogOpen(true)} variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Excel
            </Button>
            <ExportButton
              allData={allData}
              filteredData={filteredData}
              selectedData={selectedRows}
              filters={filters}
            />
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} isLoading={loading} />

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          availableYears={availableYears}
        />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          onBulkDelete={handleBulkDelete}
        />

        {/* Dialogs */}
        <AddDataDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSubmit={handleAddData}
        />

        <EditDataDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          data={selectedData}
          onSubmit={handleEditData}
        />

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          data={selectedData}
          onConfirm={handleDeleteData}
        />

        <ImportExcelDialog
          open={importDialogOpen}
          onOpenChange={setImportDialogOpen}
          onSuccess={() => {
            refreshData();
            toast.success("Data berhasil diimport!");
          }}
        />
      </div>
    </DashboardLayout>
  );
}
