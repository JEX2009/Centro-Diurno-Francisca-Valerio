import '/src/static/Tailwind.css'
import { Link, Outlet } from 'react-router-dom';

export default function Navbar(props) {
    const { isAuthenticated, handleLogOut } = props;
    return (
        <>
            <header className="bg-blue-500 shadow p-4">
                <div className='container mx-auto flex justify-between items-center'>
                    <h1><Link to="/" className="text-2xl font-bold text-white">Sistema de Terapias </Link></h1>
                    {isAuthenticated && (
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <Link to="/casos_especiales" className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Casos Especiales</Link>
                                </li>
                                <li>
                                    <Link to="/paciente" className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Paciente</Link>
                                </li>
                                <li>
                                    <Link to="/terapias" className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Terapias</Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Agenda</Link>
                                </li>
                                <li>
                                    <Link to="/usuario" className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Mi Perfil</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="text-white hover:text-gray-800 transition duration-300 ease-in-out">Cerrar Sesión</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    )
}