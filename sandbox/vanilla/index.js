const instance = new Newbie({
  shadow: {
    type: 'html',
  },
  hint: {
    component: document.getElementById('newbie-hint'),
  },
  steps: [{
    id: '0',
    target: '[data-newbie-target="1"]',
    content: {
      '[data-newbie-step-title]': 'title 1',
      '[data-newbie-step-content]': 'content for hint with svg shadow',
    },
    hint: {
      position: 'bottom-right',
    },
    shadow: {
      type: 'svg',
      offset: 10,
      borderRadius: 10,
    }
  }, {
    id: '1',
    target: document.querySelector('[data-newbie-target="1"]'),
    content: {
      '[data-newbie-step-title]': 'title 2',
      '[data-newbie-step-content]': 'fuck',
    },
    hint: {
      position: 'bottom-right',
    },
  }, {
    id: '2',
    target: '[data-newbie-target="2"]',
    content: {
      '[data-newbie-step-title]': 'title 3',
      '[data-newbie-step-content]': 'fuck you',
    },
    shadow: {
      type: null,
    },
    hint: {
      position: 'left-top',
    },
  }, {
    id: '3',
    target: '[data-newbie-target="3"]',
    content: {
      '[data-newbie-step-title]': 'title 4',
      '[data-newbie-step-content]': 'fuck you bitch',
    },
    shadow: {
      type: 'html',
      offset: 10
    },
    hint: {
      position: 'right-bottom',
    },
  }]
});

const startButton = document.getElementById('start');
const nextButton = document.querySelector('[data-newbie-go-next]');
const prevButton = document.querySelector('[data-newbie-go-previous]');
const stopButton = document.querySelector('[data-newbie-stop]');

startButton.addEventListener('click', () => {
  instance.start();
});
nextButton.addEventListener('click', () => {
  instance.goNext();
});
prevButton.addEventListener('click', () => {
  instance.goPrevious();
});
stopButton.addEventListener('click', () => {
  instance.stop();
});
