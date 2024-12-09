const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const Pantalla = require("../models/Pantalla");
const User = require("../models/User")
const Tecnico = require("../models/Tecnico")
router.post("/", async (req, res) => {
  try {
    const { usuario, tecnico, items } = req.body;

    if (!usuario || !tecnico || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Datos incompletos. Asegúrate de enviar usuario, técnico e items.",
      });
    }

    const usuarioExiste = await User.findById(usuario);
    const tecnicoExiste = await Tecnico.findById(tecnico);

    if (!usuarioExiste || !tecnicoExiste) {
      return res.status(404).json({
        message: "Usuario o técnico no encontrados.",
      });
    }

    const total = items.reduce((sum, item) => {
      if (!item.pantalla || !item.cantidad || !item.precio) {
        throw new Error("Cada item debe incluir pantalla, cantidad y precio.");
      }
      return sum + item.precio;
    }, 0);

    const nuevaVenta = new Venta({
      usuario,
      tecnico,
      items: items.map((item) => ({
        pantalla: item.pantalla,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total,
    });

    const ventaGuardada = await nuevaVenta.save();

    res.status(201).json({
      message: "Venta creada con éxito",
      venta: ventaGuardada,
    });
  } catch (error) {
    console.error("Error al crear la venta:", error.message);
    res.status(500).json({
      message: "Error al crear la venta",
      error: error.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("usuario", "nombre email")
      .populate("tecnico", "nombre")
      .populate("items.pantalla", "modelo calidad precio");

    const ventasFiltradas = ventas.filter((venta) => venta.tecnico && venta.usuario);

    const ventasConFechasFormateadas = ventasFiltradas.map((venta) => ({
      ...venta._doc,
      createdAt: venta.createdAt ? venta.createdAt.toLocaleString("es-ES") : null,
      updatedAt: venta.updatedAt ? venta.updatedAt.toLocaleString("es-ES") : null,
    }));

    res.status(200).json(ventasConFechasFormateadas);
  } catch (error) {
    console.error("Error al obtener ventas:", error.message);
    res.status(500).json({
      message: "Error al obtener ventas",
      error: error.message,
    });
  }
});


module.exports = router;