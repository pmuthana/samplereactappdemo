{/* 
 * 
 */}
import { useNavigate } from 'react-router-dom';
import Title from '@/shared/components/Title';
import Footer from '@/shared/components/Footer';
import { FaTicketAlt } from 'react-icons/fa';

export default function IndexPage() {
    const navigate = useNavigate();

    const apps = [
        { name: 'Chatbot Agent', app_name: 'cloud_observability_agent', icon: <FaTicketAlt size={40} className="text-blue-500 mb-2" /> },
        
    ];

    function handleLogout() {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Title text={""} fontSize="text-5xl" />

            <main className="flex-grow flex flex-col items-start px-4 pt-10">
                <h1 className="text-3xl font-bold mb-8">Select an App</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {apps.map((app) => (
                        <button
                            key={app.name}
                            onClick={() => navigate(`/chatbot?app_name=${app.app_name}`)}
                            className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-blue-100 transition flex flex-col items-center"
                        >
                            <h2 className="text-xl font-semibold">{app.name}</h2>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </main>

            <Footer />
        </div>
    );
}
