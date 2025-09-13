<script>
  let id_produto = null;

  let mensagem = '';

  async function eliminarProduto() {
    const response = await fetch(`/api/produtos/${id_produto}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    const resultado = await response.json();
    mensagem = resultado.mensagem;

    if (response.ok) {
      alert('Produto eliminado com sucesso!');
    } else {
      alert('Erro ao eliminar produto.');
    }
  }
  
</script>

<h1>Eliminar Produto</h1>

<form on:submit|preventDefault={eliminarProduto}>
  <h3>ID do Produto: <input type="number" bind:value={id_produto} required min="1" /></h3>
  <button type="submit">🗑️ Eliminar Produto</button>
</form>

{#if mensagem}
  <p><strong>{mensagem}</strong></p>
{/if}