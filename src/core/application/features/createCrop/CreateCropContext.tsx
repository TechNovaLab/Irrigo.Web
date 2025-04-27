import React, { createContext, useState, useEffect } from "react";
import { CreateCropContextProps } from "./CreateCropContextProps";
import { useTableContext } from "@/presentation/contexts/table/TableContext";
import { cropRepository } from "@/core/infrastructure/repositories/cropRepository";
import { cropTypeRepository } from "@/core/infrastructure/repositories/cropTypeRepository";
import { planterRepository } from "@/core/infrastructure/repositories/planterRepository";
import { sprinklerGroupRepository } from "@/core/infrastructure/repositories/sprinklerGroupRepository";
import { CreateCropRequest } from "@/core/infrastructure/api/requests/CreateCropRequest";
import { Notification } from "@/core/domain/shared/Notification";
import { MenuOption } from "@/presentation/components/ui/Menu";

export const CreateCropContext = createContext<CreateCropContextProps | null>(null);

export const CreateCropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { rows, addRow, deleteRow, setRows } = useTableContext();
  const [modalState, setModalState] = useState<{ type: "cropType" | "planter" | "sprinklerGroup" | null; isOpen: boolean }>({ type: null, isOpen: false });
  const [toast, setToast] = useState<Notification | null>(null);

  const [cropTypeSelected, setCropTypeSelected] = useState<number | null>(null);
  const [planterSelected, setPlanterSelected] = useState<number | null>(null);
  const [sprinklerGroupSelected, setSprinklerGroupSelected] = useState<number | null>(null);

  const [cropTypeDataSource, setCropTypeDataSource] = useState<MenuOption[]>([]);
  const [planterDataSource, setPlanterDataSource] = useState<MenuOption[]>([]);
  const [sprinklerGroupDataSource, setSprinklerGroupDataSource] = useState<MenuOption[]>([]);

  const mapToDataSourceItem = (data: { id: number; name: string }): MenuOption => ({ id: data.id, label: data.name });

  const fetchAllData = async () => {
    try {
      const [crops, cropTypes, planters, sprinklerGroups] = await Promise.all([
        cropRepository.getCrops(),
        cropTypeRepository.getCropTypes(),
        planterRepository.getPlanters(),
        sprinklerGroupRepository.getGroups(),
      ]);

      setCropTypeDataSource(cropTypes.map(mapToDataSourceItem));
      setPlanterDataSource(planters.map(mapToDataSourceItem));
      setSprinklerGroupDataSource(sprinklerGroups.map(mapToDataSourceItem));

      setRows(
        crops.map(crop => ({
          id: crop.id,
          name: crop.name,
          plantUnits: crop.plantUnits,
          cropTypeId: crop.cropTypeId,
          planterId: crop.planterId,
          sprinklerGroupId: crop.sprinklerGroupId,
        }))
      );
    } catch (error) {
      setToast({ message: `Error cargando datos iniciales: ${error}`, type: "error" });
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [setRows]);

  const handleAddCropTypeRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setCropTypeDataSource((prev: MenuOption[]) => [...prev, newRecord]);
    setCropTypeSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  const handleAddPlanterRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setPlanterDataSource((prev: MenuOption[]) => [...prev, newRecord]);
    setPlanterSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  const handleAddSprinklerGroupRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setSprinklerGroupDataSource((prev: MenuOption[]) => [...prev, newRecord]);
    setSprinklerGroupSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  const handleModalClose = () => setModalState({ type: null, isOpen: false });
  const openModal = (type: "cropType" | "planter" | "sprinklerGroup") => setModalState({ type, isOpen: true });

  const validateAndSave = async (row: any) => {
    if (!row.name || !row.plantUnits || !cropTypeSelected || !planterSelected || !sprinklerGroupSelected) {
      setToast({ message: "Por favor, completa todos los campos antes de guardar.", type: "error" });
      return;
    }
    try {
      const payload = new CreateCropRequest(
        row.name,
        row.plantUnits,
        cropTypeSelected,
        planterSelected,
        sprinklerGroupSelected
      );
      const response = await cropRepository.createCrop(payload);
      setToast({ message: `Cultivo creado correctamente. ID: ${response.publicId}`, type: "success" });
      setRows(prev => prev.map(r => r.id === row.id ? { ...r, id: response.id } : r));
    } catch (error) {
      setToast({ message: `Error al guardar el cultivo: ${error}`, type: "error" });
    }
  };

  return (
    <CreateCropContext.Provider
      value={{
        rows,
        addRow,
        deleteRow,
        setRows,
        setCropTypeSelected,
        setPlanterSelected,
        setSprinklerGroupSelected,
        cropTypeDataSource,
        planterDataSource,
        sprinklerGroupDataSource,
        cropTypeSelected,
        planterSelected,
        sprinklerGroupSelected,
        handleAddCropTypeRecord,
        handleAddPlanterRecord,
        handleAddSprinklerGroupRecord,
        openModal,
        modalState,
        handleModalClose,
        validateAndSave,
        toast,
      }}>
      {children}
    </CreateCropContext.Provider>
  );
}; 