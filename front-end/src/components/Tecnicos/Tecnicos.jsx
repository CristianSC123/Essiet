import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeerTecnicos from './LeerTecnico.jsx';
import EditarTecnico from './EditarTecnico.jsx';
import AgregarTecnico from './AgregarTecnico.jsx';
import { Button, Modal, Box, Typography } from '@mui/material';

function Tecnicos() {
    const [tecnicos, setTecnicos] = useState([]);
    const [newTecnico, setNewTecnico] = useState({
        codigo: '',
        nombre: '',
        telefono: ''
    });
    const [editTecnico, setEditTecnico] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchTecnicos();
    }, []);

    const fetchTecnicos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tecnicos');
            setTecnicos(response.data);
        } catch (error) {
            console.error('Error al obtener los técnicos:', error);
        }
    };

    const handleCreateTecnico = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tecnicos', newTecnico);
            setTecnicos([...tecnicos, response.data]);
            setNewTecnico({ nombre: '', codigo: '', telefono: '' });
            setOpenModal(false);
        } catch (error) {
            console.error('Error al crear técnico:', error);
        }
    };

    const handleEditTecnico = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tecnicos/${editTecnico._id}`, editTecnico);
            const updatedTecnicos = tecnicos.map(tecnico =>
                tecnico._id === editTecnico._id ? response.data : tecnico
            );
            setTecnicos(updatedTecnicos);
            setEditTecnico(null);
        } catch (error) {
            console.error('Error al actualizar técnico:', error);
        }
    };

    const handleDeleteTecnico = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tecnicos/${id}`);
            setTecnicos(tecnicos.filter(tecnico => tecnico._id !== id));
        } catch (error) {
            console.error('Error al eliminar técnico:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Técnicos</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
                style={{ marginBottom: '16px' }}
            >
                Agregar Técnico +
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
                        borderRadius: 2
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2" marginBottom={2}>
                    </Typography>
                    <AgregarTecnico
                        newTecnico={newTecnico}
                        setNewTecnico={setNewTecnico}
                        handleCreateTecnico={handleCreateTecnico}
                    />
                </Box>
            </Modal>
            <LeerTecnicos
                tecnicos={tecnicos}
                setEditTecnico={setEditTecnico}
                handleDeleteTecnico={handleDeleteTecnico}
            />
            {editTecnico && (
                <EditarTecnico
                    editTecnico={editTecnico}
                    setEditTecnico={setEditTecnico}
                    handleEditTecnico={handleEditTecnico}
                />
            )}
        </div>
    );
}

export default Tecnicos;
