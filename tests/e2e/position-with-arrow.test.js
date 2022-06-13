describe('hint positioning with arrow', () => {
    const targetSelector = '[data-newbie-target="1"]';
    const hintSelector = '#newbie-hint';
    const arrowSize = 8;
    const round = value => Math.round(value);

    beforeEach(function () {
        cy.visit('tests/e2e/positioning.html');
    });

    [
        {
            position: 'top',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.top).to.equal(
                    round(hintRect.bottom + arrowSize)
                );
                expect(round(targetRect.left - hintRect.left)).to.equal(
                    round(hintRect.right - targetRect.right)
                );
            },
        },
        {
            position: 'top-left',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.top)).to.equal(
                    round(hintRect.bottom + arrowSize)
                );
                expect(round(targetRect.left)).to.equal(round(hintRect.left));
            },
        },
        {
            position: 'top-right',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.top)).to.equal(
                    round(hintRect.bottom + arrowSize)
                );
                expect(round(targetRect.right)).to.equal(round(hintRect.right));
            },
        },
        {
            position: 'right',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.right)).to.equal(
                    round(hintRect.left - arrowSize)
                );
                expect(round(targetRect.top - hintRect.top)).to.equal(
                    round(hintRect.bottom - targetRect.bottom)
                );
            },
        },
        {
            position: 'right-top',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.right).to.equal(hintRect.left - arrowSize);
                expect(targetRect.top).to.equal(hintRect.top);
            },
        },
        {
            position: 'right-bottom',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.right)).to.equal(
                    round(hintRect.left - arrowSize)
                );
                expect(round(targetRect.bottom)).to.equal(
                    round(hintRect.bottom)
                );
            },
        },
        {
            position: 'bottom',
            assertion: (hintRect, targetRect) => {
                expect(targetRect.bottom).to.equal(hintRect.top - arrowSize);
                expect(Math.round(targetRect.left - hintRect.left)).to.equal(
                    Math.round(hintRect.right - targetRect.right)
                );
            },
        },
        {
            position: 'bottom-left',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.bottom)).to.equal(
                    round(hintRect.top - arrowSize)
                );
                expect(round(targetRect.left)).to.equal(round(hintRect.left));
            },
        },
        {
            position: 'bottom-right',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.bottom)).to.equal(
                    round(hintRect.top - arrowSize)
                );
                expect(round(targetRect.right)).to.equal(round(hintRect.right));
            },
        },
        {
            position: 'left',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.left)).to.equal(
                    round(hintRect.right + arrowSize)
                );
                expect(round(targetRect.top - hintRect.top)).to.equal(
                    round(hintRect.bottom - targetRect.bottom)
                );
            },
        },
        {
            position: 'left-top',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.left)).to.equal(
                    round(hintRect.right + arrowSize)
                );
                expect(round(targetRect.top)).to.equal(round(hintRect.top));
            },
        },
        {
            position: 'left-bottom',
            assertion: (hintRect, targetRect) => {
                expect(round(targetRect.left)).to.equal(
                    round(hintRect.right + arrowSize)
                );
                expect(round(targetRect.bottom)).to.equal(
                    round(hintRect.bottom)
                );
            },
        },
    ].forEach(({ position, assertion }) => {
        it(position, function () {
            cy.window().then(window => {
                cy.get(hintSelector).then(hint => {
                    cy.get(targetSelector).then(async target => {
                        const instance = new window.Newbie({
                            position,
                            arrow: {
                                enabled: true,
                                size: arrowSize,
                                color: 'green',
                            },
                            hint: {
                                component: hint[0],
                            },
                            steps: [
                                {
                                    target: target[0],
                                },
                            ],
                        });

                        await instance.start();
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
