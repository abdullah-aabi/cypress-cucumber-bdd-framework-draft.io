describe('Test drag and drop', () => {
    it('Creates an item and moves it', () => {
        cy.intercept(/ka-f.fontawesome.com*/, (req) => { req.destroy() });
        cy.visit('https://recette.draft.io/z2t2b5kem2mkfbn5b69vx83t9x6vgtcrw3r6c7ry5b5p');
        cy.wait(4000).then(() => {
            let target = Cypress.$('.map-viewport')[1];
            cy.window().then((window) => {
                cy.document().then((document) => {
                    // moving the viewport to an initial position
                    window.edit.viewport.move({ center : [document.body.offsetWidth / 2, document.body.offsetHeight / 2] });

                    // removing potential items on the draft (multiple select (ctrl + drag & drop) then backspace key)
                    target.dispatchEvent(new PointerEvent('pointerdown', { bubbles : true, clientX : 68, clientY : 68, ctrlKey : true }));
                    target.dispatchEvent(new PointerEvent('pointermove', { bubbles : true, clientX : 1000, clientY : 1000, ctrlKey : true }));
                    target.dispatchEvent(new PointerEvent('pointerup', { bubbles : true, clientX : 1000, clientY : 1000, ctrlKey : true }));
                    cy.get('body').trigger('keydown', { keyCode: 46 });

                    cy.wait(350).then(() => { // we have to wait for the double-click trigger to disappear, it is set at 350
                        // counting the number of items on the draft, should be 0 since we deleted all
                        expect(document.querySelectorAll('.draft-edit > .map-viewport .vertice').length).to.equal(1);

                        // creating a new item by double-clicking on the draft & typing some test in it
                        target.dispatchEvent(new PointerEvent('pointerdown', { bubbles : true, clientX : 400, clientY : 400 }));
                        target.dispatchEvent(new PointerEvent('pointerup', { bubbles : true, clientX : 400, clientY : 400 }));
                        target.dispatchEvent(new PointerEvent('pointerdown', { bubbles : true, clientX : 400, clientY : 400 }));
                        target.dispatchEvent(new PointerEvent('pointerup', { bubbles : true, clientX : 400, clientY : 400 }));

                        // now we should have 1 item on the draft
                        expect(document.querySelectorAll('.draft-edit > .map-viewport .vertice').length).to.equal(2);
                        let createdItem = document.querySelectorAll('.draft-edit > .map-viewport .vertice')[0];

                        // we type some text in the item, otherwise on clickout it will be removed
                        cy.get('.vertice textarea').type('test');

                        cy.get('.quickstyle3').click();
                        cy.get('.right-click .panel2 .entry.postit-rectangle').click();

                        cy.wait(350).then(() => { // avoid the double-click trigger
                            // click out to deselect object
                            target.dispatchEvent(new PointerEvent('pointerdown', { bubbles : true, clientX : 600, clientY : 100 }));
                            target.dispatchEvent(new PointerEvent('pointerup', { bubbles : true, clientX : 600, clientY : 100 }));
                            
                            cy.wait(350).then(() => { // avoid the double-click trigger
                                // move the item 104px to the right
                                let startingPos = createdItem.offsetLeft;

                                target.dispatchEvent(new PointerEvent('pointerdown', { bubbles : true, clientX : 401, clientY : 401 }));
                                target.dispatchEvent(new PointerEvent('pointermove', { bubbles : true, clientX : 505, clientY : 401 }));
                                target.dispatchEvent(new PointerEvent('pointerup', { bubbles : true, clientX : 505, clientY : 401 }));
                                
                                // if the grid is active, the item should now be 100px to the right, otherwise it will be 104px to the right
                                expect(createdItem.offsetLeft).to.equal(startingPos);
                            });
                        });
                    });
                });
            });
        });
    });
});
