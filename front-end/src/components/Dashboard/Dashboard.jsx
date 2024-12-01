import { useState } from 'react';

function Dashboard() {
  const [activeModule, setActiveModule] = useState('technicians');

  const modules = [
    { name: 'Técnicos', id: 'technicians' },
    { name: 'Usuarios', id: 'users' },
    { name: 'Repuestos', id: 'parts' },
    { name: 'Ventas', id: 'sales' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#055C9D] text-white">
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold">Essiet Admin</h1>
        </div>
        <nav>
          <ul>
            {modules.map((module) => (
              <li
                key={module.id}
                className={`p-4 cursor-pointer hover:bg-[#003060] ${
                  activeModule === module.id ? 'bg-[#003060]' : ''
                }`}
                onClick={() => setActiveModule(module.id)}
              >
                {module.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-[#055C9D] mb-4">
          {modules.find((module) => module.id === activeModule)?.name}
        </h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          {/* Render content dynamically based on activeModule */}
          <p>Aquí irá el contenido de {activeModule}</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
