import { Input } from "@/components/Input";
import { useCreatePlanterContext } from "../hooks/useCreatePlanterContext";
import Toast from "@/components/Toast/Toast";

export default function CreatePlanter() {
  const { formData, toast, handleInputChange, handleSave, handleCancel } = useCreatePlanterContext();

  return (
    <div>
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <label className="block mb-2">
        <Input label="Nombre de la jardinera" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label className="block mb-4 text-sm/6 font-medium text-white-900">
        Descripción:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
