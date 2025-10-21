import useFindUser from "./hooks/useFindUser"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import SuccessMessage from "../../components/SuccessMessage"
import EditUser from "./components/EditUser"
import { useState } from "react"
import useUpdate from '../../hooks/useUpdate'
import { updateUser } from '../../service/api/apiUser'

export default function UsersPage() {
    const [editor, setEditor] = useState(false)
    const { data: dataUpdate, isLoading: isLoadingUpdate, error: errorUpdate, succes: succesUpdate, handleUpdate } = useUpdate(updateUser);
    const { data, isLoading, error } = useFindUser(succesUpdate)
    return (
        <>
            {isLoading && (<LoadingSpinner />)}
            {data && (
                <div class="w-full max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md mb-4">

                    <h2 className="text-3xl font-bold mb-10 text-center ">Mi perfil</h2>
                    <div className="flex justify-evenly ">
                        <div className="w-24 h-24 rounded-full border border-gray-400 flex items-center justify-center text-4xl font-bold">{data.first_name.charAt(0).toUpperCase() + data.last_name.charAt(0).toUpperCase()}</div>
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold ">{data.first_name + ' ' + data.last_name} </h3>
                            <h3 className="text-2xl text-gray-500">{data.username}</h3>
                            <button className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors mt-4" onClick={() => setEditor(true)}>Editar Perfil</button>
                        </div>
                    </div>
                </div>
            )}
            {error && (<ErrorMessage />)}
            {editor && <EditUser
                user_data={data}
                cerrarFormulario={setEditor}
                isLoading={isLoadingUpdate}
                handleUpdate={handleUpdate}
            />}

            {errorUpdate && (<ErrorMessage />)}
            {succesUpdate && (<SuccessMessage />)}
        </>
    )
}