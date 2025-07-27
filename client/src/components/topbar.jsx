import React, { useState, useEffect } from "react";

function TopBar() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("jwt-token");
      console.log("Token:", token);
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
    <div
      className="border-b h-16 flex items-center px-6"
      style={{ width: "calc(100vw - 272px)", justifyContent: "flex-end" }}
    >
      {loading ? (
        <span>Loading...</span>
      ) : username ? (
        <span className="font-medium text-gray-700">Welcome, {username}!</span>
      ) : (
        <span className="text-gray-500">Not logged in</span>
      )}
    </div>
  );
}

export default TopBar;
