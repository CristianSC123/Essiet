const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { email, apellido, nombre } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, apellido, nombre });
      await user.save();
    }

    res.status(200).json({ message: 'Usuario guardado exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    if (!usuarios.length) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;

  if (!nombre || !apellido || !email || !telefono) {
    return res.status(400).json({ message: 'Faltan datos para actualizar el Usuario' });
  }

  try {
    const updatedUsuario = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, email, telefono },
      { new: true }
    );

    if (!updatedUsuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(updatedUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar usuario', error: error.message });
  }
});

module.exports = router;

