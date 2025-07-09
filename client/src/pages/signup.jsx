import { useState } from 'react';
import bgImage from '../assets/backGround.png';

function Signup() {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        //write out a post api and call the api here 
    }
    return(
        <>
            <div 
                className='w-screen h-screen bg-cover bg-center flex items-center justify-center relative'
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="rounded-2xl shadow-2xl px-10 py-7 w-full h-9/12 max-w-md flex flex-col  z-10 absolute right-25 backdrop-blur-lg">
                    <h1 className="text-6xl font-black mb-10">Welcome,</h1>
                    <form 
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                        >
                        <div>
                            <label className="block text-xl font-semibold mb-2">Username</label>
                            <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none"
                            onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-2">E-mail</label>
                            <input
                            type="text"
                            placeholder="Enter E-mail"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none"
                            onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-2">Password</label>
                            <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none"
                            onChange={(e) => {
                                setPassword1(e.target.value);
                            }}

                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-2">Re-enter Password</label>
                            <input
                            type="password"
                            placeholder="Re-enter password"
                            className="w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 focus:outline-none"
                            onChange={(e) => setPassword2(e.target.value)} 

                            />
                        </div>                         
                        <button
                            type="submit"
                            className="bg-emerald-700 hover:bg-emerald-950 text-white font-bold text-2xl mt-10 py-2 rounded-lg shadow-lg  transition"
                        >
                            Signup
                        </button>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Signup