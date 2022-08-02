const app = require('./app');
require('dotenv').config();

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.get('/products/search', productsController.getByQuery);

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.post('/sales');

app.get('/sales', salesController.getAllSales);

app.get('/sales/:id', salesController.getById);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.remove);

app.delete('/sales/:id', salesController.remove);

app.put('/sales/id');

// INICIANDO O PROJETO

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
