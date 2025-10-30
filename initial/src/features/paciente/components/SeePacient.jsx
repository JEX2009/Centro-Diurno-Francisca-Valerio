import { useState } from "react";
import InformacionGeneralSection from './InformacionGeneralSection';
import AtencionesAnterioresSection from './AtencionesAnterioresSection';
import Responsables from './Responsables';
import Medicamentos from './Medicamentos';
import useMedicamento from "../hooks/useMedicamento"
import TestAnteriores from './TestAnteriores';

export default function SeePacient(props) {
    const { paciente, calcularEdad, citas } = props;
    const [activeTab, setActiveTab] = useState('info');
    const {medicamentos,isLoading,error,succesCreate,errorCreate,crearMedicamento,borrarMedicamento} = useMedicamento()
    

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return <InformacionGeneralSection paciente={paciente} calcularEdad={calcularEdad} />;
            case 'responsables':
                return <Responsables paciente={paciente} />;
            case 'medicamentos':
                return <Medicamentos paciente={paciente}  medicamentos={medicamentos} isLoading={isLoading} error={error} succesCreate={succesCreate} errorCreate={errorCreate} crearMedicamento={crearMedicamento} borrarMedicamento={borrarMedicamento}/>;
            case 'atenciones':
                return <AtencionesAnterioresSection citas={citas} paciente={paciente} />;
            case 'tests':
                return <TestAnteriores paciente={paciente} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out cursor-pointer ${activeTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Info General
                    </button>
                    <button
                        onClick={() => setActiveTab('responsables')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out cursor-pointer ${activeTab === 'responsables' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Responsables
                    </button>
                    <button
                        onClick={() => setActiveTab('medicamentos')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out cursor-pointer ${activeTab === 'medicamentos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Medicamentos
                    </button>
                    <button
                        onClick={() => setActiveTab('atenciones')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out cursor-pointer ${activeTab === 'atenciones' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Atenciones
                    </button>
                    <button
                        onClick={() => setActiveTab('tests')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out cursor-pointer ${activeTab === 'tests' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Tests
                    </button>
                </nav>
            </div>
            <div className="mt-4 p-2">
                {renderContent()}
            </div>
        </div>
    )
}