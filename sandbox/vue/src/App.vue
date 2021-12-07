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
  },
  mounted() {
    this.newbie = new Newbie({
      shadow: {
        type: 'html',
      },
      hint: {
        component: Hint,
        handlers: {
          'go-next': this.goNext,
          'go-previous': this.goPrevious,
        },
      },
      steps: [{
        id: '0',
        target: '[data-newbie-target="1"]',
        content: {
          title: 'f',
          content: 'content for hint with svg shadow',
        },
        hint: {
          position: 'bottom-right',
        },
        shadow: {
          type: 'svg',
          settings: {
            offset: 10,
            borderRadius: 10,
          },
        }
      }, {
        id: '1',
        target: document.querySelector('[data-newbie-target="1"]'),
        content: 'fuck',
        hint: {
          position: 'bottom-right',
        },
      }, {
        id: '2',
        target: '[data-newbie-target="2"]',
        content: 'fuck you',
        shadow: {
          type: null,
        },
        hint: {
          position: 'left-top',
        },
      }, {
        id: '3',
        target: '[data-newbie-target="3"]',
        content: 'fuck you bitch',
        shadow: {
          type: 'html',
          settings: {
            offset: 10
          }
        },
        hint: {
          position: 'right-bottom',
        },
      }]
    });
  },
};
</script>

<style lang="scss">
@import '../../../src/assets/scss/shadow';
@import '../../../src/assets/scss/hint';

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

  [data-newbie-target="1"] {
    width: 100px;
    height: 200px;
    top: 20px;
    left: 500px;
    background-color: rgb(255, 168, 168);
  }

  [data-newbie-target="2"] {
    width: 100px;
    height: 20px;
    top: 100vh;
    left: calc(95vw - 100px);
    background-color: rgb(255, 168, 168);
  }

  [data-newbie-target="3"] {
    width: 10px;
    height: 200px;
    top: 140vh;
    left: 50px;
    background-color: rgb(255, 168, 168);
  }
}
</style>
