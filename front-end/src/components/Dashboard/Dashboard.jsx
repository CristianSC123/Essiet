import React, { useState } from "react";
import { FaUserCog, FaUsers, FaTools, FaShoppingCart } from "react-icons/fa";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Tecnicos from "../Tecnicos/Tecnicos";
import Pantallas from "../Pantallas/Pantallas";
import Usuarios from "../Usuarios/Usuarios";
import Ventas from "../Ventas/Ventas";
import CerrarSesion from "../CerrarSesion/CerrarSesion";

function Dashboard() {
  const [activeModule, setActiveModule] = useState("technicians");

  const modules = [
    { name: "Técnicos", id: "technicians", icon: <FaUserCog size={30} /> },
    { name: "Usuarios", id: "users", icon: <FaUsers size={30} /> },
    { name: "Repuestos", id: "parts", icon: <FaTools size={30} /> },
    { name: "Ventas", id: "sales", icon: <FaShoppingCart size={30} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 relative" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#033D68] text-white flex flex-col items-center">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Essiet Admin</h1>
          <img src="Logo Essiet.jpg" alt="Logo Essiet" className="mt-2" />
        </div>
        <nav className="w-full">
          <List>
            {modules.map((module) => (
              <ListItemButton
                key={module.id}
                selected={activeModule === module.id}
                onClick={() => setActiveModule(module.id)}
                sx={{
                  backgroundColor: activeModule === module.id ? "#022B4D" : "transparent",
                  color: "white",
                  "&:hover": { backgroundColor: "#022B4D" },
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{module.icon}</ListItemIcon>
                <ListItemText primary={module.name} />
              </ListItemButton>
            ))}
          </List>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <CerrarSesion /> {/* Renderiza el componente CerrarSesion */}
        <h2 className="text-3xl font-bold text-[#033D68] mb-4">
          {modules.find((module) => module.id === activeModule)?.name}
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          {activeModule === "technicians" && <Tecnicos />}
          {activeModule === "parts" && <Pantallas />}
          {activeModule === "users" && <Usuarios />}
          {activeModule === "sales" && <Ventas />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
