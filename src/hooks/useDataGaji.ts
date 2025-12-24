import { useState, useEffect, useCallback } from "react";
import type { DataGaji, CreateDataGaji, UpdateDataGaji } from "@/types";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
  bulkDelete as dbBulkDelete,
  bulkCreate as dbBulkCreate,
} from "@/lib/database";

export const useDataGaji = () => {
  const [data, setData] = useState<DataGaji[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const allData = getAllData();
      setData(allData);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addData = async (newData: CreateDataGaji): Promise<DataGaji | null> => {
    try {
      const created = createData(newData);
      loadData();
      return created;
    } catch (err: any) {
      setError(err.message || "Failed to add data");
      console.error("Error adding data:", err);
      return null;
    }
  };

  const editData = async (
    id: string,
    updates: UpdateDataGaji
  ): Promise<DataGaji | null> => {
    try {
      const updated = updateData(id, updates);
      loadData();
      return updated;
    } catch (err: any) {
      setError(err.message || "Failed to update data");
      console.error("Error updating data:", err);
      return null;
    }
  };

  const removeData = async (id: string): Promise<boolean> => {
    try {
      const success = deleteData(id);
      if (success) {
        loadData();
      }
      return success;
    } catch (err: any) {
      setError(err.message || "Failed to delete data");
      console.error("Error deleting data:", err);
      return false;
    }
  };

  const removeBulk = async (ids: string[]): Promise<boolean> => {
    try {
      const success = dbBulkDelete(ids);
      if (success) {
        loadData();
      }
      return success;
    } catch (err: any) {
      setError(err.message || "Failed to bulk delete data");
      console.error("Error bulk deleting data:", err);
      return false;
    }
  };

  const bulkAdd = async (dataArray: CreateDataGaji[]): Promise<DataGaji[] | null> => {
    try {
      const created = dbBulkCreate(dataArray);
      loadData();
      return created;
    } catch (err: any) {
      setError(err.message || "Failed to bulk add data");
      console.error("Error bulk adding data:", err);
      return null;
    }
  };

  return {
    data,
    loading,
    error,
    addData,
    editData,
    removeData,
    removeBulk,
    bulkAdd,
    refreshData: loadData,
  };
};
