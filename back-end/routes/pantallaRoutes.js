// routes/pantallas.js
const express = require('express');
const router = express.Router();
const Pantalla = require('../models/Pantalla');

router.get('/', async (req, res) => {
  try {
    const pantallas = await Pantalla.find();
    if (!pantallas.length) {
      return res.status(404).json({ message: 'No se encontraron pantallas' });
    }
    res.json(pantallas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las pantallas', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { codigo, modelo, precio, cantidad, calidad } = req.body;

  if (!codigo || !modelo || !precio || !cantidad || !calidad) {
    return res.status(400).json({ message: 'Faltan datos para crear la pantalla' });
  }

  const nuevaPantalla = new Pantalla({ codigo, modelo, precio, cantidad, calidad });

  try {
    const savedPantalla = await nuevaPantalla.save();
    res.status(201).json(savedPantalla);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear pantalla', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { codigo, modelo, precio, cantidad, calidad } = req.body;

  if (!codigo || !modelo || !precio || !cantidad || !calidad) {
    return res.status(400).json({ message: 'Faltan datos para actualizar la pantalla' });
  }

  try {
    const updatedPantalla = await Pantalla.findByIdAndUpdate(
      req.params.id,
      { codigo, modelo, precio, cantidad, calidad },
      { new: true }
    );

    if (!updatedPantalla) {
      return res.status(404).json({ message: 'Pantalla no encontrada' });
    }

    res.json(updatedPantalla);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar pantalla', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPantalla = await Pantalla.findByIdAndDelete(req.params.id);
    if (!deletedPantalla) {
      return res.status(404).json({ message: 'Pantalla no encontrada' });
    }
    res.json({ message: 'Pantalla eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar pantalla', error: error.message });
  }
});

module.exports = router;
