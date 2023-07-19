<script setup>
import iconNovoGasto from '@/assets/img/nuevo-gasto.svg';
import ControleMontante from '@/components/ControleMontante.vue';
import GastoComponent from '@/components/GastoComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import MontanteComponet from '@/components/MontanteComponent.vue';
import { gerarId } from '@/helpers';

import { reactive, ref, watch } from 'vue';

const modal = reactive({
  mostar: false,
  animar: false
});

const montante = ref(0);
const disponivel = ref(0);
const valorGasto = ref(0);
const gastos = ref([]);

const gasto = reactive({
  name: '',
  valor: '',
  categoria: '',
  id: null,
  data: Date.now()
});

watch(
  gastos,
  () => {
    const totalGasto = gastos.value.reduce((total, gasto) => gasto.valor + total, 0);
    valorGasto.value = totalGasto;

    disponivel.value = montante.value - valorGasto.value;
  },
  { deep: true }
);

watch(
  modal,
  () => {
    if (!modal.mostar) {
      reiniciarStateGasto();
    }
  },
  { deep: true }
);

const definirMontante = (quantidade) => {
  montante.value = quantidade;
  disponivel.value = quantidade;
};

const mostrarModal = () => {
  modal.mostar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);
};

const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostar = false;
  }, 300);
};

const salvarGasto = () => {
  if (gasto.id) {
    const { id } = gasto;
    const i = gastos.value.findIndex((gasto) => gasto.id === id);
    gastos.value[i] = { ...gasto };
  } else {
    gastos.value.push({
      ...gasto,
      id: gerarId()
    });
  }

  ocultarModal();

  // reincaiar objeto
  reiniciarStateGasto();
};

const reiniciarStateGasto = () => {
  Object.assign(gasto, {
    name: '',
    valor: '',
    categoria: '',
    id: null,
    data: Date.now()
  });
};
const selecionarGasto = (id) => {
  const editarGasto = gastos.value.filter((gasto) => gasto.id === id)[0];
  Object.assign(gasto, editarGasto);
  mostrarModal();
};
</script>

<template>
  <div :class="{ fixar: modal.mostar }">
    <header>
      <h1>Controle de Gastos</h1>
      <div class="conteudo-header conteudo sombra">
        <MontanteComponet v-if="montante === 0" @definir-montante="definirMontante" />

        <ControleMontante
          v-else
          :montante="montante"
          :disponivel="disponivel"
          :valorGasto="valorGasto"
        />
      </div>
    </header>
    <main v-if="montante > 0">
      <div class="lista-gastos conteudo">
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'Não tem gastos.' }}</h2>

        <GastoComponent
          v-for="gasto in gastos"
          :key="gasto.id"
          :gasto="gasto"
          @selecionar-gasto="selecionarGasto"
        />
      </div>

      <div class="criar-gasto">
        <img :src="iconNovoGasto" alt="icon criar novo gasto" @click="mostrarModal" />
      </div>

      <ModalComponent
        v-if="modal.mostar"
        @ocultar-modal="ocultarModal"
        @salvar-gasto="salvarGasto"
        :modal="modal"
        :disponivel="disponivel"
        v-model:name="gasto.name"
        v-model:valor="gasto.valor"
        v-model:categoria="gasto.categoria"
      />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --azul: #3b82f6;
  --branco: #fff;
  --cinza-claro: #f5f5f5;
  --cinza: #94a3b8;
  --cinza-escuro: #64748b;
  --preto: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  background-color: var(--cinza-claro);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.fixar {
  overflow: hidden;
  height: 100vh;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--branco);
  text-align: center;
}
.conteudo {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.conteudo-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--branco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.criar-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;

  img {
    width: 5rem;
    cursor: pointer;
  }
}

.lista-gastos {
  margin-top: 10rem;
  font-m h2 {
    font-weight: 900;
    color: var(--cinza-escuro);
  }
}
</style>
