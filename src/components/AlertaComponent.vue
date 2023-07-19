<template>
  <div class="alerta">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.alerta {
  padding: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.6rem;
  text-align: center;
  background-color: var(--branco);
  border-left: 0.5rem solid #b91c1c;
  color: #b91c1c;
  margin-bottom: 2rem;
}
</style>
