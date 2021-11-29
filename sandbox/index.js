const instance = new Newbie({
  shadow: {
    type: 'html',
  },
  hint: {
    component: document.getElementById('newbie-hint'),
  },
  steps: [{
    id: '1',
    target: '[data-newbie-target="1"]',
    content: 'fuck',
    hint: {
      placement: 'right',
    },
  }, {
    id: '2',
    target: '[data-newbie-target="2"]',
    content: 'fuck you',
    shadow: {
      type: null,
    },
    hint: {
      placement: 'left',
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
      placement: 'top-right',
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
