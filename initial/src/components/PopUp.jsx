import { IoClose } from "react-icons/io5";

const PopUp = (props) => {
    const { closeModal, isModalOpen, children } = props;

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center">
            {/* El contenedor del contenido del pop-up */}
            <div className="bg-slate-300 p-6 rounded-lg shadow-xl relative">
                {/* Botón para cerrar el modal */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer transition transition duration-500 ease-in-out transform hover:scale-150"
                >
                    <IoClose
                        size={24}
                    />
                </button>

                {/* Aquí se mostrará el contenido que pasemos*/}
                {children}
            </div>
        </div>
    );
}

export default PopUp