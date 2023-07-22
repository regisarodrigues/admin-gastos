<script setup>
defineProps(['filtro']);
defineEmits(['update:filtro']);
</script>

<template>
  <div class="filtro sombra conteudo">
    <form>
      <div class="campo">
        <label for="filtro">Filtrar Gastos</label>
        <select id="filtro" :value="filtro" @input="$emit('update:filtro', $event.target.value)">
          <option value="">-- Selecione --</option>
          <option value="poupanca">Poupança</option>
          <option value="alimentacao">Alimentação</option>
          <option value="casa">Casa</option>
          <option value="gastoVariado">Gasto Variado</option>
          <option value="lazer">Lazer</option>
          <option value="saude">Saude</option>
          <option value="assinatura">Assinaturas</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.filtro {
  margin-top: 8rem;

  .campo {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  label {
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--cinza-escuro);
  }

  select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--cinza-claro);
    text-align: center;
    font-weight: 500;
    font-size: 1.7rem;
    color: var(--cinza-escuro);
  }
}
</style>
