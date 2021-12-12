/**
 * @jest-environment jsdom
 */

import { Newbie } from '../../../src/core/class/Newbie';
import { Step } from '../../../src/core/class/Step';
import { VanillaHintFactory } from '../../../src/core/class/Hint/HintFactory';
import { Errors } from '../../../src/core/Interfaces';

Step.setHintFactory(new VanillaHintFactory());

describe('Newbie config validation', () => {
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

describe('Newbie stepping', () => {
    it('starts and displays the first hint', () => {
        document.body.innerHTML = `
            <div id="hint-target-1"></div>
            <div id="hint-component">
                <span data-content-slot></span>
            </div>
        `;
        const content = 'some random content';

        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-1',
                    content: {
                        '[data-content-slot]': content,
                    },
                },
            ],
        });

        expect(document.body.innerHTML).not.toMatch(new RegExp(content));

        instance.start();
        expect(document.body.innerHTML).toMatch(new RegExp(content));
    });

    it('skips steps with missing targets', () => {
        document.body.innerHTML = `
            <div id="hint-target-1"></div>
            <div id="hint-target-2"></div>
            <div id="hint-component">
                <span data-content-slot></span>
            </div>
        `;
        const content1 = 'some random content 1';
        const content2 = 'some random content 2';

        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target: '#hint-target-missing',
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

        instance.start();
        expect(document.body.innerHTML).toMatch(new RegExp(content2));
    });
});
