import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/book.routes.js";
import bodyParser from "body-parser";
config();

// Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()); //Parseador de bodies

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

app.use("/books", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
