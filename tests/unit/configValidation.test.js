/**
 * @jest-environment jsdom
 */

import { Error } from '../../src/core/Error';

describe('config validation', () => {
    it('throws an error if no config provided', () => {
        expect(() => {
            new Newbie();
        }).toThrow(Error.NO_CONFIG_PROVIDED);
    });

    it('throws an error if no steps provided', () => {
        expect(() => {
            new Newbie({});
        }).toThrow(Error.NO_STEPS_PROVIDED);
        expect(() => {
            new Newbie({
                steps: [],
            });
        }).toThrow(Error.NO_STEPS_PROVIDED);
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
        }).toThrow(Error.NO_HINT_PROVIDED);

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
        }).toThrow(Error.NO_HINT_PROVIDED);
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
        }).toThrow(Error.NO_HINT_COMPONENT_PROVIDED);

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
        }).not.toThrow(Error.NO_HINT_COMPONENT_PROVIDED);

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
