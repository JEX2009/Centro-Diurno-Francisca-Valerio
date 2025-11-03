import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form"; 
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

export default function CreateTest({ crearTest,closeModal}) {
    const { 
        register, 
        handleSubmit, 
        control, 
        watch, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            nombre: "",
            categoria: "",
            preguntas: [],
        }
    });

    const { 
        fields: preguntasFields, 
        append: appendPregunta, 
        remove: removePregunta 
    } = useFieldArray({
        control,
        name: "preguntas"
    });

    const handleCreate = (data) => {
        crearTest(data);
        closeModal();
    };
    
    const addNewPregunta = () => {
        appendPregunta({
            texto_pregunta: "",
            tipo_pregunta: "Texto",
            opciones: []
        });
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)} className="p-8 bg-white shadow-2xl rounded-xl space-y-8">
            <h1 className="text-3xl font-bold text-blue-700 border-b pb-4 mb-4">Crear Nueva Plantilla de Test</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 border rounded-lg bg-gray-50">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del Test</label>
                    <input 
                        type="text" 
                        {...register("nombre", { required: "El nombre es obligatorio" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input 
                        type="text" 
                        {...register("categoria", { required: "La categoría es obligatoria" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 flex justify-between items-center">
                Preguntas
                <button 
                    type="button" 
                    onClick={addNewPregunta} 
                    className="flex items-center space-x-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                >
                    <FaPlus size={12}/>
                    <span>Añadir Pregunta</span>
                </button>
            </h2>

            <div className="space-y-6">
                {preguntasFields.map((field, index) => (
                    <PreguntaField 
                        key={field.id}
                        preguntaIndex={index}
                        control={control}
                        register={register}
                        watch={watch}
                        removePregunta={removePregunta}
                    />
                ))}
                {preguntasFields.length === 0 && (
                    <p className="text-center text-gray-500 p-4 border rounded-lg">Comienza añadiendo tu primera pregunta.</p>
                )}
            </div>
            
            <div className="pt-4 border-t">
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                    Guardar Plantilla de Test
                </button>
            </div>
        </form>
    );
}

function PreguntaField({ preguntaIndex, control, register, watch, removePregunta }) {
    const { 
        fields: opcionesFields, 
        append: appendOpcion, 
        remove: removeOpcion 
    } = useFieldArray({
        control,
        name: `preguntas.${preguntaIndex}.opciones`
    });

    const tipoPregunta = watch(`preguntas.${preguntaIndex}.tipo_pregunta`);

    return (
        <div className="p-5 border border-blue-200 rounded-lg bg-white shadow-md space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
                <h3 className="text-lg font-semibold text-blue-800">Pregunta #{preguntaIndex + 1}</h3>
                <button type="button" onClick={() => removePregunta(preguntaIndex)} className="text-red-500 hover:text-red-700 transition">
                    <FaTrash size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Texto de la Pregunta</label>
                    <textarea 
                        rows="2"
                        {...register(`preguntas.${preguntaIndex}.texto_pregunta`, { required: "El texto es obligatorio" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Pregunta</label>
                    <select
                        {...register(`preguntas.${preguntaIndex}.tipo_pregunta`)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white"
                    >
                        <option value="Texto">Texto</option>
                        <option value="Numerico">Numerico</option>
                        <option value="Opcion_Multiple">Opción Múltiple</option>
                    </select>
                </div>
            </div>

            {tipoPregunta === 'Opcion_Multiple' && (
                <div className="border border-dashed p-4 rounded-lg bg-blue-50 space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold text-blue-700">Opciones de Respuesta</h4>
                        <button
                            type="button"
                            onClick={() => appendOpcion({ texto_opcion: "", valor_puntaje: 0 })}
                            className="text-blue-500 hover:text-blue-700 transition flex items-center space-x-1"
                        >
                            <MdAddCircle size={18} />
                            <span>Añadir Opción</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        {opcionesFields.map((opcion, opcionIndex) => (
                            <div key={opcion.id} className="flex space-x-3 items-center">
                                <input 
                                    type="text" 
                                    {...register(`preguntas.${preguntaIndex}.opciones.${opcionIndex}.texto_opcion`, { required: true })}
                                    placeholder="Texto de la opción"
                                    className="p-1 border border-gray-300 rounded-md w-full"
                                />
                                <input 
                                    type="number" 
                                    {...register(`preguntas.${preguntaIndex}.opciones.${opcionIndex}.valor_puntaje`, { required: true, valueAsNumber: true })}
                                    placeholder="Ptos"
                                    className="p-1 border border-gray-300 rounded-md w-20 text-center"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeOpcion(opcionIndex)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <FaMinus size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
