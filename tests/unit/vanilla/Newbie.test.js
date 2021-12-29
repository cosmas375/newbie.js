/**
 * @jest-environment jsdom
 */

import { Newbie } from '../../../src/core/class/Newbie';
import { ComponentsFactory } from '../../../src/core/class/ComponentsFactory';
import { VanillaHintFactory } from '../../../src/core/class/Hint/HintFactory';
import { Errors } from '../../../src/core/Interfaces';

ComponentsFactory.setHintFactory(new VanillaHintFactory());

describe('config validation', () => {
    it('throws an error if no config provided', () => {
        expect(() => {
            new Newbie();
        }).toThrow(Errors.NO_CONFIG_PROVIDED);
    });

    it('throws an error if no steps provided', () => {
        expect(() => {
            new Newbie({});
        }).toThrow(Errors.NO_STEPS_PROVIDED);
        expect(() => {
            new Newbie({
                steps: [],
            });
        }).toThrow(Errors.NO_STEPS_PROVIDED);
    });

    it('throws an error if no step target provided', () => {
        expect(() => {
            new Newbie({
                steps: [{}],
            });
        }).toThrow(Errors.NO_STEP_TARGET_PROVIDED);
    });

    it('throws an error if no hint provided', () => {
        expect(() => {
            new Newbie({
                steps: [
                    {
                        target: 'selector',
                    },
                ],
            });
        }).toThrow(Errors.NO_HINT_PROVIDED);

        expect(() => {
            new Newbie({
                steps: [
                    {
                        target: 'selector',
                        hint: {},
                    },
                    {
                        target: 'selector',
                        // no hint
                    },
                ],
            });
        }).toThrow(Errors.NO_HINT_PROVIDED);
    });

    it('throws an error if no hint component provided', () => {
        document.body.innerHTML = `
            <div id="component">
            </div>
        `;

        expect(() => {
            new Newbie({
                steps: [
                    {
                        target: 'selector',
                        hint: {},
                    },
                ],
            });
        }).toThrow(Errors.NO_HINT_COMPONENT_PROVIDED);

        expect(() => {
            new Newbie({
                hint: {
                    component: '#component',
                },
                steps: [
                    {
                        target: 'selector',
                        hint: {},
                    },
                ],
            });
        }).not.toThrow(Errors.NO_HINT_COMPONENT_PROVIDED);

        expect(() => {
            new Newbie({
                hint: {},
                steps: [
                    {
                        target: 'selector',
                        hint: {
                            component: document.getElementById('component'),
                        },
                    },
                ],
            });
        }).not.toThrow();
    });
});

describe('stepping', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="hint-target-1"></div>
            <div id="hint-target-2"></div>
            <div id="hint-component">
                <span data-content-slot></span>
            </div>
        `;
    });

    const content1 = 'some random content 1';
    const content2 = 'some random content 2';

    it('starts and displays the first hint', async () => {
        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content1,
                    },
                },
            ],
        });

        expect(document.body.innerHTML).not.toMatch(new RegExp(content1));

        await instance.start();

        expect(document.body.innerHTML).toMatch(new RegExp(content1));
    });

    it('skips steps with missing targets', async () => {
        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-missing', // missing
                    content: {
                        '[data-content-slot]': content1,
                    },
                },
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content2,
                    },
                },
            ],
        });

        await instance.start();

        expect(document.body.innerHTML).toMatch(new RegExp(content2));
    });

    it('stops after last step', async () => {
        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content1,
                    },
                },
                {
                    target: '#hint-target-2',
                    content: {
                        '[data-content-slot]': content2,
                    },
                },
            ],
        });

        await instance.start();

        expect(document.body.innerHTML).toMatch(new RegExp(content1));

        await instance.goNext();

        expect(document.body.innerHTML).toMatch(new RegExp(content2));

        await instance.goNext();

        expect(document.body.innerHTML).not.toMatch(new RegExp(content1));
        expect(document.body.innerHTML).not.toMatch(new RegExp(content2));
    });
});

describe('callback usage', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="hint-target-1"></div>
            <div id="hint-target-2"></div>
            <div id="hint-component">
                <span data-content-slot></span>
            </div>
        `;
    });

    const content1 = 'some random content 1';

    it('calls beforeStart and beforeFinish hooks', async () => {
        const beforeStart = jest.fn();
        const beforeFinish = jest.fn();
        const instance = new Newbie({
            beforeStart,
            beforeFinish,
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content1,
                    },
                },
            ],
        });

        await instance.start();

        expect(beforeStart).toBeCalledWith();

        await instance.stop();

        expect(beforeFinish).toBeCalledWith();
    });

    it('calls step hooks', async () => {
        const beforeMount = jest.fn();
        const mounted = jest.fn();
        const beforeUnmount = jest.fn();
        const unmounted = jest.fn();

        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content1,
                    },
                    beforeMount,
                    mounted,
                    beforeUnmount,
                    unmounted,
                },
            ],
        });

        await instance.start();

        expect(beforeMount).toBeCalledWith();
        expect(mounted).toBeCalledWith(
            document.querySelector('#hint-target-1')
        );

        await instance.goNext();

        expect(beforeUnmount).toBeCalledWith(
            document.querySelector('#hint-target-1')
        );
        expect(unmounted).toBeCalledWith();
    });
});
