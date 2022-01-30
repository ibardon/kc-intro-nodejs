"use strict";

const mongoose = require("mongoose");

// definir un esquema
const anunciosSchema = mongoose.Schema({
  name: { type: String, index: true },
  shell: { type: Boolean, index: true },
  price: { type: Number, min: 0, index: true },
  photo: String,
  user: { type: String, index: true },
  tags: { type: Array, index: true },
});

// creamos método estático (del modelo)
anunciosSchema.statics.lista = function (filtros, skip, limit, select, sort) {
  const query = Anuncio.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
};

// creo el modelo con ese esquema
const Anuncio = mongoose.model("Anuncio", anunciosSchema);

// opcional - exporto el modelo
module.exports = Anuncio;
