import React from "react";
import { useCreateCrop } from "./useCreateCrop";
import { DataTable, DataTableRow } from "@/presentation/components/ui/DataTable";
import { Dialog as Modal } from "@/presentation/components/ui/Dialog";
import { FaSave } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { Input } from "@/presentation/components/ui/Input";
import { MenuProvider } from "@/presentation/components/ui/Menu";
import Menu from "@/presentation/components/ui/Menu/Menu";
import Snackbar from "@/presentation/components/ui/Snackbar/Snackbar";
import {
  CreateCropTypeProvider,
  CreateCropTypeForm,
  CreatePlanterProvider,
  CreatePlanterForm,
  CreateSprinklerGroupProvider,
  CreateSprinklerGroupForm,
} from "@/presentation/components/features";
import { SnackbarType } from "@/presentation/components/ui/Snackbar/Snackbar.types";

export default function CreateCropForm() {
  const {
    rows,
    addRow,
    deleteRow,
    setRows,
    cropTypeDataSource,
    planterDataSource,
    sprinklerGroupDataSource,
    cropTypeSelected,
    planterSelected,
    sprinklerGroupSelected,
    setCropTypeSelected,
    setPlanterSelected,
    setSprinklerGroupSelected,
    openModal,
    modalState,
    handleModalClose,
    handleAddCropTypeRecord,
    handleAddPlanterRecord,
    handleAddSprinklerGroupRecord,
    validateAndSave,
    toast,
  } = useCreateCrop();

  return (
    <div>
      {toast?.message && <Snackbar message={toast.message} type={toast.type as SnackbarType} />}
      <DataTable
        columns={[
          "Cultivo",
          "Unidades",
          "Tipo de cultivo",
          "Jardinera",
          "Grupo de Aspersores",
          "Acciones",
        ]}
      >
        {rows.map((row) => (
          <DataTableRow
            key={row.id}
            id={row.id}
            columns={[
              <Input
                key="name"
                label=""
                type="text"
                name="name"
                value={row.name || ""}
                onChange={(e) =>
                  setRows((prev: any[]) =>
                    prev.map((r: any) => (r.id === row.id ? { ...r, name: e.target.value } : r))
                  )
                }
              />,
              <Input
                key="plantUnits"
                label=""
                type="number"
                name="plantUnits"
                value={row.plantUnits || 0}
                onChange={(e) =>
                  setRows((prev: any[]) =>
                    prev.map((r: any) =>
                      r.id === row.id ? { ...r, plantUnits: parseInt(e.target.value) } : r
                    )
                  )
                }
              />,
              <MenuProvider key="cropType" onAddNew={() => openModal("cropType") }>
                <Menu
                  options={cropTypeDataSource}
                  selectedOption={row.cropTypeId ?? cropTypeSelected}
                  onSelect={(id) => {
                    setCropTypeSelected(Number(id));
                    setRows((prev: any[]) =>
                      prev.map((r: any) =>
                        r.id === row.id ? { ...r, cropTypeId: Number(id) } : r
                      )
                    );
                  }}
                />
              </MenuProvider>,
              <MenuProvider key="planter" onAddNew={() => openModal("planter") }>
                <Menu
                  options={planterDataSource}
                  selectedOption={row.planterId ?? planterSelected}
                  onSelect={(id) => {
                    setPlanterSelected(Number(id));
                    setRows((prev: any[]) =>
                      prev.map((r: any) =>
                        r.id === row.id ? { ...r, planterId: Number(id) } : r
                      )
                    );
                  }}
                />
              </MenuProvider>,
              <MenuProvider key="sprinklerGroup" onAddNew={() => openModal("sprinklerGroup") }>
                <Menu
                  options={sprinklerGroupDataSource}
                  selectedOption={row.sprinklerGroupId ?? sprinklerGroupSelected}
                  onSelect={(id) => {
                    setSprinklerGroupSelected(Number(id));
                    setRows((prev: any[]) =>
                      prev.map((r: any) =>
                        r.id === row.id ? { ...r, sprinklerGroupId: Number(id) } : r
                      )
                    );
                  }}
                />
              </MenuProvider>,
            ]}
          >
            <button
              className="text-green-500 mx-2"
              onClick={() => validateAndSave(row)}
            >
              <FaSave />
            </button>
            <button
              className="text-red-500 mx-2"
              onClick={() => deleteRow(row.id)}
            >
              <FaTrash />
            </button>
            <button
              className="text-blue-500 mx-2"
              onClick={addRow}
            >
              <FaPlus />
            </button>
          </DataTableRow>
        ))}
        {rows.length === 0 && (
          <tr>
            <td
              colSpan={6}
              className="p-4 border border-gray-300 text-center"
            >
              <button
                onClick={addRow}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
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
          <CreateCropTypeProvider
            onCancel={handleModalClose}
            onComplete={handleAddCropTypeRecord}
          >
            <CreateCropTypeForm />
          </CreateCropTypeProvider>
        )}
        {modalState.type === "planter" && (
          <CreatePlanterProvider
            onCancel={handleModalClose}
            onComplete={handleAddPlanterRecord}
          >
            <CreatePlanterForm />
          </CreatePlanterProvider>
        )}
        {modalState.type === "sprinklerGroup" && (
          <CreateSprinklerGroupProvider
            onCancel={handleModalClose}
            onComplete={handleAddSprinklerGroupRecord}
          >
            <CreateSprinklerGroupForm />
          </CreateSprinklerGroupProvider>
        )}
      </Modal>
    </div>
  );
} 