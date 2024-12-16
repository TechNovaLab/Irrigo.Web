import { Input } from "@/components/Input";
import { useCreateSprinklerGroupContext } from "../hooks/useCreateSprinklerGroupContext";
import Toast from "@/components/Toast/Toast";

export default function CreateSprinklerGroup() {
  const { formData, toast, handleInputChange, handleSave, handleCancel } = useCreateSprinklerGroupContext();

  return (
    <div>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <label className="block mb-2">
        <Input label="Nombre del grupo" name="name" value={formData.name} onChange={handleInputChange} />
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
