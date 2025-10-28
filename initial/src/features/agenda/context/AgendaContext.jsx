import { createContext, useContext } from 'react';
import useAgenda from '../hooks/useAgenda'; 
const AgendaContext = createContext(null);

export function AgendaProvider({ children }) {
    
    const agendaData = useAgenda();

    return (
        <AgendaContext.Provider value={agendaData}>
            {children}
        </AgendaContext.Provider>
    );
}

export function useAgendaContext() {
    const context = useContext(AgendaContext);

    if (context === null) {
        throw new Error('useAgendaContext debe ser usado dentro de un AgendaProvider');
    }

    return context;
}