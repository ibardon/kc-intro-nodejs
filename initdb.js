"use strict";

// conexión a la BBDD
const dbConnection = require("./lib/connectMongose.js");
const anunciosData = require("./initDB.anuncios.json");

// Carga de modelos

const Anuncios = require("./models/Anuncio.js");

dbConnection.once("open", () => {
  main().catch((err) => console.log("Hubo un error", err));
});

async function main() {
  // inicializo anuncios
  await initAnuncios();

  // desconecto BBDD
  dbConnection.close();
}

main().catch((err) => console.log("Hubo un error", err));

async function initAnuncios() {
  // primero borro lo existente
  const vaciado = await Anuncios.deleteMany();
  console.log(`Eliminados ${vaciado.deleteCoint} anuncios.`);

  // cargo anuncios iniciales
  const anuncios = await Anuncios.insertMany(anunciosData);
  console.log(`Creados ${anuncios.length} anuncios.`);
}
