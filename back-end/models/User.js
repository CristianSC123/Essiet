const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
  },
  { collection: "usuarios" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
