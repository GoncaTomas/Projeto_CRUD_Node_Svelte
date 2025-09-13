<script>

    import { onMount } from 'svelte';

    let produtos = [];

    onMount(async () => {
        const response = await fetch('/api/produtos');
        produtos = await response.json();
    });    
    
</script>

<h1>Lista de Produtos</h1>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Cor</th>
      <th>Unidades</th>
      <th>Preço (€)</th>
    </tr>
  </thead>
  <tbody>
    {#each produtos as produto}
      <tr>
        <td>{produto.id_produto}</td>
        <td>{produto.nome_produto}</td>
        <td>{produto.cor_produto}</td>
        <td>{produto.quantidade_produto}</td>
        <td>{produto.preco_produto}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #01121d;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  font-weight: 600;
  color: #dee2e6;
}

tr:hover {
  background-color: #01121d;
  transition: background-color 0.2s ease-in-out;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0689e0;
  text-align: center;
}

body {
  background-color: #5f0a3c;
  padding: 2rem;
}
</style>
