"use client";

import React, { useEffect, useState } from "react";
import { useTableContext } from "@/presentation/contexts/table/TableContext";
import { DataTable, DataTableRow } from "@/presentation/components/ui/DataTable";
import { Dialog as Modal } from "@/presentation/components/ui/Dialog";
import { FaSave } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { cropTypeRepository } from "@/core/infrastructure/repositories/cropTypeRepository";
import { planterRepository } from "@/core/infrastructure/repositories/planterRepository";
import { sprinklerGroupRepository } from "@/core/infrastructure/repositories/sprinklerGroupRepository";
import { Input } from "@/presentation/components/ui/Input";
import { cropRepository } from "@/core/infrastructure/repositories/cropRepository";
import { CreateCropRequest } from "@/core/infrastructure/api/requests/CreateCropRequest";
import Toast from "@/presentation/components/ui/Snackbar/Snackbar";
import { SnackbarType } from "@/presentation/components/ui/Snackbar/Snackbar.types";
import { MenuOption, MenuProvider } from "@/presentation/components/ui/Menu";
import Menu from "@/presentation/components/ui/Menu/Menu";
import { 
  CreateCropTypeForm, 
  CreateCropTypeProvider, 
  CreatePlanterForm, 
  CreatePlanterProvider,
  CreateSprinklerGroupForm,
  CreateSprinklerGroupProvider,
} from "@/presentation/components/features";

export default function CropFrom() {
  const { rows, addRow, deleteRow, setRows } = useTableContext();
  const [modalState, setModalState] = useState<{
    type: "cropType" | "planter" | "sprinklerGroup" | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });

  const [toast, setToast] = useState<{
    message: string;
    type: SnackbarType;
    linkText?: string;
    onLinkClick?: () => void;
  } | null>(null);

  // #region cropTypes

  const [cropTypeSelected, setCropTypeSelected] = useState<number | null>(null);
  const [cropTypeDataSource, setCropTypesDataSource] = useState<MenuOption[]>([]);

  const handleAddCropTypeRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setCropTypesDataSource((prev) => [...prev, newRecord]);
    setCropTypeSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  // #endregion

  // #region planters

  const [planterSelected, setPlanterSelected] = useState<number | null>(null);
  const [planterDataSource, setPlantersDataSource] = useState<MenuOption[]>([]);

  const handleAddPlanterRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setPlantersDataSource((prev) => [...prev, newRecord]);
    setPlanterSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  // #endregion

  // #region sprinkler groups

  const [sprinklerGroupSelected, setSprinklerGroupSelected] = useState<number | null>(null);
  const [sprinklerGroupDataSource, setSprinklerGroupsDataSource] = useState<MenuOption[]>([]);

  const hnadleAddSprinklerGroupRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setSprinklerGroupsDataSource((prev) => [...prev, newRecord]);
    setSprinklerGroupSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  // #endregion

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [crops, cropTypes, planters, sprinklerGroups] = await Promise.all([
          cropRepository.getCrops(),
          cropTypeRepository.getCropTypes(),
          planterRepository.getPlanters(),
          sprinklerGroupRepository.getGroups(),
        ]); 

        setCropTypesDataSource(cropTypes.map((val) => mapToDataSourceItem(val)));
        setPlantersDataSource(planters.map((val) => mapToDataSourceItem(val)));
        setSprinklerGroupsDataSource(sprinklerGroups.map((val) => mapToDataSourceItem(val)));

        setRows(
          crops.map((crop) => ({
            id: crop.id,
            name: crop.name,
            plantUnits: crop.plantUnits,
            cropTypeId: crop.cropTypeId,
            planterId: crop.planterId,
            sprinklerGroupId: crop.sprinklerGroupId,
          }))
        );
      } catch (error) {
        setToast({
          message: `Error cargando datos iniciales. Por favor, intentelo más tarde. ${error}`,
          type: "error",
        });
      }
    };

    fetchAllData();
  }, [setRows]);

  const mapToDataSourceItem = (data: { id: number; name: string }): MenuOption => ({
    id: data.id,
    label: data.name,
  });

  const handleModalClose = () => {
    setModalState({ type: null, isOpen: false });
  };

  const validateAndSave = async (row: any) => {
    if (!row.name || !row.plantUnits || !cropTypeSelected || !planterSelected || !sprinklerGroupSelected) {
      setToast({
        message: "Por favor, completa todos los campos antes de guardar.",
        type: "warning",
        linkText: "Revisar campos",
        onLinkClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      });
      return;
    }

    const payload = new CreateCropRequest(
      row.name,
      row.plantUnits,
      cropTypeSelected,
      planterSelected,
      sprinklerGroupSelected
    );

    try {
      const response = await cropRepository.createCrop(payload);
      setToast({
        message: `Se creado el cultivo correctamente. ${response.publicId}`,
        type: "success",
      });
      // setRows([]);
    } catch (err) {
      setToast({
        message: `Hubo un problema al guardar el cultivo.. ${err}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <DataTable columns={["Cultivo", "Unidades", "Tipo de cultivo", "Jardinera", "Grupo de Aspersores", "Acciones"]}>
        {rows.map((row) => (
          <DataTableRow
            key={row.id}
            id={row.id}
            columns={[
              <Input
                key={row.id}
                label=""
                type="text"
                name="name"
                value={row.name || ""}
                onChange={(e) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)))
                }
              />,
              <Input
                key={row.id}
                label=""
                type="number"
                name="plantUnits"
                value={row.plantUnits || 0}
                onChange={(e) =>
                  setRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, plantUnits: parseInt(e.target.value) } : r))
                  )
                }
              />,
              <MenuProvider key={row.id} onAddNew={() => setModalState({ type: "cropType", isOpen: true })}>
                <Menu
                  options={cropTypeDataSource}
                  selectedOption={row.cropTypeId || cropTypeSelected}
                  onSelect={(id) => {
                    setCropTypeSelected(Number(id));
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, cropTypeId: Number(id) } : r)));
                  }}
                />
              </MenuProvider>,
              <MenuProvider key={row.id} onAddNew={() => setModalState({ type: "planter", isOpen: true })}>
                <Menu
                  options={planterDataSource}
                  selectedOption={row.planterId || planterSelected}
                  onSelect={(id) => {
                    setPlanterSelected(Number(id));
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, planterId: Number(id) } : r)));
                  }}
                />
              </MenuProvider>,
              <MenuProvider
                key={row.id}
                onAddNew={() => setModalState({ type: "sprinklerGroup", isOpen: true })}
              >
                <Menu
                  options={sprinklerGroupDataSource}
                  selectedOption={row.sprinklerGroupId || sprinklerGroupSelected}
                  onSelect={(id) => {
                    setSprinklerGroupSelected(Number(id));
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, sprinklerGroupId: Number(id) } : r)));
                  }}
                />
              </MenuProvider>,
            ]}
          >
            <button className="text-green-500 mx-2" onClick={() => validateAndSave(row)}>
              <FaSave />
            </button>
            <button className="text-red-500 mx-2" onClick={() => deleteRow(row.id)}>
              <FaTrash />
            </button>
            <button className="text-blue-500 mx-2" onClick={addRow}>
              <FaPlus />
            </button>
          </DataTableRow>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} className="p-4 border border-gray-300 text-center">
              <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Añadir Cultivo
              </button>
            </td>
          </tr>
        )}
      </DataTable>
      <Modal
        isOpen={modalState.isOpen}
        title={
          modalState.type === "cropType"
            ? "Añadir Tipo de Cultivo"
            : modalState.type === "planter"
            ? "Añadir Jardinera"
            : "Añadir Grupo de Aspersores"
        }
        onClose={handleModalClose}
      >
        {modalState.type === "cropType" && (
          <CreateCropTypeProvider onCancel={handleModalClose} onComplete={handleAddCropTypeRecord}>
            <CreateCropTypeForm />
          </CreateCropTypeProvider>
        )}
        {modalState.type === "planter" && (
          <CreatePlanterProvider onCancel={handleModalClose} onComplete={handleAddPlanterRecord}>
            <CreatePlanterForm />
          </CreatePlanterProvider>
        )}
        {modalState.type === "sprinklerGroup" && (
          <CreateSprinklerGroupProvider onCancel={handleModalClose} onComplete={hnadleAddSprinklerGroupRecord}>
            <CreateSprinklerGroupForm />
          </CreateSprinklerGroupProvider>
        )}
      </Modal>
      {toast && (
        <Toast message={toast.message} type={toast.type} linkText={toast.linkText} onLinkClick={toast.onLinkClick} />
      )}
    </div>
  );
}
