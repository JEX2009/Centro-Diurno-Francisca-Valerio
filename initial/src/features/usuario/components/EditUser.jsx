import { useForm } from 'react-hook-form';
import SuccessMessage from '../../../components/SuccessMessage';

export default function EditUser(props) {
    const { user_data, cerrarFormulario, isLoading, handleUpdate,success} = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: user_data.username,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            Password: ""
        }});

    const save = (dataForm) => {
        const dataToUpdate = { ...dataForm };
        handleUpdate(user_data.id, dataToUpdate);
        cerrarFormulario(false) 
    }

    return (
        <>
            <form onSubmit={handleSubmit(save)} className="space-y-4 flex justify-center items-center flex-col mt-8 py-4 bg-white rounded-lg shadow-xl ">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 text-center">Nombre de Usuario</label>
                <input
                    type="text"
                    id="username"
                    {...register("username")}
                    className={`w-150 text-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                />
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1 text-center">Nombre</label>
                <input
                    type="text"
                    id="first_name"
                    {...register("first_name")}
                    className={`w-150 text-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1 text-center">Apellidos</label>
                <input
                    type="text"
                    id="last_name"
                    {...register("last_name")}
                    className={`w-150 text-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-150 border border-gray-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors  cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed "
                >
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </button>
            </form>
        </>
    )
}   