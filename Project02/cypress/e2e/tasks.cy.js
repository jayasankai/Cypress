/// <reference types="Cypress" />

describe('task managemnt', () => {
    it('should Open and Close the new task model', () => {
        cy.visit('http://localhost:5173/');

        cy.contains('Add Task').click();
        cy.get('.backdrop').click({force:true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.contains('Add Task').click();
        cy.contains('Cancel').click();
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should create new task' , () => {
        cy.visit('http://localhost:5173/');

        // Actions
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some Description');
        cy.get('.modal').contains('Add Task').click();

        // Validations
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New Task');
        cy.get('.task p').contains('Some Description');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');

        // Actions
        cy.contains('Add Task').click();
        cy.get('.modal').contains('Add Task').click();

        // Validations
        cy.get('.error-message').contains('Please provide values');
    });

    it('should filter tasks', () => {
        cy.visit('http://localhost:5173/');

        // Actions
        cy.contains('Add Task').click();
        cy.get('#title').type('New Task');
        cy.get('#summary').type('Some Description');
        cy.get('#category').select('urgent');
        cy.get('.modal').contains('Add Task').click();
        // Validation for task
        cy.get('.task').should('have.length', 1);

        //Filter actions
        cy.get('#filter').select('moderate');
        // Validation for task
        cy.get('.task').should('have.length', 0);

        //Filter actions
        cy.get('#filter').select('urgent');
        // Validation for task
        cy.get('.task').should('have.length', 1);

        //Filter actions
        cy.get('#filter').select('all');
        // Validation for task
        cy.get('.task').should('have.length', 1);
    });

    it('should add multile tasks', () => {
        cy.visit('http://localhost:5173/');

        // Actions
        cy.contains('Add Task').click();
        cy.get('#title').type('Task 01');
        cy.get('#summary').type('First Task');
        cy.get('.modal').contains('Add Task').click();
        // validate task 01 creation
        cy.get('.task').should('have.length', 1);

        cy.contains('Add Task').click();
        cy.get('#title').type('Task 02');
        cy.get('#summary').type('Second Task');
        cy.get('.modal').contains('Add Task').click();
        // Validate task 02 creation
        cy.get('.task').should('have.length', 2);

        // Validate order of the tasks
        cy.get('.task').eq(0).contains('First Task');
        cy.get('.task').eq(1).contains('Second Task');

    });
});