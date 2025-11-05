import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUser , fetchLogin} from '../../service/api/apiUser';

export default function CrearUsuario(props) {
    const { onLoginSuccess } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState(null);

    const onSubmit = async (data) => {
        try {
            await createUser(data);
            try {
                await fetchLogin(data.username, data.password);
                onLoginSuccess();

            } catch (err) {
                setApiError('Usuario o contraseña incorrectos.');
                console.error(err);
            }
            onLoginSuccess();

        } catch (err) {
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const firstErrorField = Object.keys(errors)[0]; // ej: "username"
                const errorMessage = errors[firstErrorField][0]; // ej: "Este usuario ya existe"

                setApiError(errorMessage); 

            } else {
                setApiError('Ocurrió un error al intentar crear la cuenta.');
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex justify-center items-center flex-col mt-8  '>
                <div className="mb-2 w-full">
                    <label htmlFor="username" className="block text-gray-700 mb-2">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", { required: "Se necesita un nombre de usuario" })}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>
                <div className="mb-2 w-full">
                    <label htmlFor="first_name" className="block text-gray-700 mb-2">Nombre</label>
                    <input
                        type="text"
                        id="first_name"
                        {...register("first_name", { required: "El nombre es obligatorio" })}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.first_name ? 'border-red-500' : ''}`}
                    />
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                </div>
                <div className="mb-2 w-full">
                    <label htmlFor="last_name" className="block text-gray-700 mb-2">Apellidos</label>
                    <input
                        type="text"
                        id="last_name"
                        {...register("last_name", { required: "Es obligatorio un apellido" })}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.last_name ? 'border-red-500' : ''}`}
                    />
                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                </div>
                <div className="mb-2 w-full">
                    <label htmlFor="codigo" className="block text-gray-700 mb-2">Codigo</label>
                    <input
                        type="text"
                        id="codigo"
                        {...register("codigo", { required: "El codigo es obligatorio" })}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.codigo ? 'border-red-500' : ''}`}
                    />
                    {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo.message}</p>}
                </div>
                <div className="mb-6 w-full">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", { required: "La contraseña es obligatoria" })}
                        className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
                    Crear
                </button>
            </form>
            {apiError && <p className="text-red-500 mt-4 text-center">{apiError}</p>}
        </>
    )
}