import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import Swal from 'sweetalert2';

function EditarTecnico({ editTecnico, setEditTecnico, handleEditTecnico }) {
  
  const handleSaveWithAlert = () => {
    handleEditTecnico();
    Swal.fire({
      icon: 'success',
      title: '¡Realizado!',
      text: 'Los cambios del técnico han sido guardados exitosamente.',
      confirmButtonText: 'Aceptar',
    });

    setEditTecnico(null); // Cerrar el modal después de guardar
  };

  return (
    <Modal
      open={!!editTecnico}
      onClose={() => setEditTecnico(null)}
      aria-labelledby="modal-editar-tecnico"
      aria-describedby="modal-editar-tecnico-descripcion"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-editar-tecnico"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Técnico
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Nombre"
            variant="outlined"
            value={editTecnico.nombre}
            onChange={(e) =>
              setEditTecnico({ ...editTecnico, nombre: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            type="tel"
            value={editTecnico.telefono}
            onChange={(e) =>
              setEditTecnico({ ...editTecnico, telefono: e.target.value })
            }
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveWithAlert} // Llamar la nueva función con la alerta
              fullWidth
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditTecnico(null)}
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

export default EditarTecnico;
