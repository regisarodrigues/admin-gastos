<script setup>
import IconoAhorro from '@/assets/img/icono_ahorro.svg';
import IconoCasa from '@/assets/img/icono_casa.svg';
import IconoComida from '@/assets/img/icono_comida.svg';
import IconoGastos from '@/assets/img/icono_gastos.svg';
import IconoOcio from '@/assets/img/icono_ocio.svg';
import IconoSalud from '@/assets/img/icono_salud.svg';
import IconoSuscripciones from '@/assets/img/icono_suscripciones.svg';
import { fomatarData, formatarValor } from '@/helpers';

const dicionarioIcons = {
  poupanca: IconoAhorro,
  alimentacao: IconoComida,
  casa: IconoCasa,
  gastoVariado: IconoGastos,
  lazer: IconoOcio,
  saude: IconoSalud,
  assinatura: IconoSuscripciones
};

defineProps({
  gasto: {
    type: Object,
    required: true
  }
});

defineEmits(['selecionar-gasto']);
</script>

<template>
  <div class="gasto sombra">
    <div class="conteudo">
      <img class="icon" :src="dicionarioIcons[gasto.categoria]" :alt="gasto.categoria" />
      <div class="detalhes">
        <p class="categoria">{{ gasto.categoria }}</p>
        <p class="name" @click="$emit('selecionar-gasto', gasto.id)">{{ gasto.name }}</p>
        <p class="data">
          Data:
          <span>
            {{ fomatarData(gasto.data) }}
          </span>
        </p>
      </div>
    </div>
    <p class="valor">{{ formatarValor(gasto.valor) }}</p>
  </div>
</template>

<style lang="scss" scoped>
.gasto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .conteudo {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .icon {
    width: 5rem;
  }

  .detalhes {
    p {
      margin: 0 0 1rem 0;
    }
    .categoria {
      color: var(--cinza);
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: 900;
    }
    .name {
      color: var(--cinza-escuro);
      text-transform: capitalize;
      font-size: 2.4rem;
      font-weight: 700;
      cursor: pointer;
    }
    .data {
      color: var(--cinza-escuro);
      font-size: 1.6rem;
      font-weight: 900;

      span {
        font-weight: 400;
      }
    }
  }
  .valor {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
  }
}
</style>
