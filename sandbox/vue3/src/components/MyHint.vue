<script>
export default {
    props: {
        title: String,
        content: String,
        lastHintId: String,
    },
};
</script>

<template>
    <div class="hint">
        <div class="hint__title">{{ title }}</div>
        <div class="hint__content">{{ content }}</div>
        <div class="hint__controls">
            <button @click="$emit('go-previous')" class="hint__btn">prev</button>
            <button @click="$emit('go-next')" class="hint__btn">next</button>
            <button
                v-if="lastHintId"
                @click="$emit('go-to', lastHintId)"
                class="hint__btn"
            >
                last
            </button>
        </div>
        <span @click="$emit('stop')" class="hint__close">x</span>
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
