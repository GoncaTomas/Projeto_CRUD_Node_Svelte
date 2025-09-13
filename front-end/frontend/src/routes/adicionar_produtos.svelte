<script>

    let nome_produto = '';
    let cor_produto = '';
    let quantidade_produto = 0;
    let preco_produto = 0.0;

    let mensagem = '';

    async function adicionarProduto() {
        const response = await fetch('/api/produtos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nome_produto,
                cor_produto,
                quantidade_produto,
                preco_produto,
            })
        });

        const resultado = await response.json();
        mensagem = resultado.mensagem;

        if (response.ok) {
            alert('Produto adicionado com sucesso!');
        } else {
            alert('Erro ao adicionar produto.');
        }
    }
    
</script>

<h1>Adicionar Produto</h1>
<form on:submit|preventDefault={adicionarProduto}>
    <h3>Nome:   <input type="text" bind:value={nome_produto} required /></h3>
    <h3>Cor:    <input type="text" bind:value={cor_produto} required /></h3>
    <h3>Quantidade: <input type="number" bind:value={quantidade_produto} required min="0" /></h3>
    <h3>Preço (€):  <input type="number" step="0.01" bind:value={preco_produto} required min="0" /></h3>
    <button type="submit">➕ Adicionar Produto</button>
</form>

    <p>{mensagem}</p>

