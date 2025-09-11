const express = require('express'); // Importa o framework Express (facilita a criação de servidores e APIs)

const cors = require('cors'); // Importa o middleware CORS (front-end comunica com back-end mesmo em diferentes domínios)

const app = express(); // Cria uma aplicação Express

const produtos_Rota = require('./routes/produtos'); // Importa as rotas de produtos 

app.use(cors()); // Ativa o CORS para que seja possivel fazer pedidos à API

app.use(express.json()); // Permite que a aplicação entenda JSON no corpo das requisições

app.use('/api/produtos', produtos_Rota); // Liga as rotas à API

const PORT = 3000; // Define a porta do servidor
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
