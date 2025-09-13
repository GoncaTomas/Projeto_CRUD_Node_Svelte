<script>
  let id_produto = null;
  let nome = '';
  let cor = '';
  let quantidade ;
  let preco ;

  let mensagem = '';

  async function atualizarProduto() {
    const response = await fetch(`/api/produtos/${id_produto}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        nome_produto: nome || undefined,
        cor_produto: cor || undefined,
        quantidade_produto: quantidade !== undefined ? quantidade : undefined,
        preco_produto: preco !== undefined ? preco : undefined,
      })
      //Como o JSON.stringify ignora os campos com valor undefined, isto garante que apenas os campos preenchidos pelo utilizador serão enviados na requisição.
    });

    const resultado = await response.json();
    mensagem = resultado.mensagem;

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar produto.');
    }
  }
  
</script>

<h1>Atualizar Produto</h1>

<form on:submit|preventDefault={atualizarProduto}>
  <h3>ID do Produto: <input type="number" bind:value={id_produto} required min="1" /></h3>

  <h3>Nome: <input type="text" bind:value={nome} placeholder="Novo nome (opcional)" /></h3>

  <h3>Cor: <input type="text" bind:value={cor} placeholder="Nova cor (opcional)" /></h3>

  <h3>Quantidade: <input type="number" bind:value={quantidade} placeholder="Nova quantidade (opcional)" /></h3>

  <h3>Preço (€): <input type="number" step="0.01" bind:value={preco} placeholder="Novo preço (opcional)" /></h3>

  <button type="submit">💾 Gravar Alterações</button>
</form>

{#if mensagem}
  <p><strong>{mensagem}</strong></p>
{/if}