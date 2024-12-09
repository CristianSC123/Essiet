const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    tecnico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tecnicos",
      required: true,
    },
    items: [
      {
        pantalla: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pantallas",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venta", ventaSchema);