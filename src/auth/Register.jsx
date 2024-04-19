import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email: email,
          name: name,
          password: password,
        }
      );

      console.log("response ", response.status);
      if (response.status === 201) {
        alert("Registration success!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/login"); 
      }
    } catch (error) {
      console.log("Error ", error.response.data);
      if (error.response.status === 400) {
        navigate("/login"); 
      } else {
        setError("Registration failed. Please try again.");
      } 
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

<h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
    Sign up for an account
</h2>
        <div className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 mx-auto"
            placeholder="Email"
            required
          />
          <label
            htmlFor="email"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Email
          </label>
          </div>

        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 mx-auto"
            placeholder="Name"
            required
          />
          <label
            htmlFor="name"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Name
          </label>
          </div>
          
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
          
          <input
            type={showPassword ? "text" : "password"} 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 mx-auto"
            placeholder="Password"
            required
          />
          <label
            htmlFor="password"
            className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Password
          </label>
          <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute cursor-pointer right-4 top-3 text-gray-400"
              onClick={togglePassword}
            />
          </div>
          
        </div>
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="group relative w-72 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-auto"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;