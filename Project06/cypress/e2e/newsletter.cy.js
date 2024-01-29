/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        // Setup test specific database
        cy.task('seedDatabase');
    });

    it('should display a success message', () => {
        cy.visit('/');

        cy.get('[data-cy="newsletter-email"]').type('test@test.com');
        cy.get('[data-cy="newsletter-submit"]').click();

        cy.contains('Thanks for signing up!');
    });
});