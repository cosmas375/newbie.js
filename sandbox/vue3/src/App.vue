<script>
import MyHint from './components/MyHint.vue';
import Newbie from '../../../src/entry-vue3';
import config from '@/../../config';

export default {
    name: 'App',
    data() {
        return {
            newbie: null,
        };
    },
    methods: {
        doStart() {
            this.newbie.start();
        },
    },
    mounted() {
        this.newbie = new Newbie({
            ...config,
            hint: {
                component: MyHint,
            },
        });

        const startBtn = document.getElementById('start');
        if (startBtn) {
            startBtn.addEventListener('click', this.doStart);
        }
    },
    unmounted() {
        const startBtn = document.getElementById('start');
        if (startBtn) {
            startBtn.removeEventListener('click', this.doStart);
        }
    },
};
</script>

<template>
    <div>adf</div>
</template>

<style lang="scss">
@import '../../../src/assets/scss/style';
</style>