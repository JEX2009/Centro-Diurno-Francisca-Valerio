import useFindUser from "./hooks/useFindUser"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"
import EditUser from "./components/EditUser"
import { useState } from "react"

export default function UsersPage() {
    const { data, isLoading, error } = useFindUser()
    const [editor, setEditor] = useState(false)

    return (
        <>
            {isLoading && (<LoadingSpinner />)}
            {data && (
                <>
                    <h2 className="text-3xl font-bold ml-6">Mi perfil</h2>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold ">{data.first_name + ' ' + data.last_name} </h3>
                        <h3 className="text-2xl font-bold ">{data.username}</h3>
                        <button className="p-3 border border-gray-300 rounded-lg m-3 w-100 cursor-pointer hover:bg-gray-200" onClick={()=>setEditor(true)}>Editar Perfil</button>
                    </div>
                </>
            )}
            {error && (<ErrorMessage />)}
            {editor && <EditUser
                user_data ={data}
                cerrarFormulario ={()=>setEditor(false)}
            />}
        </>
    )
}