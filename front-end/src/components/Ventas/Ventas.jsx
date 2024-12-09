import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import NuevaVenta from "./NuevaVenta";
import axios from "axios";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ventas");
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener ventas", error);
      }
    };

    fetchVentas();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    // Refresh ventas después de una nueva venta
    const fetchVentas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ventas");
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener ventas", error);
      }
    };
    fetchVentas();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Nueva Venta
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#033D68" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Usuario</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Total</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.map((venta) => (
              <TableRow key={venta._id}>
                <TableCell>{new Date(venta.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{venta.tecnico.nombre}</TableCell>
                <TableCell>{venta.usuario.nombre}</TableCell>
                <TableCell>{venta.total}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    Ver Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <NuevaVenta open={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Ventas;
