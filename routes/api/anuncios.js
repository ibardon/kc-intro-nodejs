"use strict";

const express = require("express");
const createError = require("http-errors");
const Anuncio = require("../../models/Anuncio");

const router = express.Router();

// GET /api/anuncios FILTRADOS
// Devuelve una lista de anuncios
router.get("/", async (req, res, next) => {
  try {
    // filtros campos modelo
    const name = req.query.name;
    const price = req.query.price;
    const tags = req.query.tags;
    const user = req.query.user;
    const shell = req.query.shell;
    // paginaciones
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;

    const filtros = {};

    if (name) {
      filtros.name = name;
    }

    if (price) {
      filtros.price = price;
    }

    if (minPrice) {
      filtros.minPrice = minPrice;
    }

    if (maxPrice) {
      filtros.maxPrice = maxPrice;
    }

    if (tags) {
      filtros.tags = tags;
    }

    if (user) {
      filtros.user = user;
    }

    if (shell) {
      filtros.shell = shell;
    }

    const anuncios = await Anuncio.lista(filtros, skip, limit, select, sort);

    console.log(anuncios);

    res.json({ results: anuncios });
  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios/:id
// Devuelve un anuncio

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let anuncio;
    try {
      anuncio = await Anuncio.findOne({ _id: id });
    } catch (err) {
      if (!anuncio) {
        next(createError(404, "sa matao"));
        return;
      }
    }
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});
/////////////////////////////////////////////////////////////////////////////

// METODOS POST

// POST /api/anuncios
// Crea un nuevo anuncio
// FIXME La subida de imágenes no funciona ES UN OPCIONAL
router.post("/", async (req, res, next) => {
  try {
    const anuncioData = req.body;

    // creo un objeto de anuncio EN MEMORIA
    const anuncio = new Anuncio(anuncioData);

    const anuncioGuardado = await anuncio.save();

    res.status(201).json({ result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

/////////////////////////////////////////////////////////////////////////////

// PUT /api/anuncios:id
// Actualizar un anuncio
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncioData = req.body;

    let anuncioActualizado;
    try {
      anuncioActualizado = await Anuncio.findByIdAndUpdate(id, anuncioData, {
        new: true, // esta opción sirve para que nos devuelva el estado final del documento
      });
    } catch (err) {
      next(createError(422, "invalid id"));
      return;
    }

    if (!anuncioActualizado) {
      next(createError(404, "sa matao"));
      return;
    }

    res.json({ result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

/////////////////////////////////////////////////////////////////////////////

// DELETE /api/anuncios/:id
// Elimina un anuncio

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Anuncio.deleteOne({ _id: id });

    // res.json();
    res.status(200).json(["El siguiente ID ha sido borrado:", id]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
