describe('arrow positioning test', () => {
    const targetSelector = '[data-newbie-target="1"]';
    const hintSelector = '#newbie-hint';
    const arrowSelector = '.newbie-arrow';
    const arrowSize = 8;
    const round = value => Math.round(value);

    beforeEach(function () {
        cy.visit('tests/e2e/positioning.html');
    });

    [
        {
            position: 'top',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.top).to.equal(round(hintRect.bottom));
                expect(round(arrowRect.left)).to.equal(
                    round(
                        hintRect.left +
                            hintRect.width / 2 -
                            arrowRect.height / 2
                    )
                );
            },
        },
        {
            position: 'top-left',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.top).to.equal(round(hintRect.bottom));
                expect(round(arrowRect.left)).to.equal(round(hintRect.left));
            },
        },
        {
            position: 'top-right',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.top).to.equal(round(hintRect.bottom));
                expect(round(arrowRect.right)).to.equal(round(hintRect.right));
            },
        },
        {
            position: 'right',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.right)).to.equal(round(hintRect.left));
                expect(round(arrowRect.top)).to.equal(
                    round(
                        hintRect.top +
                            hintRect.height / 2 -
                            arrowRect.height / 2
                    )
                );
            },
        },
        {
            position: 'right-top',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.right)).to.equal(round(hintRect.left));
                expect(arrowRect.top).to.equal(hintRect.top);
            },
        },
        {
            position: 'right-bottom',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.right)).to.equal(round(hintRect.left));
                expect(round(arrowRect.bottom)).to.equal(
                    round(hintRect.bottom)
                );
            },
        },
        {
            position: 'bottom',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.bottom).to.equal(hintRect.top);
                expect(round(arrowRect.left)).to.equal(
                    round(
                        hintRect.left +
                            hintRect.width / 2 -
                            arrowRect.height / 2
                    )
                );
            },
        },
        {
            position: 'bottom-left',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.bottom).to.equal(hintRect.top);
                expect(round(arrowRect.left)).to.equal(round(hintRect.left));
            },
        },
        {
            position: 'bottom-right',
            assertion: (hintRect, arrowRect) => {
                expect(arrowRect.bottom).to.equal(hintRect.top);
                expect(round(arrowRect.right)).to.equal(round(hintRect.right));
            },
        },
        {
            position: 'left',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.left)).to.equal(round(hintRect.right));
                expect(round(arrowRect.top)).to.equal(
                    round(
                        hintRect.top +
                            hintRect.height / 2 -
                            arrowRect.height / 2
                    )
                );
            },
        },
        {
            position: 'left-top',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.left)).to.equal(round(hintRect.right));
                expect(round(arrowRect.top)).to.equal(round(hintRect.top));
            },
        },
        {
            position: 'left-bottom',
            assertion: (hintRect, arrowRect) => {
                expect(round(arrowRect.left)).to.equal(round(hintRect.right));
                expect(round(arrowRect.bottom)).to.equal(
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
                cy.get(arrowSelector).then(arrow => {
                    const hintRect = hint[0].getBoundingClientRect();
                    const arrowRect = arrow[0].getBoundingClientRect();
                    assertion(hintRect, arrowRect);
                });
            });
        });
    });
});
