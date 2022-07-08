const app = require('./app');
require('dotenv').config();

const productsController = require('./controllers/productsController');

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

// INICIANDO O PROJETO

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
