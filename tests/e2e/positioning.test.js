describe('Hint positioning', () => {
    const targetSelector = '[data-newbie-target="1"]';
    const hintSelector = '#newbie-hint';
    const defaultOffset = 10;

    beforeEach(function () {
        cy.visit('tests/e2e/positioning.html');
    });

    [
        {
            position: 'top',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.top).to.equal(
                    hintRect.bottom + defaultOffset
                );
                expect(Math.round(targetRect.left - hintRect.left)).to.equal(
                    Math.round(hintRect.right - targetRect.right)
                );
            },
        },
        {
            position: 'top-left',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.top).to.equal(
                    hintRect.bottom + defaultOffset
                );
                expect(targetRect.left).to.equal(hintRect.left);
            },
        },
        {
            position: 'top-right',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.top).to.equal(
                    hintRect.bottom + defaultOffset
                );
                expect(targetRect.right).to.equal(hintRect.right);
            },
        },
        {
            position: 'right',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.right).to.equal(
                    hintRect.left - defaultOffset
                );
                expect(Math.round(targetRect.top - hintRect.top)).to.equal(
                    Math.round(hintRect.bottom - targetRect.bottom)
                );
            },
        },
        {
            position: 'right-top',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.right).to.equal(
                    hintRect.left - defaultOffset
                );
                expect(targetRect.top).to.equal(hintRect.top);
            },
        },
        {
            position: 'right-bottom',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.right).to.equal(
                    hintRect.left - defaultOffset
                );
                expect(targetRect.bottom).to.equal(hintRect.bottom);
            },
        },
        {
            position: 'bottom',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.bottom).to.equal(
                    hintRect.top - defaultOffset
                );
                expect(Math.round(targetRect.left - hintRect.left)).to.equal(
                    Math.round(hintRect.right - targetRect.right)
                );
            },
        },
        {
            position: 'bottom-left',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.bottom).to.equal(
                    hintRect.top - defaultOffset
                );
                expect(targetRect.left).to.equal(hintRect.left);
            },
        },
        {
            position: 'bottom-right',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.bottom).to.equal(
                    hintRect.top - defaultOffset
                );
                expect(targetRect.right).to.equal(hintRect.right);
            },
        },
        {
            position: 'left',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.left).to.equal(
                    hintRect.right + defaultOffset
                );
                expect(Math.round(targetRect.top - hintRect.top)).to.equal(
                    Math.round(hintRect.bottom - targetRect.bottom)
                );
            },
        },
        {
            position: 'left-top',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.left).to.equal(
                    hintRect.right + defaultOffset
                );
                expect(targetRect.top).to.equal(hintRect.top);
            },
        },
        {
            position: 'left-bottom',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.left).to.equal(
                    hintRect.right + defaultOffset
                );
                expect(targetRect.bottom).to.equal(hintRect.bottom);
            },
        },
    ].forEach(({ position, assertion }) => {
        it(position, function () {
            cy.window().then(window => {
                cy.get(hintSelector).then(hint => {
                    cy.get(targetSelector).then(target => {
                        const instance = new window.Newbie({
                            position,
                            hint: {
                                component: hint[0],
                            },
                            steps: [
                                {
                                    target: target[0],
                                },
                            ],
                        });

                        instance.start();
                    });
                });
            });

            cy.get(hintSelector).then(hint => {
                cy.get(targetSelector).then(target => {
                    const hintRect = hint[0].getBoundingClientRect();
                    const targetRect = target[0].getBoundingClientRect();
                    assertion(hintRect, targetRect);
                });
            });
        });
    });
});
