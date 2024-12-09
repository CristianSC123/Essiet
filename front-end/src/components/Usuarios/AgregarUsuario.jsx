import React from 'react';
import { TextField, Button, Stack } from '@mui/material';

function AgregarUsuario({ newUsuario, setNewUsuario, handleCreateUsuario }) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Nombre"
        value={newUsuario.nombre}
        onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
        fullWidth
      />
      <TextField
        label="Apellido"
        value={newUsuario.apellido}
        onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
        fullWidth
      />
      <TextField
        label="Email"
        value={newUsuario.email}
        onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleCreateUsuario}>
        Agregar Usuario
      </Button>
    </Stack>
  );
}

export default AgregarUsuario;
