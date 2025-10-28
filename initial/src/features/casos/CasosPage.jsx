export default function CasosPage(){
    return(
        <>
            <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b pb-2">
                Casos Especiales
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-1 bg-gray-50 p-4 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-bold text-gray-700 mb-3">Crear Nuevo Caso</h2>

                    {/* <textarea
                        name="nombreTerapia"
                        id="nombreTerapia"
                        placeholder="Nombre de la nueva terapia..."
                        rows="3"
                        value={nombreTerapia}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-200 focus:border-blue-500 mb-4"
                    />

                    <button
                        type="button"
                        onClick={handleCreate}
                        disabled={isLoading || !nombreTerapia.trim()}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                    >
                        {isLoading ? 'Creando...' : 'Crear Terapia'}
                    </button>
                    {
                        succes !== false &&(<SuccessMessage/>)
                    } */}
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold text-gray-700 mb-3 border-b pb-1">Casos Existentes ({/*terapias.length*/})</h2>

                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {/* {terapias.map((terapia) => (
                            <div
                                key={terapia.id}
                                className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
                            >
                                <p className="text-lg font-medium text-gray-800">{terapia.nombre}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}