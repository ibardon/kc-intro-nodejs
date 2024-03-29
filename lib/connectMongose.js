const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión con la BBDD de MongoDB", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en la BD:", mongoose.connection.name);
});

mongoose.connect("mongodb://localhost/nodepopdb");

module.exports = mongoose.connection;
