import { useForm } from 'react-hook-form';
import useUpdate from '../../../hooks/useUpdate'

export default function EditUser(user_data, cerrarFormulario) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data, isLoading, error, succes, handleUpdate } = useUpdate();

    const save = (data) => {
        // console.log(data)
        handleUpdate(user_data.id, data);
        cerrarFormulario;
    }
    return (
        <form onSubmit={handleSubmit(save)} className="space-y-4 flex justify-center items-center flex-col">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 text-center">Nombre de Usuario</label>
            <input
                type="text"
                id="username"
                placeholder= {data.username}
                {...register("username")}
                className={`w-150 aling-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1 text-center">Nombre</label>
            <input
                type="text"
                id="first_name"
                {...register("first_name")}
                className={`w-150 aling-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1 text-center">Apellidos</label>
            <input
                type="text"
                id="last_name"
                {...register("last_name")}
                className={`w-150 aling-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-1 text-center">Contraseña</label>
            <input
                type="text"
                id="Password"
                {...register("Password")}
                className={`w-150 aling-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.Password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button
                type="submit"
                disabled={isLoading} 
                className="w-150 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
        </form>
    )
}   