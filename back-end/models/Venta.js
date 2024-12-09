const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tecnico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tecnico",
      required: true,
    },
    items: [
      {
        pantalla: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pantalla",
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