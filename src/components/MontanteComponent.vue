<script setup>
import { ref } from 'vue';
import AlertaComponent from './AlertaComponent.vue';

const montante = ref(0);
const error = ref('');
const emit = defineEmits(['definir-montante']);

const definirValor = () => {
  if (montante.value <= 0) {
    error.value = 'Valor invalido.';
    setTimeout(() => {
      error.value = '';
    }, 2000);
  }

  emit('definir-montante', montante.value);
};
</script>
<template>
  <form class="montante" autocomplete="off" @submit.prevent="definirValor">
    <AlertaComponent v-if="error">
      {{ error }}
    </AlertaComponent>

    <div class="campo">
      <label for="nova-quantia">Definir Valor</label>
      <input
        class="nova-quantia"
        type="number"
        min="0"
        id="nova-quantia"
        placeholder="Adicione o valor"
        v-model.number="montante"
      />
    </div>
    <input type="submit" value="Definir Valor" />
  </form>
</template>

<style lang="scss" scoped>
.montante {
  width: 100%;

  .campo {
    display: grid;
    gap: 2rem;
  }

  label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--azul);
  }

  input[type='number'] {
    background-color: var(--cinza-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
  }

  input[type='submit'] {
    background-color: var(--azul);
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
    color: var(--branco);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
  }

  input[type='submit']:hover {
    background-color: #1048a4;
    cursor: pointer;
  }
}
</style>
