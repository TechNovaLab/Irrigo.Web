"use client";

import React, { useState } from "react";
import { useTableContext } from "@/contexts/table/TableContext";
import { Table, TableRow } from "@/components/Table";
import { Modal } from "@/components/Modal";
import { ContextMenu } from "@/components/ContextMenu";
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

export default function CropFrom() {
  const { rows, addRow, saveRow, deleteRow, setRows } = useTableContext();
  const [modalState, setModalState] = useState<{
    type: "cropType" | "planter" | "sprinklerGroup" | null;
    isOpen: boolean;
  }>({ type: null, isOpen: false });

  const handleModalClose = () => {
    setModalState({ type: null, isOpen: false });
  };

  return (
    <div>
      <Table columns={["Cultivo", "Unidades", "Tipo de cultivo", "Jardinera", "Grupo de Aspersores", "Acciones"]}>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            id={row.id}
            columns={[
              <input
                key={row.id}
                type="text"
                value={row.name}
                onChange={(e) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)))
                }
                className="w-full p-1 border rounded"
              />,
              <input
                key={row.id}
                type="number"
                value={row.plantUnits}
                onChange={(e) =>
                  setRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, plantUnits: Number(e.target.value) } : r))
                  )
                }
                className="w-full p-1 border rounded"
              />,
              <ContextMenu
                key={row.id}
                options={[
                  { id: 1, label: "Tipo 1" },
                  { id: 2, label: "Tipo 2" },
                ]}
                selectedOption={row.cropTypeId}
                onSelect={(id) => setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, cropTypeId: id } : r)))}
                onAddNew={() => setModalState({ type: "cropType", isOpen: true })}
              />,
              <ContextMenu
                key={row.id}
                options={[
                  { id: 1, label: "Jardinera 1" },
                  { id: 2, label: "Jardinera 2" },
                ]}
                selectedOption={row.planterId}
                onSelect={(id) => setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, planterId: id } : r)))}
                onAddNew={() => setModalState({ type: "planter", isOpen: true })}
              />,
              <ContextMenu
                key={row.id}
                options={[
                  { id: 1, label: "Grupo 1" },
                  { id: 2, label: "Grupo 2" },
                ]}
                selectedOption={row.sprinklerGroupId}
                onSelect={(id) =>
                  setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, sprinklerGroupId: id } : r)))
                }
                onAddNew={() => setModalState({ type: "sprinklerGroup", isOpen: true })}
              />,
            ]}
          >
            <button className="text-green-500 mx-2" onClick={() => saveRow(row.id, row)}>
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
          <CreateCropTypeProvider onComplete={handleModalClose}>
            <CreateCropType />
          </CreateCropTypeProvider>
        )}
        {modalState.type === "planter" && (
          <CreatePlanterProvider onComplete={handleModalClose}>
            <CreatePlanter />
          </CreatePlanterProvider>
        )}
        {modalState.type === "sprinklerGroup" && (
          <CreateSprinklerGroupProvider onComplete={handleModalClose}>
            <CreateSprinklerGroup />
          </CreateSprinklerGroupProvider>
        )}
      </Modal>
    </div>
  );
}
