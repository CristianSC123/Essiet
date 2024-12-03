import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function LeerTecnicos({ tecnicos, setEditTecnico, handleDeleteTecnico }) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead sx={{ backgroundColor: '#033D68' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Código</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Nombre</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Teléfono</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tecnicos.map((tecnico) => (
            <TableRow key={tecnico._id}>
              <TableCell sx={{ textAlign: 'center' }}>{tecnico.codigo}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{tecnico.nombre}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{tecnico.telefono}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    style={{ marginRight: '8px' }}
                    onClick={() => setEditTecnico(tecnico)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ marginRight: '8px' }}
                    onClick={() => handleDeleteTecnico(tecnico._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LeerTecnicos;
