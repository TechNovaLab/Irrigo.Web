import React from "react";
import { useCreateCropTypeContext } from "../hooks/useCreateCropType";
import { Input } from "@/components/Input";
import Toast from "@/components/Toast/Toast";

export default function CreateCropType() {
  const { formData, toast, handleInputChange, handleSave, handleCancel } = useCreateCropTypeContext();

  return (
    <div>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <label className="block mb-2">
        <Input label="Nombre del tipo de cultivo" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label className="block mb-4">
        <Input
          type="number"
          label="Agua Requerida por Día (litros)"
          name="waterRequiredPerDay"
          value={formData.waterRequiredPerDay}
          onChange={handleInputChange}
        />
      </label>
      <div className="flex justify-end">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mr-2" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
}
