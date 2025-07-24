import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/loginPageBg.png';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/login';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const res = await loginUser({ email, password });
        const token = res.access_token;
        if (!token) throw new Error("No token received from server.");
        localStorage.setItem('jwt-token', token);
        navigate('/');
    } catch (err) {
        setError(
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Login failed. Please try again."
        );
    }
    };




    return(
        <>
            <div 
                className='w-screen h-screen bg-cover bg-center flex items-center justify-center relative'
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="rounded-2xl shadow-2xl p-10 pt-15 w-full h-9/12 max-w-md flex flex-col gap-6 z-10 absolute right-25 backdrop-blur-lg">
                    <h1 className="text-6xl font-black mb-10">Welcome,</h1>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-600 font-semibold mb-2">{error}</div>
                        )}
                        <div>
                            <label className="block text-xl font-semibold mb-2">Email</label>
                            <input
                                type="text"
                                placeholder="Enter email"
                                className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 mb-2 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-1">
                                <input type="checkbox" className="accent-emerald-700 ml-1 size-4 font-semibold" />
                                Remember me
                            </label>
                            <Link to="" className="text-emerald-700 hover:text-emerald-950 underline">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-emerald-700 hover:bg-emerald-950 text-white font-bold text-2xl py-2 rounded-lg shadow-lg  transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center text-md mt-2">
                        Dont have an account?{' '}
                        <Link to="/signup" className="text-green-800 underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login