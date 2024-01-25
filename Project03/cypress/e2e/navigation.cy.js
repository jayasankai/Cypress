/// <reference types="Cypress" />


describe('Page Navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="header-about-link"]').click();
  })
})