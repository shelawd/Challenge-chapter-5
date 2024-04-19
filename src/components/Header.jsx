import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { name } = response.data.data;
        setUserName(name);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    navigate("/");
  };

  return (
    <div className="bg-blue-500 p-2 flex justify-between items-center">
      {/* left side */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://cdn2.iconfinder.com/data/icons/xomo-basics/128/document-06-512.png"
            width="50"
            alt="LOGO"
            className="mr-2"
          />
        </Link>
      </div>
      {/* right side */}
      <div className="hidden md:block">
        {userName ? (
          <div className="flex items-center">
            <p className="inline-block p-2 text-blue-200 mr-2">Welcome, {userName}</p>
            <button
              onClick={handleLogout}
              className="inline-block p-2 text-blue-200 hover:text-blue-100 mr-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleLogin} className="inline-block p-2 text-blue-200 hover:text-blue-100 mr-2">
              Login
            </button>
            <button
              onClick={handleRegister}
              className="inline-block py-2 px-4 text-yellow-700 bg-yellow-500 hover:bg-yellow-300 hover:text-yellow-900 rounded transition ease-in duration-150"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
