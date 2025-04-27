import Input from "@/presentation/components/ui/Input/Input";
import { useCreateSprinklerGroup } from "@/presentation/components/features/createSprinklerGroup/useCreateSprinklerGroup";
import Snackbar from "@/presentation/components/ui/Snackbar/Snackbar";

export default function CreateSprinklerGroupForm() {
  const { formData, toast, handleInputChange, handleSave, handleCancel } = useCreateSprinklerGroup();

  return (
    <div>
      {toast.message && <Snackbar message={toast.message} type={toast.type as "success" | "error" | "warning"} />}
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
