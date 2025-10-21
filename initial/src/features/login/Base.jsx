
import Login from './Login';
import Register from './Register';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Base(props) {
    const location = useLocation();
    const navigate = useNavigate()
    const { onLoginSuccess } = props;
    const enUso = {
        boton: 'flex flex-col items-center gap-2 text-black',
        div: 'h-1 w-full bg-black rounded-full'
    };
    const noUsado = {
        boton: 'flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600',
        div: 'h-1 w-full bg-transparent'
    };
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center items-center gap-6">
                {location.pathname == '/login' ? (<>
                    <button className={enUso.boton}>
                        <span className="text-2xl font-bold">Iniciar Sesión</span>
                        <div className={enUso.div}></div>
                    </button>
                    <div className="w-px h-16 bg-gray-300"></div>
                    <button className={noUsado.boton} onClick={() => navigate('/registro')}>
                        <span className="text-2xl font-bold">Registro</span>
                        <div className={noUsado.div}></div>
                    </button>
                </>) : (<>
                    <button className={noUsado.boton} onClick={() => navigate('/login')}>
                        <span className="text-2xl font-bold">Iniciar Sesión</span>
                        <div className={noUsado.div}></div>
                    </button>
                    <div className="w-px h-16 bg-gray-300"></div>
                    <button className={enUso.boton}>
                        <span className="text-2xl font-bold">Registrate</span>
                        <div className={enUso.div}></div>
                    </button>
                </>)}
            </div>
            <div>
                {location.pathname === '/login' ? (
                    <Login onLoginSuccess={onLoginSuccess} />
                ) : (
                    <Register onLoginSuccess={onLoginSuccess}/>
                )}
            </div>
        </div>
    )
}