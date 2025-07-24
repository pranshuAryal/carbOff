import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/loginPageBg.png';
import { createUser } from "../api/auth";

function Signup() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!userName || !email || !password1 || !password2) {
            setError("All fields are required.");
            return;
        }

        if (password1 !== password2) {
            setError("Passwords do not match.");
            return;
        }

        const data = {
            username: userName,
            email: email,
            password: password1
        };

        try {
            setLoading(true);
            await createUser(data);
            setLoading(false);
            navigate('/login');
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <div 
            className='w-screen h-screen bg-cover bg-center flex items-center justify-center relative'
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="rounded-2xl shadow-2xl px-10 py-7 w-full h-9/12 max-w-md flex flex-col z-10 absolute right-25  backdrop-blur-lg">
                <h1 className="text-6xl font-black mb-7">Welcome,</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xl font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-black"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-semibold mb-2">E-mail</label>
                        <input
                            type="email"
                            placeholder="Enter E-mail"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-black"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-semibold mb-2">Re-enter Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter password"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-black"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 font-semibold">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="relative left-20 bg-[rgb(98,131,122)] hover:bg-[rgb(51,51,51)] text-white font-bold text-2xl mt-5 py-2 w-50 h-15 rounded-full shadow-lg transition"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
