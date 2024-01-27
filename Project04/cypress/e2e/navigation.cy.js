/// <reference types="Cypress" />

describe('Page Navigation', () => {

  // Execte this before each test runs
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between pages', () => {
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('eq', '/about'); // This is for About page

    cy.go('back');
    cy.location('pathname').should('eq', '/'); // This is for Home page

    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('eq', '/'); // This is for Home page
  });
})