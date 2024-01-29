/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        // Setup test specific database
        cy.task('seedDatabase');
    });

    it('should display a success message', () => {
        // Intercept HTTP request comming to /newsletter
        cy.intercept('POST', '/newsletter*', {status:201}).as('subscribe');

        cy.visit('/');

        cy.get('[data-cy="newsletter-email"]').type('test@test.com');
        cy.get('[data-cy="newsletter-submit"]').click();

        cy.wait('@subscribe');
        cy.contains('Thanks for signing up!');
    });

    it('should display validation message', () => {
        // Intercept HTTP request comming to /newsletter
        cy.intercept('POST', '/newsletter*', {message:"Email exists already!"}).as('subscribe');

        cy.visit('/');

        cy.get('[data-cy="newsletter-email"]').type('test@test.com');
        cy.get('[data-cy="newsletter-submit"]').click();

        cy.wait('@subscribe');
        cy.contains('Email exists already!');
    });

    // Backend testing.
    it('should successfully create a new contact', () => {
        cy.request({
            method : 'POST',
            url : '/newsletter',
            body : {
                email : 'test@test.com'
            },
            form : true
        }).then((res) => {
            expect(res.status).to.eq(201);
        });
    });
});