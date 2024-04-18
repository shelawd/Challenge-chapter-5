import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthGoogle from "./LoginGoogle";
// import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://shy-cloud-3319.fly.dev/api/v1/auth/login", {
                email: email,
                password: password,
            });

            console.log("Login success:", response.data); 
            localStorage.setItem("Token ", response.data.token);
            navigate("/home")
        } catch (error) {
            console.error("Login error:", error); 
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div className="flex justify-center items-center h-screen box-border">
    <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="bg-white p-4 rounded-lg">
            <div className="relative bg-inherit">
                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 mx-auto" 
                required
                />
                <label 
                htmlFor="email" 
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                    Email
                </label>
            </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
            <div className="relative bg-inherit">
                <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 mx-auto" 
                required
                />
                <label 
                htmlFor="password"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                >Password</label>
            </div>
            
        </div>
        
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
            <button 
            type="submit"
            className="group relative w-72 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-auto"
            >Login</button>
        </div> 

        <div className="border-b text-center mt-4">
                <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or continue with
                </div>
            </div>
        {/* <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
                }}
                onError={() => {
                console.log('Login Failed');
            }}
        />
         */}
         <AuthGoogle buttonText="Google Login" />
        
        <p className="text-center text-sm text-gray-500">Don&#x27;t have an account?
            <a href="#!"
            onClick={handleRegister}
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                up
            </a>
        </p>
    </form>
</div>

    )
}

export default Login;