import { AiOutlineWoman } from "react-icons/ai";
import { RiMenLine } from "react-icons/ri";
import PopUp from '../../../components/PopUp'
import { useState } from "react";
import { calcularEdad } from "../../../helper/calcularEdad";
import { FaEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import SeePacient from "./SeePacient";
import EditPacient from "./EditPacient";
import DeletePacient from "./DeletePacient";

export default function TarejetaPaciente(props) {
    const { paciente, EditPaciente, DeletePaciente,userData } = props;
    const [modal, setModal] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const handleSeePaciente = () => {
        setModal(true)
    }

    const handleEditPaciente = () => {
        setModalEdit(true)
    }
    const handleDeletePaciente = () => {
        setModalDelete(true)
    }

    const colorBorde = paciente.esta_activo == true ? 'border-blue-600 bg-blue-100' : 'border-red-600 bg-red-100';
    return (
        <>
            <div className={`w-full p-4 rounded-lg shadow-md border mb-4 ` + colorBorde}>
                <div className="flex justify-between items-center">
                    <p className="text-xl">{paciente.nombre_completo}</p>
                    <p className="text-sm text-gray-600">Numero de cedula : {paciente.cedula}</p>
                    {paciente.genero !== 'Masculino' ? <AiOutlineWoman size={32} /> : <RiMenLine size={32} />}
                    <div className="flex justify-between gap-3">
                        <button onClick={handleSeePaciente} className="cursor-pointer"><FaEye color={'green'} size={20} /></button>
                        {paciente.esta_activo == true && (
                            <>
                                <button onClick={handleEditPaciente} className="cursor-pointer"><FaRegEdit size={20} /></button>
                                <button onClick={handleDeletePaciente} className="cursor-pointer"><MdOutlineDeleteOutline color={'red'} size={20} /></button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <PopUp closeModal={() => { setModal(false) }} isModalOpen={modal}>
                <SeePacient
                    paciente={paciente}
                    calcularEdad={calcularEdad}
                />
            </PopUp>
            <PopUp isModalOpen={modalEdit} closeModal={() => { setModalEdit(false) }} >
                <EditPacient
                    paciente={paciente}
                    setModalEdit={() => { setModalEdit(false) }}
                    EditPaciente={EditPaciente}
                />
            </PopUp>
            <PopUp isModalOpen={modalDelete} closeModal={() => { setModalDelete(false) }}>
                <DeletePacient
                    paciente={paciente}
                    setModalDelete={() => { setModalDelete(false) }}
                    DeletePaciente={DeletePaciente}
                    userData={userData}
                />
            </PopUp>
        </>
    )
}