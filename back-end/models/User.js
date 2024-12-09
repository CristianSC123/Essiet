const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "El campo 'email' es obligatorio"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, ingresa un email válido",
      ],
    },
    apellido: {
      type: String,
      required: [true, "El campo 'apellido' es obligatorio"],
    },
    nombre: {
      type: String,
      required: [true, "El campo 'nombre' es obligatorio"],
    },
  },
  { collection: "usuarios", timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
