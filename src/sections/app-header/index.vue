<template>
  <header class="app-header">
    <div class="app-header__logo">
      <img :src="require('../../assets/logo.svg')" alt="æternity">
    </div>
    <div class="app-header__slot">
      <!-- Slot for the header content -->
      <slot/>
    </div>
  </header>
</template>
<script>
export default {
  name: 'app-header'
}
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4.375rem;
  box-shadow: 0 0 16px $color-shadow-alpha-15;
  background-color: $color-white;
  padding: 0.875rem 0;

  &__slot {
    flex: 1 1 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 100%;

    > img {
      width: 3rem;
    }
  }
}
</style>
