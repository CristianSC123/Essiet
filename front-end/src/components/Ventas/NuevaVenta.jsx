import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Box,
  Autocomplete,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";

const NuevaVenta = ({ open, onClose, onVentaCreada }) => {
  const [carrito, setCarrito] = useState([]);
  const [tecnico, setTecnico] = useState(null);
  const [tecnicosOptions, setTecnicosOptions] = useState([]);
  const [pantalla, setPantalla] = useState(null);
  const [pantallasOptions, setPantallasOptions] = useState([]);
  const [error, setError] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("user"));

  const fetchTecnicos = async (search) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tecnicos?search=${search}`
      );
      setTecnicosOptions(response.data);
    } catch (error) {
      setTecnicosOptions([]);
    }
  };

  const fetchPantallas = async (search) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pantallas?search=${search}`
      );
      setPantallasOptions(response.data);
    } catch (error) {
      setPantallasOptions([]);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (pantalla && pantalla.cantidad > 0) {
      const existente = carrito.find((item) => item.pantalla._id === pantalla._id);

      if (existente) {
        if (existente.cantidad + 1 > pantalla.cantidad) {
          setError("Stock insuficiente para este producto");
          return;
        }
        setCarrito(
          carrito.map((item) =>
            item.pantalla._id === pantalla._id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        );
      } else {
        setCarrito([...carrito, { pantalla, cantidad: 1 }]);
      }

      setPantalla(null);
    } else {
      setError("No se puede agregar al carrito: Stock insuficiente");
    }
  };

  const handleCantidadChange = (pantallaId, delta) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) => {
          if (item.pantalla._id === pantallaId) {
            const nuevaCantidad = item.cantidad + delta;
            if (nuevaCantidad > item.pantalla.cantidad) {
              setError("No hay suficiente stock");
              return item;
            }
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  const handleEliminarDelCarrito = (pantallaId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.pantalla._id !== pantallaId)
    );
  };

  const handleFinalizarVenta = async () => {
    try {
      const ventaData = {
        usuario: usuario[0]._id,
        tecnico: tecnico._id,
        items: carrito.map((item) => ({
          pantalla: item.pantalla._id,
          cantidad: item.cantidad,
          precio: item.pantalla.precio * item.cantidad,
        })),
      };
      console.log("Datos de la venta:", ventaData);
      await axios.post("http://localhost:5000/api/ventas", ventaData);
      setCarrito([]);
      setTecnico(null);
      setError(null);
      onVentaCreada();
      onClose();
    } catch (error) {
      setError("Error al finalizar la venta");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          width: "50%",
          borderRadius: 4,
          boxShadow: 24,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Nueva Venta
        </Typography>

        {/* Autocomplete para Técnicos */}
        <Autocomplete
          options={tecnicosOptions}
          getOptionLabel={(option) => option.nombre}
          onInputChange={(e, value) => fetchTecnicos(value)}
          onChange={(e, value) => setTecnico(value)}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Técnico" sx={{ marginBottom: 3 }} />
          )}
        />

        {tecnico && <Typography variant="subtitle1">Técnico Seleccionado: {tecnico.nombre}</Typography>}

        {/* Autocomplete para Pantallas */}
        <Autocomplete
          options={pantallasOptions}
          getOptionLabel={(option) => `${option.modelo} (${option.calidad})`}
          onInputChange={(e, value) => fetchPantallas(value)}
          onChange={(e, value) => setPantalla(value)}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Pantalla" sx={{ marginBottom: 3 }} />
          )}
        />

        {pantalla && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography>
              Modelo: {pantalla.modelo} - Calidad: {pantalla.calidad} - Stock: {pantalla.cantidad}
            </Typography>
            <Button onClick={handleAgregarAlCarrito} sx={{ marginTop: 1 }}>
              Agregar al Carrito
            </Button>
          </Box>
        )}

        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Carrito
        </Typography>
        {carrito.map((item) => (
          <Box key={item.pantalla._id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Typography sx={{ flex: 1 }}>
              {item.pantalla.modelo} (x{item.cantidad}) - Precio: Bs
              {item.pantalla.precio * item.cantidad}
            </Typography>
            <IconButton onClick={() => handleCantidadChange(item.pantalla._id, 1)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => handleCantidadChange(item.pantalla._id, -1)}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleEliminarDelCarrito(item.pantalla._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalizarVenta}
          disabled={!tecnico || carrito.length === 0}
          sx={{ marginTop: 3 }}
        >
          Finalizar Venta
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Modal>
  );
};

export default NuevaVenta;
