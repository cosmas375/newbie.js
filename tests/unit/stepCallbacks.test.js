/**
 * @jest-environment jsdom
 */

describe('newbie callbacks usage', () => {
    const content = 'some random content';

    beforeEach(() => {
        document.body.innerHTML = `
             <div id="hint-target"></div>
             <div id="hint-component">
                 <span data-content-slot></span>
             </div>
         `;
    });

    it('calls beforeMount hook with no parameters', async () => {
        const beforeMount = jest.fn();
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
                    beforeMount,
                },
            ],
        });

        await instance.start();

        expect(beforeMount).toBeCalledWith();
    });

    it('calls mounted hook with target element as only parameter', async () => {
        const mounted = jest.fn();
        const target = document.querySelector('#hint-target-1');
        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target,
                    content: {
                        '[data-content-slot]': content,
                    },
                    mounted,
                },
            ],
        });

        await instance.start();

        expect(mounted).toBeCalledWith(target);
    });

    it('calls beforeUnmount hook with target element as only parameter', async () => {
        const beforeUnmount = jest.fn();
        const target = document.querySelector('#hint-target-1');
        const instance = new Newbie({
            hint: {
                component: document.getElementById('hint-component'),
            },
            steps: [
                {
                    target,
                    content: {
                        '[data-content-slot]': content,
                    },
                    beforeUnmount,
                },
            ],
        });

        await instance.start();
        await instance.stop();

        expect(beforeUnmount).toBeCalledWith(target);
    });

    it('calls unmounted hook with no parameters', async () => {
        const unmounted = jest.fn();
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
                    unmounted,
                },
            ],
        });

        await instance.start();
        await instance.stop();

        expect(unmounted).toBeCalledWith();
    });
});
