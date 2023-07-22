<script setup>
import fecharModal from '@/assets/img/cerrar.svg';
import { computed, ref } from 'vue';
import AlertaComponet from './AlertaComponent.vue';

const emit = defineEmits([
  'ocultar-modal',
  'salvar-gasto',
  'update:name',
  'update:valor',
  'update:categoria',
  'excluir-gasto'
]);

const err = ref('');

const props = defineProps({
  modal: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  valor: {
    type: [String, Number],
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  disponivel: {
    type: Number,
    required: true
  },
  id: {
    type: [String, null],
    required: true
  }
});

const adicionarGasto = () => {
  const old = props.valor;
  // validar que não tenha campo vazio
  const { name, valor, categoria, disponivel, id } = props;
  if ([name, valor, categoria].includes('')) {
    err.value = 'Todos os campos são obrigatório(s).';
    setTimeout(() => {
      err.value = '';
    }, 3000);
    return;
  }

  // validar o valor
  if (valor <= 0) {
    err.value = 'Valor inválido.';
    setTimeout(() => {
      err.value = '';
    }, 3000);
    return;
  }

  // validar que usuario nao gaste mais que valor disponivel
  if (id) {
    if (valor > old + disponivel) {
      err.value = 'Valor maior que o disponivel.';
      setTimeout(() => {
        err.value = '';
      }, 3000);
      return;
    }
  } else {
    if (valor > disponivel) {
      err.value = 'Valor maior que o disponivel.';
      setTimeout(() => {
        err.value = '';
      }, 3000);
      return;
    }
  }
  emit('salvar-gasto');
};

const isEdit = computed(() => {
  return props.id;
});
</script>

<template>
  <div class="modal">
    <div class="fechar-modal">
      <img :src="fecharModal" alt="icon fechar modal" @click="$emit('ocultar-modal')" />
    </div>
    <div class="conteudo conteudo-form" :class="[modal.animar ? 'animar' : 'fechar']">
      <form class="novo-gasto" autocomplete="off" @submit.prevent="adicionarGasto">
        <legend>{{ isEdit ? 'Alterar Gasto' : 'Adicionar Gastos' }}</legend>

        <AlertaComponet v-if="err">{{ err }} </AlertaComponet>

        <div class="campo">
          <label for="nome">Nome Gasto:</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome do Gasto..."
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="valor">Valor Gasto R$:</label>
          <input
            type="number"
            id="valor"
            placeholder="Valor do Gasto"
            :value="valor"
            @input="$emit('update:valor', +$event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="categoria">Categoria:</label>
          <select
            name=""
            id="categoria"
            :value="categoria"
            @input="$emit('update:categoria', $event.target.value)"
          >
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
        <input type="submit" :value="[isEdit ? 'Salvar' : 'Adicionar Gasto']" />
      </form>
      <button class="btn-excluir" v-if="isEdit" @click="$emit('excluir-gasto')">
        Excluir Gasto
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.fechar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;

  img {
    width: 3rem;
    cursor: pointer;
  }
}

.conteudo-form {
  transition: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}
.animar {
  opacity: 1;
}
.fechar {
  opacity: 0;
}
.novo-gasto {
  margin: 5rem auto 0 auto;
  display: grid;
  gap: 2rem;

  legend {
    text-align: center;
    color: var(--branco);
    font-size: 3rem;
    font-weight: 700;
  }
  .campo {
    display: grid;
    gap: 1rem;
  }

  input,
  select {
    background-color: var(--cinza-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
  }

  label {
    color: var(--branco);
    font-size: 3rem;
  }

  input[type='submit'] {
    background-color: var(--azul);
    color: var(--branco);
    font-weight: 700;
    cursor: pointer;
  }
}
.btn-excluir {
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  background-color: #ef4444;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--branco);
  margin-top: 5rem;
  cursor: pointer;
}
</style>
