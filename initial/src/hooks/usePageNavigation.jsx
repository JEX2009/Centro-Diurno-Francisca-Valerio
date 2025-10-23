import { useNavigate } from 'react-router-dom';

export default function usePageNavigation() {

    const navigate = useNavigate();

    const goToPage = (path, state = {}) => {
        navigate(path, { state });
    };

    const goBack = () => navigate(-1);

    return { goToPage, goBack };
}
