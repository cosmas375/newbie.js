describe('animated positioning', () => {
    const transitionDuration = 500;
    const transitionDurationForAssert = transitionDuration * 1.2;
    const targetSelector = '[data-newbie-target="1"]';
    const hintSelector = '#newbie-hint';
    const defaultOffset = 10;
    const round = value => Math.round(value);

    let globalHint;
    let globalTarget;

    beforeEach(function () {
        cy.visit('tests/e2e/positioning.html');
    });

    [
        {
            position: 'top',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(targetRect.top).not.to.equal(
                    round(hintRect.bottom + defaultOffset)
                );
                expect(round(targetRect.left - hintRect.left)).not.to.equal(
                    round(hintRect.right - targetRect.right)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(targetRect.top).to.equal(
                        round(hintRect.bottom + defaultOffset)
                    );
                    expect(round(targetRect.left - hintRect.left)).to.equal(
                        round(hintRect.right - targetRect.right)
                    );
                });
            },
        },
        {
            position: 'top-left',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.top)).not.to.equal(
                    round(hintRect.bottom + defaultOffset)
                );
                expect(round(targetRect.left)).not.to.equal(
                    round(hintRect.left)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.top)).to.equal(
                        round(hintRect.bottom + defaultOffset)
                    );
                    expect(round(targetRect.left)).to.equal(
                        round(hintRect.left)
                    );
                });
            },
        },
        {
            position: 'top-right',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.top)).not.to.equal(
                    round(hintRect.bottom + defaultOffset)
                );
                expect(round(targetRect.right)).not.to.equal(
                    round(hintRect.right)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.top)).to.equal(
                        round(hintRect.bottom + defaultOffset)
                    );
                    expect(round(targetRect.right)).to.equal(
                        round(hintRect.right)
                    );
                });
            },
        },
        {
            position: 'right',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.right)).not.to.equal(
                    round(hintRect.left - defaultOffset)
                );
                expect(round(targetRect.top - hintRect.top)).not.to.equal(
                    round(hintRect.bottom - targetRect.bottom)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.right)).to.equal(
                        round(hintRect.left - defaultOffset)
                    );
                    expect(round(targetRect.top - hintRect.top)).to.equal(
                        round(hintRect.bottom - targetRect.bottom)
                    );
                });
            },
        },
        {
            position: 'right-top',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(targetRect.right).not.to.equal(
                    hintRect.left - defaultOffset
                );
                expect(targetRect.top).not.to.equal(hintRect.top);

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(targetRect.right).to.equal(
                        hintRect.left - defaultOffset
                    );
                    expect(targetRect.top).to.equal(hintRect.top);
                });
            },
        },
        {
            position: 'right-bottom',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.right)).not.to.equal(
                    round(hintRect.left - defaultOffset)
                );
                expect(round(targetRect.bottom)).not.to.equal(
                    round(hintRect.bottom)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.right)).to.equal(
                        round(hintRect.left - defaultOffset)
                    );
                    expect(round(targetRect.bottom)).to.equal(
                        round(hintRect.bottom)
                    );
                });
            },
        },
        {
            position: 'bottom',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(targetRect.bottom).not.to.equal(
                    hintRect.top - defaultOffset
                );
                expect(
                    Math.round(targetRect.left - hintRect.left)
                ).not.to.equal(Math.round(hintRect.right - targetRect.right));

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(targetRect.bottom).to.equal(
                        hintRect.top - defaultOffset
                    );
                    expect(
                        Math.round(targetRect.left - hintRect.left)
                    ).to.equal(Math.round(hintRect.right - targetRect.right));
                });
            },
        },
        {
            position: 'bottom-left',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.bottom)).not.to.equal(
                    round(hintRect.top - defaultOffset)
                );
                expect(round(targetRect.left)).not.to.equal(
                    round(hintRect.left)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.bottom)).to.equal(
                        round(hintRect.top - defaultOffset)
                    );
                    expect(round(targetRect.left)).to.equal(
                        round(hintRect.left)
                    );
                });
            },
        },
        {
            position: 'bottom-right',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.bottom)).not.to.equal(
                    round(hintRect.top - defaultOffset)
                );
                expect(round(targetRect.right)).not.to.equal(
                    round(hintRect.right)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.bottom)).to.equal(
                        round(hintRect.top - defaultOffset)
                    );
                    expect(round(targetRect.right)).to.equal(
                        round(hintRect.right)
                    );
                });
            },
        },
        {
            position: 'left',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.left)).not.to.equal(
                    round(hintRect.right + defaultOffset)
                );
                expect(round(targetRect.top - hintRect.top)).not.to.equal(
                    round(hintRect.bottom - targetRect.bottom)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.left)).to.equal(
                        round(hintRect.right + defaultOffset)
                    );
                    expect(round(targetRect.top - hintRect.top)).to.equal(
                        round(hintRect.bottom - targetRect.bottom)
                    );
                });
            },
        },
        {
            position: 'left-top',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.left)).not.to.equal(
                    round(hintRect.right + defaultOffset)
                );
                expect(round(targetRect.top)).not.to.equal(round(hintRect.top));

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.left)).to.equal(
                        round(hintRect.right + defaultOffset)
                    );
                    expect(round(targetRect.top)).to.equal(round(hintRect.top));
                });
            },
        },
        {
            position: 'left-bottom',
            assertion: () => {
                const hintRect = globalHint.getBoundingClientRect();
                const targetRect = globalTarget.getBoundingClientRect();

                expect(round(targetRect.left)).not.to.equal(
                    round(hintRect.right + defaultOffset)
                );
                expect(round(targetRect.bottom)).not.to.equal(
                    round(hintRect.bottom)
                );

                cy.wait(transitionDurationForAssert).then(() => {
                    const hintRect = globalHint.getBoundingClientRect();
                    const targetRect = globalTarget.getBoundingClientRect();

                    expect(round(targetRect.left)).to.equal(
                        round(hintRect.right + defaultOffset)
                    );
                    expect(round(targetRect.bottom)).to.equal(
                        round(hintRect.bottom)
                    );
                });
            },
        },
    ].forEach(({ position, assertion }) => {
        it(position, function () {
            cy.window().then(window => {
                cy.get(hintSelector).then(hint => {
                    cy.get(targetSelector).then(async target => {
                        const instance = new window.Newbie({
                            position,
                            transitionDuration,
                            hint: {
                                component: hint[0],
                            },
                            steps: [
                                {},
                                {
                                    target: target[0],
                                },
                            ],
                            arrow: { enabled: false },
                        });

                        await instance.start();
                        await instance.goNext();
                    });
                });
            });

            cy.get(hintSelector).then(hint => {
                cy.get(targetSelector).then(target => {
                    globalHint = hint[0];
                    globalTarget = target[0];
                    assertion();
                });
            });
        });
    });
});
