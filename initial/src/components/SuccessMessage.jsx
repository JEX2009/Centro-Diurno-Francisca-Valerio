const SuccessMessage = ({ message }) => (
    <div className="flex justify-center items-center p-8 bg-green-100 border border-green-400 rounded">
        <p className='text-lg text-green-600'>
            {message || "Se completo la tarea con exito."}
        </p>
    </div>
);
export default SuccessMessage;