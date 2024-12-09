import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeerUsuarios from './LeerUsuarios';
import EditarUsuario from './EditarUsuario';
import AgregarUsuario from './AgregarUsuario';
import Swal from 'sweetalert2';
import { Button, Modal, Box, Typography } from '@mui/material';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });
  const [editUsuario, setEditUsuario] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsuarios(response.data);
    } catch (error) {
      Swal.fire('Error', 'Error al obtener los usuarios', 'error');
    }
  };

  const handleCreateUsuario = async () => {
    if (!newUsuario.nombre || !newUsuario.apellido || !newUsuario.email) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/users', newUsuario);
      setUsuarios([...usuarios, response.data]);
      setNewUsuario({ nombre: '', apellido: '', email: '' });
      setOpenModal(false);
      Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al agregar usuario', 'error');
    }
  };
  

  const handleEditUsuario = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${editUsuario._id}`, editUsuario);
      const updatedUsuarios = usuarios.map(usuario =>
        usuario._id === editUsuario._id ? response.data : usuario
      );
      setUsuarios(updatedUsuarios);
      setEditUsuario(null);
      Swal.fire('Éxito', 'Usuario editado correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al editar usuario', 'error');
    }
  };
  

  const handleDeleteUsuario = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsuarios(usuarios.filter(usuario => usuario._id !== id));
        Swal.fire('Éxito', 'Usuario eliminado correctamente', 'success');
      } catch (error) {
        Swal.fire('Error', 'Error al eliminar usuario', 'error');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
        style={{ marginBottom: '16px' }}
      >
        Agregar Usuario +
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" marginBottom={2}>
            Agregar Usuario
          </Typography>
          <AgregarUsuario
            newUsuario={newUsuario}
            setNewUsuario={setNewUsuario}
            handleCreateUsuario={handleCreateUsuario}
          />
        </Box>
      </Modal>
      <LeerUsuarios
        usuarios={usuarios}
        setEditUsuario={setEditUsuario}
        handleDeleteUsuario={handleDeleteUsuario}
      />
      {editUsuario && (
        <EditarUsuario
          editUsuario={editUsuario}
          setEditUsuario={setEditUsuario}
          handleEditUsuario={handleEditUsuario}
        />
      )}
    </div>
  );
}

export default Usuarios;
