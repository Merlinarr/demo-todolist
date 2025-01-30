describe('Todo E2E Tests', () => {
  before(() => {
    // Login and mock API
    cy.login();
    cy.mockTodoApis();
  });

  beforeEach(() => {
    // Visit todo page
    cy.visit('/todo');
  });

  it('should create a new todo', () => {
    const todoText = 'New Test Todo';
    cy.get('[data-test="todo-input"]').type(todoText);
    cy.get('[data-test="add-button"]').click();
    cy.contains(todoText).should('be.visible');
  });
}); 