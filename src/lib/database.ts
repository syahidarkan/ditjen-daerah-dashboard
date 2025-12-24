import type { DataGaji, CreateDataGaji, UpdateDataGaji } from "@/types";
import { generateUUID } from "./utils";
import { autoCalculate } from "./calculations";

const STORAGE_KEY = "ditjen_gaji_data";

export const initializeStorage = (): void => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export const getAllData = (): DataGaji[] => {
  try {
    initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const getDataById = (id: string): DataGaji | undefined => {
  const allData = getAllData();
  return allData.find((item) => item.id === id);
};

export const createData = (data: CreateDataGaji): DataGaji => {
  try {
    const allData = getAllData();

    const { kotor, potongan, bersih } = autoCalculate({
      jumlahHari: data.jumlahHari,
      tarif: data.tarif,
      pph: data.pph,
    });

    const newData: DataGaji = {
      ...data,
      id: generateUUID(),
      kotor,
      potongan,
      bersih,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    allData.push(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));

    return newData;
  } catch (error) {
    console.error("Error creating data:", error);
    throw new Error("Failed to create data");
  }
};

export const updateData = (id: string, updates: UpdateDataGaji): DataGaji | null => {
  try {
    const allData = getAllData();
    const index = allData.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const existingData = allData[index];

    const mergedData = {
      ...existingData,
      ...updates,
    };

    const { kotor, potongan, bersih } = autoCalculate({
      jumlahHari: mergedData.jumlahHari,
      tarif: mergedData.tarif,
      pph: mergedData.pph,
    });

    const updatedData: DataGaji = {
      ...mergedData,
      kotor,
      potongan,
      bersih,
      updatedAt: new Date().toISOString(),
    };

    allData[index] = updatedData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));

    return updatedData;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("Failed to update data");
  }
};

export const deleteData = (id: string): boolean => {
  try {
    const allData = getAllData();
    const filtered = allData.filter((item) => item.id !== id);

    if (filtered.length === allData.length) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
};

export const bulkDelete = (ids: string[]): boolean => {
  try {
    const allData = getAllData();
    const filtered = allData.filter((item) => !ids.includes(item.id));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error bulk deleting data:", error);
    throw new Error("Failed to bulk delete data");
  }
};

export const bulkCreate = (dataArray: CreateDataGaji[]): DataGaji[] => {
  try {
    const allData = getAllData();
    const now = new Date().toISOString();

    const newDataArray: DataGaji[] = dataArray.map((data) => {
      const { kotor, potongan, bersih } = autoCalculate({
        jumlahHari: data.jumlahHari,
        tarif: data.tarif,
        pph: data.pph,
      });

      return {
        ...data,
        id: generateUUID(),
        kotor,
        potongan,
        bersih,
        createdAt: now,
        updatedAt: now,
      };
    });

    const updatedData = [...allData, ...newDataArray];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

    return newDataArray;
  } catch (error) {
    console.error("Error bulk creating data:", error);
    throw new Error("Failed to bulk create data");
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error("Error clearing data:", error);
    throw new Error("Failed to clear data");
  }
};

export const getUniqueYears = (): number[] => {
  const allData = getAllData();
  const years = allData.map((item) => item.tahun);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};
