const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('express-async-errors');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

app.get('/products/search', productsController.getByQuery);

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.post('/sales');

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.remove);

app.delete('/sales/:id', salesController.remove);

app.put('/sales/id');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;