const mongoose = require("mongoose");

const pantallaSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true },
    modelo: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    calidad: { 
      type: String, 
      required: true, 
      enum: ['Incell', 'Oled', 'Original'],
    },
  },
  { timestamps: true },
  {
    collection: "pantallas",
  }
);

const Pantalla = mongoose.model("Pantalla", pantallaSchema);
module.exports = Pantalla
