import { featchMedicamento, createMedicamento,deleteMedicamento } from "../../../service/api/apiMedicamento"
import useCreate from "../../../hooks/useCreate";
import useFeatch from '../../../hooks/useFeatch';

export default function useMedicamento() {
    const { data, isLoading, error, refetch } = useFeatch(featchMedicamento);
    const { data: dataCreate, error: errorCreate, succesCreate, handleCreate } = useCreate(createMedicamento, refetch);

    const medicamentos = data.data || []

    const crearMedicamento = (data)=>{
        handleCreate(data);
    }

    const borrarMedicamento = async(medicamentoId)=>{
        try {
            await deleteMedicamento(medicamentoId);
            await refetch();
        } catch (error) {
            console.log(error)
        }
    }

    return {
        medicamentos,
        isLoading,
        error,
        succesCreate,
        errorCreate,
        crearMedicamento,
        borrarMedicamento
    }
}