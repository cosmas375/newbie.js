describe('z-index', () => {
    const getZIndex = elem => Number(getComputedStyle(elem[0]).zIndex) || 0;

    it('shadow must be placed under the hint', function () {
        cy.visit('tests/e2e/positioning.html');
        cy.window().then(window => {
            cy.get('#newbie-hint').then(hint => {
                cy.get('[data-newbie-target="1"]').then(async target => {
                    const instance = new window.Newbie({
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

        cy.get('.newbie-shadow').then(shadow => {
            cy.get('.newbie-hint-wrap').then(hintWrap => {
                cy.get('.newbie-hint-wrap__arrow').then(arrow => {
                    cy.get('.newbie-hint-wrap__container').then(hint => {
                        expect(getZIndex(hintWrap)).to.be.greaterThan(getZIndex(shadow));
                    });
                });
            });
        });
    });

    it('hint must be placed under the arrow', function () {
        cy.visit('tests/e2e/positioning.html');
        cy.window().then(window => {
            cy.get('#newbie-hint').then(hint => {
                cy.get('[data-newbie-target="1"]').then(async target => {
                    const instance = new window.Newbie({
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

        cy.get('.newbie-shadow').then(shadow => {
            cy.get('.newbie-hint-wrap').then(hintWrap => {
                cy.get('.newbie-hint-wrap__arrow').then(arrow => {
                    cy.get('.newbie-hint-wrap__container').then(hint => {
                        expect(getZIndex(arrow)).to.be.greaterThan(getZIndex(hint));
                    });
                });
            });
        });
    });
});
