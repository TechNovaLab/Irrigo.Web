"use client";

import React, { useEffect, useState } from "react";
import { useTableContext } from "@/contexts/table/TableContext";
import { Table, TableRow } from "@/components/Table";
import { Modal } from "@/components/Modal";
import { FaSave } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import {
  CreateCropType,
  CreateCropTypeProvider,
  CreatePlanter,
  CreatePlanterProvider,
  CreateSprinklerGroup,
  CreateSprinklerGroupProvider,
} from "@/features/createCrop";
import { ContextMenu, ContextMenuProvider } from "@/components/ContextMenu";
import { DataSourceItem } from "@/components/ContextMenu/types/DataSourceItem";
import { cropTypeRepository } from "@/domain/repositories/cropTypeRepository";
import { planterRepository } from "@/domain/repositories/planterRepository";
import { sprinklerGroupRepository } from "@/domain/repositories/sprinklerGroupRepository";
import { Input } from "@/components/Input";
import { cropRepository } from "@/domain/repositories/cropRepository";
import { CreateCropRequest } from "@/domain/api/requests/CreateCropRequest";
import Toast from "@/components/Toast/Toast";

export default function CropFrom() {
  const { rows, addRow, deleteRow, setRows } = useTableContext();
  const [modalState, setModalState] = useState<{
    type: "cropType" | "planter" | "sprinklerGroup" | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });

  const [toast, setToast] = useState<{
    message: string;
    type: string;
    linkText?: string;
    onLinkClick?: () => void;
  } | null>(null);

  // #region cropTypes

  const [cropTypeSelected, setCropTypeSelected] = useState<number | null>(null);
  const [cropTypeDataSource, setCropTypesDataSource] = useState<DataSourceItem[]>([]);

  const handleAddCropTypeRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setCropTypesDataSource((prev) => [...prev, newRecord]);
    setCropTypeSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  // #endregion

  // #region planters

  const [planterSelected, setPlanterSelected] = useState<number | null>(null);
  const [planterDataSource, setPlantersDataSource] = useState<DataSourceItem[]>([]);

  const handleAddPlanterRecord = (data: { id: number; name: string }) => {
    const newRecord = mapToDataSourceItem(data);
    setPlantersDataSource((prev) => [...prev, newRecord]);
    setPlanterSelected(newRecord.id);
    setModalState({ type: null, isOpen: false });
  };

  // #endregion

  // #region sprinkler groups

  const [sprinklerGroupSelected, setSprinklerGroupSelected] = useState<number | null>(null);
  const [sprinklerGroupDataSource, setSprinklerGroupsDataSource] = useState<DataSourceItem[]>([]);

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

  const mapToDataSourceItem = (data: { id: number; name: string }): DataSourceItem => ({
    id: data.id,
    label: data.name,
  });

  const handleModalClose = () => {
    setModalState({ type: null, isOpen: false });
  };

  const validateAndSave = async (row: any) => {
    // const row = rows[0];
    console.log("current row", row);
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
      <Table columns={["Cultivo", "Unidades", "Tipo de cultivo", "Jardinera", "Grupo de Aspersores", "Acciones"]}>
        {rows.map((row) => (
          <TableRow
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
              <ContextMenuProvider key={row.id} onAddNew={() => setModalState({ type: "cropType", isOpen: true })}>
                <ContextMenu
                  options={cropTypeDataSource}
                  selectedOption={row.cropTypeId || cropTypeSelected}
                  onSelect={(id) => {
                    console.log("selected crop type", id);
                    setCropTypeSelected(id);
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, cropTypeId: id } : r)));
                  }}
                />
              </ContextMenuProvider>,
              <ContextMenuProvider key={row.id} onAddNew={() => setModalState({ type: "planter", isOpen: true })}>
                <ContextMenu
                  options={planterDataSource}
                  selectedOption={row.planterId || planterSelected}
                  onSelect={(id) => {
                    console.log("selected planter", id);
                    setPlanterSelected(id);
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, planterId: id } : r)));
                  }}
                />
              </ContextMenuProvider>,
              <ContextMenuProvider
                key={row.id}
                onAddNew={() => setModalState({ type: "sprinklerGroup", isOpen: true })}
              >
                <ContextMenu
                  options={sprinklerGroupDataSource}
                  selectedOption={row.sprinklerGroupId || sprinklerGroupSelected}
                  onSelect={(id) => {
                    console.log("selected sprinkler group", id);
                    setSprinklerGroupSelected(id);
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, sprinklerGroupId: id } : r)));
                  }}
                />
              </ContextMenuProvider>,
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
          </TableRow>
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
      </Table>
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
            <CreateCropType />
          </CreateCropTypeProvider>
        )}
        {modalState.type === "planter" && (
          <CreatePlanterProvider onCancel={handleModalClose} onComplete={handleAddPlanterRecord}>
            <CreatePlanter />
          </CreatePlanterProvider>
        )}
        {modalState.type === "sprinklerGroup" && (
          <CreateSprinklerGroupProvider onCancel={handleModalClose} onComplete={hnadleAddSprinklerGroupRecord}>
            <CreateSprinklerGroup />
          </CreateSprinklerGroupProvider>
        )}
      </Modal>
      {toast && (
        <Toast message={toast.message} type={toast.type} linkText={toast.linkText} onLinkClick={toast.onLinkClick} />
      )}
    </div>
  );
}
