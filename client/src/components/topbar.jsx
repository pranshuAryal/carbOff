import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:3000";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt-token'); 
    navigate('/login');
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await res.json();
        setUsername(data.username || "");
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="w-screen h-16 bg-[rgb(98,131,122)] border-b border-gray-400 flex items-center justify-between pl-6 pr-2">
      <img src={logo} alt="Logo" className="h-14 object-contain" />

      <div className="flex items-center ">
        {loading ? (
          <span className="text-gray-200 text-sm italic">Loading...</span>
        ) : username ? (
          <span className="text-gray-700 font-medium text-md select-none">
            Welcome, {username}!
          </span>
        ) : (
          <span className="text-gray-500 text-sm italic">Not logged in</span>
        )}

        <div
          onClick={handleLogout}
          title="Logout"
          className="p-2 ml-2 rounded-full text-gray-700 bg-transparent hover:bg-white hover:text-[#23236B] cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center"
        >
          <FaSignOutAlt size={20} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
