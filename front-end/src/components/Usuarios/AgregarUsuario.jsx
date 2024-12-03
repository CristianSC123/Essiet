import React from 'react';
import { TextField, Button, Stack } from '@mui/material';

function AgregarUsuario({ newUsuario, setNewUsuario, handleCreateUsuario }) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Código"
        value={newUsuario.codigo}
        onChange={(e) => setNewUsuario({ ...newUsuario, codigo: e.target.value })}
        fullWidth
      />
      <TextField
        label="Nombre"
        value={newUsuario.nombre}
        onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
        fullWidth
      />
      <TextField
        label="Teléfono"
        value={newUsuario.telefono}
        onChange={(e) => setNewUsuario({ ...newUsuario, telefono: e.target.value })}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleCreateUsuario}>
        Agregar Usuario
      </Button>
    </Stack>
  );
}

export default AgregarUsuario;
