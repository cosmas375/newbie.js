const instance = new Newbie({
  component: document.getElementById('newbie-hint'),
  shadow: {
    type: 'html',
  },
  steps: [{
    id: '1',
    target: '[data-newbie-target="1"]',
    content: 'fuck',
    placement: 'right',
  }, {
    id: '2',
    target: '[data-newbie-target="2"]',
    content: 'fuck you',
    placement: 'left',
    shadow: {},
  }, {
    id: '3',
    target: '[data-newbie-target="3"]',
    content: 'fuck you bitch',
    placement: 'top-right',
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
