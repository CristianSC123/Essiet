import React from 'react';
import { TextField, Button } from '@mui/material';

function AgregarPantalla({ newPantalla, setNewPantalla, handleCreatePantalla }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPantalla({ ...newPantalla, [name]: value });
    };

    return (
        <form>
            <TextField
                label="Código"
                name="codigo"
                value={newPantalla.codigo}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Modelo"
                name="modelo"
                value={newPantalla.modelo}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Precio"
                name="precio"
                type="number"
                value={newPantalla.precio}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Cantidad"
                name="cantidad"
                type="number"
                value={newPantalla.cantidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Calidad"
                name="calidad"
                value={newPantalla.calidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleCreatePantalla} fullWidth>
                Agregar
            </Button>
        </form>
    );
}

export default AgregarPantalla;
