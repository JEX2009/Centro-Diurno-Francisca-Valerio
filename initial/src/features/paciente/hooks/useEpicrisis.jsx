import { createEpicrisis, fetchEpicrisis } from "../../../service/api/apiPaciente"
import useCreate from "../../../hooks/useCreate";
import useFeatch from '../../../hooks/useFeatch';


export default function useEpicrisis() {
    const { data, isLoading:isLoadingEpicrisis, error:errorEpicrisis, refetch } = useFeatch(fetchEpicrisis);
    const { data:dataCrEpicrisis, isLoading:isLoadingCrEpicrisis, error: errorCrEpicrisis, succes, handleCreate } = useCreate(createEpicrisis, refetch);

    const epicrisis = data.data || [];

    const subirEpicrisis = (data) => {
        handleCreate(data)
    }

    return {
        epicrisis, isLoadingEpicrisis, errorEpicrisis, succes, subirEpicrisis,isLoadingCrEpicrisis,errorCrEpicrisis
    }
}