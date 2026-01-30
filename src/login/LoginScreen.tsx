{/* 
 * 
 */}
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch('/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('username', email);
            navigate('/chatbot/chat');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'An unexpected error occurred');
            }
            else {
                console.error(String(err))
            }
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white">
            <div className="flex justify-center items-center mt-20">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
                    <h1 className="text-2xl font-bold text-center mb-2">Welcome</h1>
                    <p className="text-center text-gray-600 mb-6">Sign in to start your session</p>

                    {error && (
                        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-gray-600">Email</label>
                            <input 
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-600">Password</label>
                            <input 
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="remember" className="ml-2 text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <button 
                                type="button"
                                className="text-purple-600 hover:text-purple-800"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}