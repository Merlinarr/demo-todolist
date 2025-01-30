// Base API URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Add login command
Cypress.Commands.add('login', () => {
  // Actual login request
  cy.request('POST', `${API_BASE_URL}/auth/signin`, {
    email: 'test@gmail.com',
    password: '1234'
  }).then((response) => {
    // Store actual token and user info
    const { token, user } = response.body.data;
    
    // Update localStorage
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));

    // Store token in Cypress env for later use
    Cypress.env('token', token);

    // Set up global request headers for all subsequent requests
    cy.wrap(token).as('authToken');
    cy.intercept('*', (req) => {
      req.headers['Authorization'] = `Bearer ${token}`;
    });
  });

  // Visit page and update Redux store
  cy.visit('/todo');
});

// Add Todo API aliases
Cypress.Commands.add('mockTodoApis', () => {
  // Set up API route aliases
  cy.intercept('GET', `${API_BASE_URL}/tasks`).as('getTodos');
  cy.intercept('POST', `${API_BASE_URL}/tasks`).as('createTodo');
  cy.intercept('PATCH', `${API_BASE_URL}/tasks/*`).as('updateTodo');
  cy.intercept('DELETE', `${API_BASE_URL}/tasks/*`).as('deleteTodo');
}); 