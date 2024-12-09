const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");

// Obtener todas las ventas
router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("usuario", "nombre")
      .populate("tecnico", "nombre")
      .populate("items.pantalla", "modelo");
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
});

// Crear una nueva venta
router.post("/", async (req, res) => {
  try {
    const { usuario, tecnico, items } = req.body;

    const total = items.reduce((sum, item) => sum + item.precio, 0);

    const nuevaVenta = new Venta({ usuario, tecnico, items, total });
    const ventaGuardada = await nuevaVenta.save();

    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la venta", error });
  }
});

module.exports = router;
