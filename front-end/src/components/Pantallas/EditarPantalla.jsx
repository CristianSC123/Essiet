import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

function EditarPantalla({ editPantalla, setEditPantalla, handleEditPantalla }) {
  const handleSaveWithAlert = () => {
    handleEditPantalla();
    setEditPantalla(null);
  };

  return (
    <Modal
      open={!!editPantalla}
      onClose={() => setEditPantalla(null)}
      aria-labelledby="modal-editar-pantalla"
      aria-describedby="modal-editar-pantalla-descripcion"
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
          id="modal-editar-pantalla"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Editar Pantalla
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Código"
            variant="outlined"
            value={editPantalla.codigo}
            onChange={(e) =>
              setEditPantalla({ ...editPantalla, codigo: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Modelo"
            variant="outlined"
            value={editPantalla.modelo}
            onChange={(e) =>
              setEditPantalla({ ...editPantalla, modelo: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Precio"
            variant="outlined"
            type="number"
            value={editPantalla.precio}
            onChange={(e) =>
              setEditPantalla({ ...editPantalla, precio: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Cantidad"
            variant="outlined"
            type="number"
            value={editPantalla.cantidad}
            onChange={(e) =>
              setEditPantalla({ ...editPantalla, cantidad: e.target.value })
            }
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="calidad-label">Calidad</InputLabel>
            <Select
              labelId="calidad-label"
              id="calidad"
              value={editPantalla.calidad}
              onChange={(e) =>
                setEditPantalla({ ...editPantalla, calidad: e.target.value })
              }
              label="Calidad"
            >
              <MenuItem value="Incell">Incell</MenuItem>
              <MenuItem value="Oled">Oled</MenuItem>
              <MenuItem value="Original">Original</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveWithAlert}
              fullWidth
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditPantalla(null)}
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

export default EditarPantalla;
