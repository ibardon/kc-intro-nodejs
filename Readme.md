- generado con express
  express nodepop --ejs
  npm install
  npm install cross-env
  npm install http-errors
  npm install mongoose
  npm install express-validator

# Inicializar App

npm run initdb

# Iniciar proyecto

npm run start

# Lista de anuncios:

- localhost:3000/api/anuncios

# Ejemplo Filtros:

- localhost:3000/api/anuncios?tag=mobile&forSale=false&name=Taza&price=50-&start=0&limit=2&sort=price

# Ejemplo Paginación:

- localhost:3000/api/anuncios?skip=2&limit=2

* Filtro por tag:

- localhost:3000/api/anuncios?tag=mobile

* Filtro por producto en venta/búsqueda:

- localhost:3000/api/anuncios?forSale=false

* Filtro por nombre (por ejemplo productos que empiezan por ip):

- localhost:3000/api/anuncios?&name=ip

* Filtro por precio (con precio mayor o igual a 50):

- localhost:3000/api/anuncios?price=50-

* Filtro por precio (con precio menor o igual a 50):

- localhost:3000/api/anuncios?price=-50

* Filtro por precio (con precios entre 50 y 250):

- localhost:3000/api/anuncios?price=50-250

* Filtro por precio (con precio igual a 50):

- localhost:3000/api/anuncios?price=50

* Ordenación:

- localhost:3000/api/anuncios?sort=price

Lista de tags:

- /api/anuncios/tags

# Documentacion

Swagger

- localhost:3000//api-docs

# Notas

No he sabido hacer ni el max ni el min de precios
Tampoco la busqueda de URL
Ni la inserción en página web.
