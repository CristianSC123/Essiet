import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Box,
  Autocomplete,
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

  const usuario = JSON.parse(localStorage.getItem("usuario"));

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
        .filter((item) => item !== null) // Elimina elementos con cantidad <= 0
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
        usuario: usuario._id,
        tecnico: tecnico._id,
        items: carrito.map((item) => ({
          pantalla: item.pantalla._id,
          cantidad: item.cantidad,
          precio: item.pantalla.precio * item.cantidad,
        })),
      };

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
      <Box sx={{ padding: 4, backgroundColor: "white", margin: "auto", width: "50%" }}>
        <h2>Nueva Venta</h2>

        {/* Autocomplete para Técnicos */}
        <Autocomplete
          options={tecnicosOptions}
          getOptionLabel={(option) => option.nombre}
          onInputChange={(e, value) => fetchTecnicos(value)}
          onChange={(e, value) => setTecnico(value)}
          renderInput={(params) => <TextField {...params} label="Buscar Técnico" />}
          sx={{ marginBottom: 2 }}
        />

        {tecnico && <p>Técnico Seleccionado: {tecnico.nombre}</p>}

        {/* Autocomplete para Pantallas */}
        <Autocomplete
          options={pantallasOptions}
          getOptionLabel={(option) => `${option.modelo} (${option.calidad})`}
          onInputChange={(e, value) => fetchPantallas(value)}
          onChange={(e, value) => setPantalla(value)}
          renderInput={(params) => <TextField {...params} label="Buscar Pantalla" />}
          sx={{ marginBottom: 2 }}
        />

        {pantalla && (
          <div>
            <p>
              Modelo: {pantalla.modelo} - Calidad: {pantalla.calidad} - Stock:{" "}
              {pantalla.cantidad}
            </p>
            <Button onClick={handleAgregarAlCarrito}>Agregar al Carrito</Button>
          </div>
        )}

        <h3>Carrito</h3>
        {carrito.map((item) => (
          <div key={item.pantalla._id}>
            <span>{item.pantalla.modelo} (x{item.cantidad})</span>
            <IconButton
              onClick={() => handleCantidadChange(item.pantalla._id, 1)}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() => handleCantidadChange(item.pantalla._id, -1)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEliminarDelCarrito(item.pantalla._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalizarVenta}
          disabled={!tecnico || carrito.length === 0}
        >
          Finalizar Venta
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>
    </Modal>
  );
};

export default NuevaVenta;
