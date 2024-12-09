import React from 'react';
import { Modal, Box, TextField, Button, Typography, Stack } from '@mui/material';
import Swal from 'sweetalert2';


function EditarUsuario({ editUsuario, setEditUsuario, handleEditUsuario }) {
  const handleSaveWithAlert = () => {
    handleEditUsuario();
    setEditUsuario(null);
  };

  return (
    <Modal
      open={!!editUsuario}
      onClose={() => setEditUsuario(null)}
      aria-labelledby="modal-editar-usuario"
      aria-describedby="modal-editar-usuario-descripcion"
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
        <Typography id="modal-editar-usuario" variant="h6" component="h2" gutterBottom>
          Editar Usuario
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nombre"
            value={editUsuario.nombre}
            onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
            fullWidth
          />
          <TextField
            label="Apellidos"
            value={editUsuario.apellido}
            onChange={(e) => setEditUsuario({ ...editUsuario, apellido: e.target.value })}
            fullWidth
          />
          <TextField
            label="Correo Electrónico"
            value={editUsuario.email}
            onChange={(e) => setEditUsuario({ ...editUsuario, email: e.target.value })}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (!editUsuario.nombre || !editUsuario.apellido || !editUsuario.email) {
                  Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
                } else {
                  handleSaveWithAlert();
                }
              }}
              fullWidth
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditUsuario(null)}
              fullWidth
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default EditarUsuario;
