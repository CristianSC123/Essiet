import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeerPantallas from './LeerPantallas.jsx';
import EditarPantalla from './EditarPantalla.jsx';
import AgregarPantalla from './AgregarPantalla.jsx';
import Swal from 'sweetalert2';
import { Button, Modal, Box, Typography } from '@mui/material';

function Pantallas() {
    const [pantallas, setPantallas] = useState([]);
    const [newPantalla, setNewPantalla] = useState({
        codigo: '',
        modelo: '',
        precio: '',
        cantidad: '',
        calidad: '',
    });
    const [editPantalla, setEditPantalla] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchPantallas();
    }, []);

    const fetchPantallas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pantallas');
            setPantallas(response.data);
        } catch (error) {
            Swal.fire('Error', 'Error al obtener las pantallas', 'error');
        }
    };

    const handleCreatePantalla = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/pantallas', newPantalla);
            setPantallas([...pantallas, response.data]);
            setNewPantalla({ codigo: '', modelo: '', precio: '', calidad: '', cantidad: '' });
            setOpenModal(false);
            Swal.fire('Éxito', 'Pantalla agregada correctamente', 'success');
        } catch (error) {
            Swal.fire('Error', 'Error al agregar pantalla', 'error');
        }
    };

    const handleEditPantalla = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/pantallas/${editPantalla._id}`, editPantalla);
            const updatedPantallas = pantallas.map(pantalla =>
                pantalla._id === editPantalla._id ? response.data : pantalla
            );
            setPantallas(updatedPantallas);
            setEditPantalla(null);
            Swal.fire('Éxito', 'Pantalla editada correctamente', 'success');
        } catch (error) {
            Swal.fire('Error', 'Error al editar pantalla', 'error');
        }
    };

    const handleDeletePantalla = async (id) => {
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
                await axios.delete(`http://localhost:5000/api/pantallas/${id}`);
                setPantallas(pantallas.filter(pantalla => pantalla._id !== id));
                Swal.fire('Éxito', 'Pantalla eliminada correctamente', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error al eliminar pantalla', 'error');
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Pantallas</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
                style={{ marginBottom: '16px' }}
            >
                Agregar Pantalla +
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
                        Agregar Pantalla
                    </Typography>
                    <AgregarPantalla
                        newPantalla={newPantalla}
                        setNewPantalla={setNewPantalla}
                        handleCreatePantalla={handleCreatePantalla}
                    />
                </Box>
            </Modal>
            <LeerPantallas
                pantallas={pantallas}
                setEditPantalla={setEditPantalla}
                handleDeletePantalla={handleDeletePantalla}
            />
            {editPantalla && (
                <EditarPantalla
                    editPantalla={editPantalla}
                    setEditPantalla={setEditPantalla}
                    handleEditPantalla={handleEditPantalla}
                />
            )}
        </div>
    );
}

export default Pantallas;
