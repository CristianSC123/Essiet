const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { email, apellido, nombre } = req.body;

    if (!email || !apellido || !nombre) {
      return res.status(400).json({ message: 'Faltan datos para crear el usuario' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'El usuario ya existe', user });
    }

    user = new User({ email, apellido, nombre });
    await user.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    if (!usuarios.length) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, apellido, email } = req.body;

  if (!nombre || !apellido || !email) {
    return res.status(400).json({ message: 'Faltan datos para actualizar el usuario' });
  }

  try {
    const updatedUsuario = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, email },
      { new: true, runValidators: true }
    );

    if (!updatedUsuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente', updatedUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUsuario = await User.findByIdAndDelete(req.params.id);

    if (!deletedUsuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    const usuario = await User.findOne({ email: req.params.email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario por email', error: error.message });
  }
});

module.exports = router;
