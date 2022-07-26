const app = require('./app');
require('dotenv').config();

const productsController = require('./controllers/productsController');

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

app.post('/sales');

app.get('/sales');

app.get('/sale/:id');

// INICIANDO O PROJETO

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
