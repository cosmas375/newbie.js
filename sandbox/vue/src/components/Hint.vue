<template>
  <div class="hint">
    <div class="hint__title">{{ title }}</div>
    <div class="hint__content">{{ content }}</div>
    <div class="hint__controls">
      <button @click="goNext" class="hint__btn" >next</button>
      <button @click="goPrev" class="hint__btn" >prev</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hint',
  props: {
    title: String,
    content: String,
  },
  methods: {
    goNext() {
      this.$emit('go-next');
    },
    goPrev() {
      this.$emit('go-previous');
    },
  }
};
</script>

<style lang="scss">
.hint {
  box-sizing: border-box;
  width: 20rem;
  padding: 1rem;
  border-radius: .5rem;
  box-shadow: 0 0 20px black;
  background-color: #fff;

  &__title {
    font-size: 2rem;
  }

  &__content {
    font-size: 1.4rem;
  }

  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
