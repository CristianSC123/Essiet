import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Swal from "sweetalert2";

function Login() {
  const nav = useNavigate();
  const clientID = "988582702143-vlvr8era9qunmbgcmk4vf093u32jf6ca.apps.googleusercontent.com";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSuccess = async (credentialResponse) => {
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
    const email = decodedToken.email;

    try {
      const response = await fetch(`http://localhost:5000/api/users?email=${email}`);
      const data = await response.json();

      if (response.ok && data[0].email === email) {
        setUser({ ...data });
        localStorage.setItem("user", JSON.stringify(data));
        Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success");
        nav("./Dashboard");
      } else {
        Swal.fire("Acceso denegado", "El correo no está registrado", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema al verificar el usuario", "error");
    }
  };

  const handleError = () => {
    Swal.fire("Error", "No se pudo iniciar sesión con Google", "error");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "info");
  };

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="flex justify-center items-center min-h-screen bg-[#001D3D]">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <img src="Logo Essiet.jpg" alt="Logo Essiet" />
            <div className="w-24 h-24 bg-[#68BBE3] rounded-full"></div>
          </div>
          {!user ? (
            <>
              <h1 className="text-4xl font-extrabold text-center text-[#055C9D] mb-6 tracking-widest animate-bounce">
                <span className="bg-gradient-to-r from-[#68BBE3] to-[#003060] bg-clip-text text-transparent">
                  ¡Bienvenido a Essiet!
                </span>
              </h1>
              <div className="flex justify-center">
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} theme="outline" />
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-[#055C9D]">
                  Hola, {user.nombre}!
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <button
                className="mt-6 bg-[#055C9D] text-white px-4 py-2 rounded hover:bg-[#003060]"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
