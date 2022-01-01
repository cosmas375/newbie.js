/**
 * @jest-environment jsdom
 */

describe('stepping', () => {
    const content1 = 'some random content 1';
    const content2 = 'some random content 2';

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="hint-target-1"></div>
            <div id="hint-target-2"></div>
            <div id="hint-component">
                <span data-content-slot=""></span>
            </div>
        `;
    });

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

    it('displays hint even if no target specified', async () => {
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

        expect(document.body.innerHTML).toMatch(new RegExp(content1));
    });

    it('stops after the last step', async () => {
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

    it('prevents execution of goNext() and goPrevious() before start()', async () => {
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

        instance.goNext();

        expect(document.body.innerHTML).not.toMatch(new RegExp(content1));
        expect(document.body.innerHTML).not.toMatch(new RegExp(content2));

        instance.goPrevious();

        expect(document.body.innerHTML).not.toMatch(new RegExp(content1));
        expect(document.body.innerHTML).not.toMatch(new RegExp(content2));
    });
});