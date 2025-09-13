const express = require('express'); // Para criar rotas HTTP
const router = express.Router(); // Este router vai guardar as rotas relacionadas a produtos (criação, listagem, atualização, exclusão)
const database = require('../DataBase'); // Importa a conexão com a base de dados



// Rota para adicionar um novo produto
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
    res.json(results); // devolve os dados como JSON

  });
});


// Rota para atualizar um produto
router.put('/:id', (req, res) => {
  const id_produto = req.params.id;
  const dadosNovos = req.body;

  // Procurar dados atuais
  const procurar_sql = 'SELECT * FROM produtos WHERE id_produto = ?';  // Aqui o back-end tem acesso ao estado atual do produto antes de alterá-lo
  database.query(procurar_sql, [id_produto], (err, resultado) => {
    if (err) {
      console.error('Erro ao procurar produto:', err);
      return res.status(500).json({ mensagem: 'Erro ao procurar produto.' });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    const produtoAtual = resultado[0];

    // Agregar os dados verificando quais foram alterados
    // Se o campo não for fornecido na requisição (pelo Front-End), isto garante que o valor atual é mantido
    const nome = dadosNovos.nome_produto ?? produtoAtual.nome_produto;
    const cor = dadosNovos.cor_produto ?? produtoAtual.cor_produto;
    const quantidade = dadosNovos.quantidade_produto ?? produtoAtual.quantidade_produto;
    const preco = dadosNovos.preco_produto ?? produtoAtual.preco_produto;

    // Atualizar na base de dados
    const atualizar_sql = `
      UPDATE produtos SET 
        nome_produto = ?, 
        cor_produto = ?, 
        quantidade_produto = ?, 
        preco_produto = ?
      WHERE id_produto = ?
    `;

    database.query(atualizar_sql, [nome, cor, quantidade, preco, id_produto], (err2, resultado2) => {
      if (err2) {
        console.error('Erro ao atualizar produto:', err2);
        return res.status(500).json({ mensagem: 'Erro ao atualizar produto.' });
      }

      if (resultado2.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado para atualização.' });
      }

      res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
    });
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