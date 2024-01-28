/// <reference types="cypress" />

describe('share location', () => {

  beforeEach(() => {

    // Access fixture file
    cy.fixture('user-location.json').as('userLocation');

    cy.visit('/').then( win => {

      // User Fixtures
      cy.get('@userLocation').then(fakePossitions => {
        // Stub to fake 'getCurrentPosition' method call
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as('getUserPosition')
          .callsFake((cb) => {
            // Call callback function with time out    
            setTimeout(() => {
              cb(fakePossitions);
            }, 100);
          });
      });

      // Returns a promiss when 'writeText' method calls
      cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();
        
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();

    // Once above button clicked, 'getCurrentPosition' method should get called.
    // Here in the test, we mock the 'getCurrentPosition'  with empty call
    cy.get('@getUserPosition').should('have.been.called');

    // Once the 'getLocation' btn called, it should be disabled and replace with new 'Location fetched!' text.
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched!');
  });

  it('should share the location URL', () => {
    cy.get('[data-cy="name-input"]').type('Test Name');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();

    cy.get('@saveToClipboard').should('have.been.called');
    cy.get('@userLocation').then(fakePossitions => {
      const {latitude, longitude} = fakePossitions.coords;
      cy.get('@saveToClipboard').should('have.been.calledWithMatch', new RegExp(`${latitude}.*${longitude}.*${encodeURI('Test Name')}`));
    });

  });

});
