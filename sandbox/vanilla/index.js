import config from '../config';

const hintComponent = createHint();
document.body.append(hintComponent);

const instance = new Newbie({
    ...config,
    steps: config.steps.map(step => {
        step.content = Object.keys(step.content).reduce((obj, key) => {
            obj[`[data-newbie-step-${key}]`] = step.content[key];
            return obj;
        }, {});
        return step;
    }),
    hint: {
        component: hintComponent,
    },
});

const startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
    instance.start();
});

function createHint() {
    const elem = document.createElement('div');
    elem.innerHTML = `
        <div class="custom-newbie-hint">
            <div data-newbie-step-title class="custom-newbie-hint__title"></div>
            <div
                data-newbie-step-content
                class="custom-newbie-hint__content"
            ></div>
            <div class="custom-newbie-hint__controls">
                <button data-newbie-go-previous>prev</button>
                <button data-newbie-go-next>next</button>
                <button data-newbie-stop>stop</button>
                <button data-newbie-go-to data-newbie-target-step-id="3">
                    last
                </button>
            </div>
        </div>
    `;
    return elem;
}