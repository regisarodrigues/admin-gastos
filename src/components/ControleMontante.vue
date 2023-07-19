<script setup>
import imagem from '@/assets/img/grafico.jpg';
import { formatarValor } from '@/helpers';
const props = defineProps({
  montante: {
    type: Number,
    required: true
  },
  disponivel: {
    type: Number,
    required: true
  },
  valorGasto: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="duas-colunas">
    <dir class="conteudo-grafico">
      <img :src="imagem" alt="" />
    </dir>
    <div class="conteudo-montante">
      <button class="resetar-app">Resetar App</button>
      <p><span>Valor: </span>{{ formatarValor(props.montante) }}</p>
      <p><span>Valor Disponivel: </span>{{ formatarValor(props.disponivel) }}</p>
      <p><span>Valor Gasto: </span>{{ formatarValor(props.valorGasto) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.duas-colunas {
  display: flex;
  flex-direction: column;

  > :first-child {
    margin-bottom: 4rem;
  }

  .conteudo-montante {
    width: 100%;

    p {
      font-size: 2.4rem;
      text-align: center;
      color: var(--cinza-escuro);
    }

    span {
      font-weight: 900;
      color: var(--azul);
    }

    .resetar-app {
      background-color: #db2777;
      border: none;
      padding: 1rem;
      width: 100%;
      color: var(--branco);
      font-weight: 900;
      text-transform: uppercase;
      border-radius: 1rem;
      transition-property: background-color;
      transition-duration: 300ms;
    }
    .resetar-app:hover {
      cursor: pointer;
      background-color: #c11d67;
    }
  }
}

@media (min-width: 768px) {
  .duas-colunas {
    flex-direction: row;
    gap: 4rem;
    align-items: center;

    > :first-child {
      margin-bottom: 0;
    }

    .conteudo-montante p {
      text-align: left;
    }
  }
}
</style>
