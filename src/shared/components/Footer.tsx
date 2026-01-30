{/* 
 * 
 */}
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    return (
        <footer className="px-4 py-2 justify-between items-center w-full bg-white shadow-inner">
            
            {!(isLoginPage) && (
                
                    <p className="text-sm font-semibold">
                        Chats are processed by AMD and its service providers. Don't enter sensitive info. Terms of Service and Privacy Policy apply.
                    </p>
            )}

        </footer>
    );
}