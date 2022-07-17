import Newbie, { useNewbie } from 'newbiesrc/entry-react';
import 'newbiesrc/assets/scss/style.scss';

import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';

import Hint from './Hint';
import './App.css';

function App() {
    let newbie = null;

    function doStart() {
        newbie.start();
    }

    useNewbie({ ReactDOM });

    useEffect(() => {
        newbie = new Newbie({
            shadow: {
                enabled: true,
            },
            hint: {
                component: Hint,
            },
            arrow: {
                type: 'triangle',
                size: 20,
                padding: 10,
            },
            steps: [
                {
                    id: '666',
                    content: {
                        title: 'popup',
                        content: 'Must be centered if no target specified',
                    },
                    position: 'bottom',
                    offsetX: 1,
                    offsetY: 40,
                    shadow: {
                        offset: 10,
                        borderRadius: 22,
                    },
                },
                {
                    id: 'top-left',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'top-left',
                        lastHintId: '3',
                    },
                    position: 'top-left',
                },
                {
                    id: 'top',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'top',
                    },
                    position: 'top',
                },
                {
                    id: 'top-right',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'top-right',
                    },
                    position: 'top-right',
                },
                {
                    id: 'right-top',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'right-top',
                    },
                    position: 'right-top',
                },
                {
                    id: 'right',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'right',
                    },
                    position: 'right',
                },
                {
                    id: 'right-bottom',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'right-bottom',
                    },
                    position: 'right-bottom',
                },
                {
                    id: 'bottom-right',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'bottom-right',
                    },
                    position: 'bottom-right',
                },
                {
                    id: 'bottom',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'bottom',
                    },
                    position: 'bottom',
                },
                {
                    id: 'bottom-left',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'bottom-left',
                    },
                    position: 'bottom-left',
                },
                {
                    id: 'left-bottom',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'left-bottom',
                    },
                    position: 'left-bottom',
                },
                {
                    id: 'left',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'left',
                    },
                    position: 'left',
                },
                {
                    id: 'left-top',
                    target: '[data-newbie-target="center"]',
                    content: {
                        content: 'left-top',
                    },
                    position: 'left-top',
                },
                {
                    id: '0',
                    target: '[data-newbie-target="1"]',
                    content: {
                        title: 'Eiusmod velit officia aute amet dolore ipsum.',
                        content:
                            'Irure anim cillum ut esse et mollit tempor adipisicing minim officia magna. Id qui qui exercitation consectetur. Aliquip velit id Lorem consectetur laboris adipisicing reprehenderit. Mollit veniam deserunt dolore enim. Ut est enim labore magna ullamco.',
                    },
                    position: 'bottom',
                    offsetX: 1,
                    offsetY: 40,
                    shadow: {
                        offset: 10,
                        borderRadius: 22,
                    },
                },
                {
                    id: '1',
                    target: document.querySelector('[data-newbie-target="1"]'),
                    content: {
                        content:
                            'Ipsum consequat dolor velit pariatur nulla et ullamco sint irure consequat.',
                    },
                    position: 'left',
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
                        enabled: false,
                    },
                    position: 'right-bottom',
                },
            ],
        });
    }, []);

    return (
        <div className="App">
            <button id="start" onClick={doStart}>
                start
            </button>
            <div data-newbie-target="center">center</div>
            <div data-newbie-target="1">1</div>
            <div data-newbie-target="2">2</div>
            <div data-newbie-target="3">3</div>
        </div>
    );
}

export default App;
