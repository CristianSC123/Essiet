import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

function Login() {
  const nav = useNavigate();
  const clientID = "988582702143-vlvr8era9qunmbgcmk4vf093u32jf6ca.apps.googleusercontent.com"
  const [user, setUser] = useState(null);

  const handleSuccess = (credentialResponse) => {
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
    setUser(decodedToken);
    console.log("Usuario logueado:", decodedToken);
    const userData = {
      email: decodedToken.email,
      family_name: decodedToken.family_name,
      given_name: decodedToken.given_name,
    };
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Usuario guardado:', data))
      .catch((error) => console.error('Error al guardar usuario:', error));
    nav("./Dashboard")

  };

  const handleError = () => {
    console.error("Error en el login");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
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
                  Hola, {user.name}!
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
