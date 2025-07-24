// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export default function ProtectedRoute() {
  const token = localStorage.getItem("jwt-token");
  return isTokenValid(token) ? <Outlet /> : <Navigate to="/login" replace />;
}
