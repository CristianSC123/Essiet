// routes/tecnicos.js
const express = require('express');
const router = express.Router();
const Tecnico = require('../models/Tecnico');

router.get('/', async (req, res) => {
  try {
    const tecnicos = await Tecnico.find();
    if (!tecnicos.length) {
      return res.status(404).json({ message: 'No se encontraron técnicos' });
    }
    res.json(tecnicos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los técnicos', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { codigo, nombre, telefono } = req.body;
  if (!codigo || !nombre || !telefono) {
    return res.status(400).json({ message: 'Faltan datos para crear el técnico' });
  }

  const nuevoTecnico = new Tecnico({ codigo, nombre, telefono });

  try {
    const savedTecnico = await nuevoTecnico.save();
    res.status(201).json(savedTecnico);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear técnico', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { codigo, nombre, telefono } = req.body;

  if (!codigo || !nombre || !telefono) {
    return res.status(400).json({ message: 'Faltan datos para actualizar el técnico' });
  }

  try {
    const updatedTecnico = await Tecnico.findByIdAndUpdate(
      req.params.id,
      { codigo, nombre, telefono },
      { new: true }
    );

    if (!updatedTecnico) {
      return res.status(404).json({ message: 'Técnico no encontrado' });
    }

    res.json(updatedTecnico);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar técnico', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTecnico = await Tecnico.findByIdAndDelete(req.params.id);
    if (!deletedTecnico) {
      return res.status(404).json({ message: 'Técnico no encontrado' });
    }
    res.json({ message: 'Técnico eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar técnico', error: error.message });
  }
});

module.exports = router;
