/**
 * @jest-environment jsdom
 */

describe('newbie callbacks usage', () => {
    const content1 = 'some random content 1';

    beforeEach(() => {
        document.body.innerHTML = `
             <div id="hint-target-1"></div>
             <div id="hint-target-2"></div>
             <div id="hint-component">
                 <span data-content-slot></span>
             </div>
         `;
    });

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
