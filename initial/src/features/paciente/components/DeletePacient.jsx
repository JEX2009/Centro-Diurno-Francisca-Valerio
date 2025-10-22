export default function DeletePacient({ paciente, DeletePaciente, setModalDelete }) {
    const handleConfirmDelete = async () => {
        try {
            // console.log(!paciente.esta_activo)
            await DeletePaciente(paciente.id, {esta_activo:!paciente.esta_activo});
            setModalDelete;
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
            // Opcional: mostrar un mensaje de error aquí
        }
    }
    return (
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-center mb-4">
                ¿Quieres eliminar a <span className="font-extrabold">{paciente?.nombre_completo}</span>?
            </h2>
            <p className="text-center mb-4">Esta accion es irreversible
                ¿Estás seguro?
            </p>
            <div className="grid grid-cols-2 mt-6 gap-4 justify-center">
                {/* 4. Conecta la función de borrado al botón "Si" */}
                <button
                    onClick={handleConfirmDelete}
                    className="rounded-lg bg-green-600 text-white w-full p-2 hover:bg-green-700 transition-colors"
                >
                    Si, eliminar
                </button>
                {/* 5. Conecta la función de cerrar al botón "No" */}
                <button
                    onClick={setModalDelete}
                    className="rounded-lg bg-red-600 text-white w-full p-2 hover:bg-red-700 transition-colors"
                >
                    No
                </button>
            </div>
        </div>
    )
}