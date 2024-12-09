import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function LeerUsuarios({ usuarios, setEditUsuario, handleDeleteUsuario }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#033D68' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Apellidos</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario._id}>
              <TableCell align="center">{usuario.nombre}</TableCell>
              <TableCell align="center">{usuario.apellido}</TableCell>
              <TableCell align="center">{usuario.email}</TableCell>
              <TableCell align="center">
                <Button onClick={() => setEditUsuario(usuario)} 
                variant="outlined" 
                color="primary" 
                startIcon={<EditIcon/>}>
                  Editar
                </Button>
                <Button
                  onClick={() => handleDeleteUsuario(usuario._id)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<DeleteIcon />}
                  style={{ marginLeft: '8px' }}
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

export default LeerUsuarios;
