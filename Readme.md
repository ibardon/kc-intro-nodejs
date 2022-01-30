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

No realizado

* Filtro por precio (con precio mayor o igual a 50):
No realizado

* Ordenación:

- localhost:3000/api/anuncios?sort=price

# Documentacion

Swagger Está montado y a medias

- localhost:3000/api-docs

# Notas

No he sabido hacer ni el max ni el min de precios
Tampoco la busqueda de texto en la URL
Ni la inserción en página web, porque ya no me daba tiempo.
