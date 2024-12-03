import React from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';

function AgregarTecnico({ newTecnico, setNewTecnico, handleCreateTecnico }) {
  return (
    <div>
      <Typography variant="h6" component="h2" gutterBottom>
        <p className='text-center'>Agregar Técnico</p>
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Código"
          variant="outlined"
          type="text"
          value={newTecnico.codigo}
          onChange={(e) => setNewTecnico({ ...newTecnico, codigo: e.target.value })}
          fullWidth
        />
        <TextField
          label="Nombre"
          variant="outlined"
          value={newTecnico.nombre}
          onChange={(e) => setNewTecnico({ ...newTecnico, nombre: e.target.value })}
          fullWidth
        />
        <TextField
          label="Teléfono"
          variant="outlined"
          type="tel"
          value={newTecnico.telefono}
          onChange={(e) => setNewTecnico({ ...newTecnico, telefono: e.target.value })}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTecnico}
          fullWidth
        >
          Agregar Técnico
        </Button>
      </Stack>
    </div>
  );
}

export default AgregarTecnico;
