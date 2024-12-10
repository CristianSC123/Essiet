import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

function CerrarSesion() {
  const nav = useNavigate();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user"); // Elimina al usuario almacenado
    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "info").then(() => {
      nav("/"); // Redirige al inicio de sesión
    });
  };

  return (
    <div className="absolute top-4 right-4">
      <button
        className="flex items-center bg-[#033D68] text-white px-4 py-2 rounded-full shadow hover:bg-[#022B4D] focus:outline-none"
        onClick={handleLogout}
      >
        <FaUserCircle size={24} className="mr-2" />
        Cerrar Sesión
      </button>
    </div>
  );
}

export default CerrarSesion;
