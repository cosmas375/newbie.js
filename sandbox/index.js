const instance = new Newbie({
  component: document.getElementById('hint-component'),
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

startButton.addEventListener('click', () => {
  instance.start();
});
nextButton.addEventListener('click', () => {
  instance.goNext();
});
prevButton.addEventListener('click', () => {
  instance.goPrevious();
});
