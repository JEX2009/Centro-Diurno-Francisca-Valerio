
import { fetchRespuestPrueba } from "../../../service/api/apiPruebas";
import useFeatch from '../../../hooks/useFeatch';

export default function usePacientTest() {
    const { data, isLoading:isLoadingRespuesta, error:errorRespuesta } = useFeatch(fetchRespuestPrueba);

    const tests = data.data || [];

    return {
        tests,
        isLoadingRespuesta,
        errorRespuesta
    }
}