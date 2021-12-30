<template>
    <div id="app">
        <button @click="doStart" id="start">start</button>
        <div data-newbie-target="1">1</div>
        <div data-newbie-target="2">2</div>
        <div data-newbie-target="3">3</div>
    </div>
</template>

<script>
import Hint from './components/Hint.vue';
import Newbie from '../../../src/entry-vue';

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
        goPrevious() {
            this.newbie.goPrevious();
        },
        goNext() {
            this.newbie.goNext();
        },
        doStop() {
            this.newbie.stop();
        },
    },
    mounted() {
        this.newbie = new Newbie({
            shadow: {
                type: 'svg',
                offset: 12,
            },
            hint: {
                component: Hint,
            },
            arrow: {
                type: 'triangle',
                size: 4,
            },
            steps: [
                {
                    id: '0',
                    target: '[data-newbie-target="1"]',
                    content: {
                        title: 'Eiusmod velit officia aute amet dolore ipsum.',
                        content:
                            'Irure anim cillum ut esse et mollit tempor adipisicing minim officia magna. Id qui qui exercitation consectetur. Aliquip velit id Lorem consectetur laboris adipisicing reprehenderit. Mollit veniam deserunt dolore enim. Ut est enim labore magna ullamco.',
                    },
                    position: 'bottom-right',
                    offsetX: 1,
                    offsetY: 40,
                    shadow: {
                        type: 'svg',
                        offset: 10,
                        borderRadius: 10,
                    },
                    hint: {
                        offsetX: 22,
                        offsetY: 22,
                    },
                },
                {
                    id: '1',
                    target: document.querySelector('[data-newbie-target="1"]'),
                    content: {
                        content:
                            'Ipsum consequat dolor velit pariatur nulla et ullamco sint irure consequat.',
                    },
                    position: 'bottom-right',
                },
                {
                    id: '2',
                    target: '[data-newbie-target="2"]',
                    content: {
                        content: `
                          Do nisi laborum ex nulla fugiat ut voluptate do adipisicing nisi amet tempor. Pariatur excepteur elit ut laborum. Anim quis labore ullamco nisi ad sit nisi. Labore est sit labore eu aliquip incididunt deserunt. Exercitation nisi aliqua officia minim nostrud laborum nostrud. Occaecat elit culpa cupidatat ea et ea eu. Sunt tempor excepteur enim do ipsum irure excepteur nisi nulla non pariatur consequat ut elit.
                        `,
                    },
                    position: 'left-top',
                    mounted(target) {
                        target.style.backgroundColor = 'black';
                    },
                    beforeUnmount(target) {
                        target.style.removeProperty('background-color');
                    },
                },
                {
                    id: '3',
                    target: '[data-newbie-target="3"]',
                    content: {
                        content:
                            'Occaecat eu aute Lorem pariatur mollit sit adipisicing aute dolor fugiat sint eu. Ea deserunt cillum duis dolore laboris eiusmod irure cupidatat pariatur id qui sunt mollit. Sit non officia aliquip aute elit enim est duis commodo voluptate do.',
                    },
                    arrow: {
                        type: null,
                    },
                    position: 'right-bottom',
                },
            ],
        });
    },
};
</script>

<style lang="scss">
@import '../../../src/assets/scss/shadow';
@import '../../../src/assets/scss/hint';
@import '../../../src/assets/scss/hint-wrap';
@import '../../../src/assets/scss/arrow';

#app {
    height: 200vh;

    #start {
        position: fixed;
        bottom: 20px;
        left: 20px;
        font-size: 20px;
        z-index: 2;
    }

    [data-newbie-target] {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
    }

    [data-newbie-target='1'] {
        width: 100px;
        height: 200px;
        top: 20px;
        left: 500px;
        background-color: rgb(255, 168, 168);
    }

    [data-newbie-target='2'] {
        width: 100px;
        height: 20px;
        top: 100vh;
        left: calc(95vw - 100px);
        background-color: rgb(255, 168, 168);
    }

    [data-newbie-target='3'] {
        width: 10px;
        height: 200px;
        top: 140vh;
        left: 50px;
        background-color: rgb(255, 168, 168);
    }
}
</style>
