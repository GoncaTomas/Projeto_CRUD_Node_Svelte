const express = require('express'); // Para criar rotas HTTP
const router = express.Router(); // Este router vai guardar as rotas relacionadas a produtos (criação, listagem, atualização, exclusão)
const database = require('../DataBase'); // Importa a conexão com a base de dados



// Rota para criar um novo produto
router.post('/', (req, res) => {
    const { nome_produto, cor_produto, quantidade_produto, preco_produto } = req.body;
    const query_sql = 'INSERT INTO produtos (nome_produto, cor_produto, quantidade_produto, preco_produto) VALUES (?, ?, ?, ?)';
    database.query(query_sql, [nome_produto, cor_produto, quantidade_produto, preco_produto], (err, results) => {
        if (err) {
            console.error('Erro ao criar produto:', err); // Erro no terminal
            return res.status(500).json({mensagem: 'Ocorreu um erro na inserção do produto'}); // Erro na resposta da API
        }
        res.status(201).json({
            mensagem: 'Produto criado com sucesso!',
            id_produto: results.insertId // Retorna o ID gerado automaticamente
    });
  });
});


// Rota para listar todos os produtos
router.get('/', (req, res) => {
    const query_sql = 'SELECT * FROM produtos';
    database.query(query_sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar produtos:', err); // Erro no terminal
            return res.status(500).json({mensagem: 'Ocorreu um erro ao listar os produtos'}); // Erro na resposta da API
        }
        let html = `
      <h1>Lista de Produtos</h1>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Cor</th>
          <th>Quantidade</th>
          <th>Preço</th>
        </tr>
    `;

    results.forEach(produto => {
      html += `
        <tr>
          <td>${produto.id_produto}</td>
          <td>${produto.nome_produto}</td>
          <td>${produto.cor_produto}</td>
          <td>${produto.quantidade_produto}</td>
          <td>${produto.preco_produto}</td>
        </tr>
      `;
    });

    html += '</table>';
    res.send(html);
  });
});



// Rota para atualizar um produto
router.put('/:id', (req, res) => {
    const id_produto = req.params.id;
    const { nome_produto, cor_produto, quantidade_produto, preco_produto } = req.body;
    const query_sql = 'UPDATE produtos SET nome_produto = ?, cor_produto = ?, quantidade_produto = ?, preco_produto = ? WHERE id_produto = ?';
    database.query(query_sql, [nome_produto, cor_produto, quantidade_produto, preco_produto, id_produto], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err); // Erro no terminal
            return res.status(500).json({mensagem: 'Ocorreu um erro na atualização do produto'}); // Erro na resposta da API
        }
        if (results.affectedRows === 0) { // Caso não seja encontrado o ID do produto
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
  });
});


// Rota para eliminar um produto
router.delete('/:id', (req, res) => {
    const id_produto = req.params.id;
    const query_sql = 'DELETE FROM produtos WHERE id_produto = ?';
    database.query(query_sql, [id_produto], (err, results) => {
        if (err) {
            console.error('Erro ao eliminar produto:', err); // Erro no terminal
            return res.status(500).json({mensagem: 'Ocorreu um erro ao tentar eliminar o produto'}); // Erro na resposta da API
        }
        if (results.affectedRows === 0) { // Caso não seja encontrado o ID do produto
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Produto eliminado com sucesso!' });
  });
});


module.exports = router; // Exporta o router para ser usado em app.js