
const mongoose = require("mongoose");


const tecnicoSchema = new mongoose.Schema(
  {
    codigo: { type: Number, required: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
  },
  {
    collection: "tecnicos",
  }
);

const Tecnico = mongoose.model("Tecnico", tecnicoSchema);

module.exports = Tecnico;
