<script>
  import Router from 'svelte-spa-router';
  import ListarProdutos from './routes/listar_produtos.svelte';
  import AdicionarProduto from './routes/adicionar_produtos.svelte';
  import AtualizarProduto from './routes/atualizar_produtos.svelte';
  import EliminarProduto from './routes/eliminar_produtos.svelte';

   const routes = {
    '/': ListarProdutos,
    '/adicionar': AdicionarProduto,
    '/atualizar': AtualizarProduto,
    '/eliminar': EliminarProduto
  };

</script>

<nav>
  <button on:click={() => window.location.hash = '#/'}>📦 Ver Produtos</button>
  <button on:click={() => window.location.hash = '#/adicionar'}>➕ Adicionar</button>
  <button on:click={() => window.location.hash = '#/atualizar'}>✏️ Atualizar</button>
  <button on:click={() => window.location.hash = '#/eliminar'}>🗑️ Eliminar</button>
</nav>

<Router {routes} />

