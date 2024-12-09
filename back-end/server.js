const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

const userRoutes = require('./routes/userRoutes');
const tecnicosRoutes = require("./routes/tecnicoRoutes")
const pantallaRoutes = require("./routes/pantallaRoutes")
const ventaRoutes = require("./routes/ventaRoutes");

app.use('/api/users', userRoutes);
app.use('/api/tecnicos', tecnicosRoutes )
app.use('/api/pantallas', pantallaRoutes)
app.use("/api/ventas", ventaRoutes);


app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
