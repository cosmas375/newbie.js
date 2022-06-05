<script>
export default {
    props: {
        title: String,
        content: String,
    },
    inject: ['goNext', 'goPrevious', 'stop'],
};
</script>

<template>
    <div class="hint">
        <div class="hint__title">{{ title }}</div>
        <div class="hint__content">{{ content }}</div>
        <div class="hint__controls">
            <button @click="goPrevious" class="hint__btn">prev</button>
            <button @click="goNext" class="hint__btn">next</button>
        </div>
        <span @click="stop" class="hint__close">x</span>
    </div>
</template>

<style lang="scss">
.hint {
    box-sizing: border-box;
    width: 20rem;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    position: relative;

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
        margin-top: 1rem;
    }

    &__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.2rem;
        text-transform: uppercase;
        cursor: pointer;
    }
}
</style>
