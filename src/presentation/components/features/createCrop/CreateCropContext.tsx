import React, { createContext, useState, useEffect } from "react";
import { CreateCropContextProps } from "./CreateCropContextProps";
import { CreateCropRequest, createCropUseCase } from "@/core/application/features/createCrop";
import { RemoveCropRequest } from "@/core/application/features/removeCrop/RemoveCropRequest";
import { removeCropUseCase } from "@/core/application/features/removeCrop/RemoveCropUseCase";
import { getCropsUseCase } from "@/core/application/features/getCrops";
import { getCropTypesUseCase } from "@/core/application/features/getCropTypes";
import { getPlantersUseCase } from "@/core/application/features/getPlanters";
import { getSprinklerGroupsUseCase } from "@/core/application/features/getSprinklerGroups";
import { useTableContext } from "@/presentation/contexts/table/TableContext";
import { Notification } from "@/core/domain/shared/Notification";
import { MenuOption } from "@/presentation/components/ui/Menu";

export const CreateCropContext = createContext<CreateCropContextProps | null>(null);

export const CreateCropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { rows, addRow, deleteRow: deleteTableRow, setRows } = useTableContext();
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
        getCropsUseCase.execute(),
        getCropTypesUseCase.execute(),
        getPlantersUseCase.execute(),
        getSprinklerGroupsUseCase.execute(),
      ]);

      setCropTypeDataSource(cropTypes.map(mapToDataSourceItem));
      setPlanterDataSource(planters.map(mapToDataSourceItem));
      setSprinklerGroupDataSource(sprinklerGroups.map(mapToDataSourceItem));

      setRows(
        crops.map(crop => ({
          id: crop.id,
          publicId: crop.publicId,
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
      const response = await createCropUseCase.execute(
        new CreateCropRequest(
          row.name,
          row.plantUnits,
          cropTypeSelected,
          planterSelected,
          sprinklerGroupSelected
        ));

      setToast({ message: `Cultivo creado correctamente. ID: ${response.publicId}`, type: "success" });
      setRows(prev => prev.map(r => r.id === row.id ? { ...r, id: response.id, publicId: response.publicId } : r));
    } catch (error) {
      setToast({ message: `Error al guardar el cultivo: ${error}`, type: "error" });
    }
  };

  const handleDeleteRow = async (id: number) => {
    try {
      if (id > 0) {
        const crop = rows.find(row => row.id === id);

        console.log("Current crop", crop);  
        
        if (crop && crop.publicId) {
          await removeCropUseCase.execute(new RemoveCropRequest(crop.publicId));
          setToast({ message: "Cultivo eliminado correctamente", type: "success" });
        }
      }
      deleteTableRow(id);
    } catch (error) {
      setToast({ message: `Error al eliminar el cultivo: ${error}`, type: "error" });
    }
  };

  return (
    <CreateCropContext.Provider
      value={{
        rows,
        addRow,
        deleteRow: handleDeleteRow,
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