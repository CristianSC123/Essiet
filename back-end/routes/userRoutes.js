const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { email, family_name, given_name } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, family_name, given_name });
      await user.save();
    }

    res.status(200).json({ message: 'Usuario guardado exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

module.exports = router;
