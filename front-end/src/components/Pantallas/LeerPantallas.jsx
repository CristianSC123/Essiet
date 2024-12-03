import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function LeerPantallas({ pantallas, setEditPantalla, handleDeletePantalla }) {
    return (
        <Table>
            <TableHead sx={{ backgroundColor: '#033D68' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Código</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Modelo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Precio</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Cantidad</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Calidad</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pantallas.map((pantalla) => (
                    <TableRow key={pantalla._id}>
                        <TableCell sx={{textAlign: 'center'}}>{pantalla.codigo}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{pantalla.modelo}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{pantalla.precio}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{pantalla.cantidad}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{pantalla.calidad}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setEditPantalla(pantalla)}
                                startIcon={<EditIcon />}
                                style={{ marginRight: '8px' }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeletePantalla(pantalla._id)}
                            >
                                Eliminar
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default LeerPantallas;
