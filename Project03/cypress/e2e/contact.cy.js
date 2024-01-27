/// <reference types="Cypress" />

describe('Contact Form', () => {
    it('should submit the form by Button Click', () => {
        cy.visit('http://localhost:5173/about');

        cy.get('[data-cy="contact-input-message"]').type('Message');
        cy.get('[data-cy="contact-input-name"]').type('Jay Sanka');
        cy.get('[data-cy="contact-input-email"]').type('jayasanka@email.com');

        // Chaining functions.
        cy.get('[data-cy="contact-btn-submit"]')
            .should('not.have.attr', 'disabled')
            .contains('Send Message');

        // Chaining functions with 'and'
        cy.get('[data-cy="contact-btn-submit"]')
            .and('not.have.attr', 'disabled')
            .contains('Send Message');

        // Direct element access via 'then' fn and 'expect'
        cy.get('[data-cy="contact-btn-submit"]').then((el) => {
            expect(el.attr('disabled')).to.be.undefined;
            expect(el.text()).to.eq('Send Message');
        });

        // Define an alias to a object wrapper
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');

    });

    it('should be able to submit via press Enter', () => {
        cy.visit('http://localhost:5173/about');

        cy.get('[data-cy="contact-input-message"]').type('Message');
        cy.get('[data-cy="contact-input-name"]').type('Jay Sanka');
        // Define an special key press
        cy.get('[data-cy="contact-input-email"]').type('jayasanka@email.com{enter}');

        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    });

    it('should validate the form inputs', () => {
        cy.visit('http://localhost:5173/about');

        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').then(el => {
            expect(el).to.not.have.attr('disabled');
            expect(el.text()).to.not.equal('Sending...');
        });
        cy.get('@submitBtn')
            .and('not.have.attr', 'disabled')
            .contains('Send Message');

        // Check inputs get apply correct style-sheets
        cy.get('[data-cy="contact-input-message"]').focus().blur();

        // This was pass in Cypress studio and failing while running as offline
        /* 
        cy.get('[data-cy="contact-input-message"]')
             .parent()
             .then( el => {
                 expect(el.attr('class')).to.contains('invalid');
             });
        */

        cy.get('[data-cy="contact-input-message"]')
             .parent()
             .should( el => {
                expect(el.attr('class')).not.to.be.undefined;
                expect(el.attr('class')).contains('invalid');
             });

        // Added blur() and focus() fuctions
        cy.get('[data-cy="contact-input-name"]').focus().blur();
        cy.get('[data-cy="contact-input-name"]')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/);
        
        cy.get('[data-cy="contact-input-email"]').focus().blur();
        cy.get('[data-cy="contact-input-email"]')
            .parent()
            .should('have.attr', 'class')
            .and('match', /invalid/);
    });
});