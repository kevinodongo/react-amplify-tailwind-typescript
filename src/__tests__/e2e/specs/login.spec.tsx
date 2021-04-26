//__tests__/e2e/specs/login.spec.tsx
export {}

/**
 * http://localhost:3000/login
 * - Add a test to ensure when user login they are redirected dashboard
*/

// assert forget password button redirects to reset page
it("assert forget password button redirects to reset page", () => {
  cy.visit("http://localhost:3000/login");
   // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // get forgot password button and click
  cy.get("#forgot__password").click();
  // assertions
  cy.location("pathname").should("eq", "/reset");
  // back to login page
  cy.visit("http://localhost:3000/login");
});

// assert signup button redirects to signup page
it("assert signup button redirects to signup page", () => {
  cy.visit("http://localhost:3000/login");
  // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // submit
  cy.get("#no__account").click();
  // assertions
  cy.location("pathname").should("eq", "/signup");
  // back to login page
  cy.visit("http://localhost:3000/login");
});

// assert errors are displayed when user submit without password and no email
it("assert errors are displayed when user submit without password and email", () => {
  cy.visit("http://localhost:3000/login");
  // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // submit
  cy.get("#login__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
  cy.get('#password__error').should('contain', 'Please enter your password')
});

// assert errors are displayed when user submit with password and no email
it("assert errors are displayed when user submit with password and no email", () => {
  var faker = require('faker');
  var randomPassword = faker.internet.password();
  cy.visit("http://localhost:3000/login");
  // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // fill input password
  cy.get("#password").type(randomPassword);
  // submit
  cy.get("#login__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
});

// assert errors are displayed when user submit with email and no password
it("assert errors are displayed when user submit with email and no password", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  cy.visit("http://localhost:3000/login");
  // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // fill input password
  cy.get("#email").type(randomEmail);
  // submit
  cy.get("#login__button").click();
  // assert there are errors
  cy.get('#password__error').should('contain', 'Please enter your password')
});

// assert error is displayed when user submit with wrong email and password
it("assert errors are displayed when user submit with wrong email and password", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  var randomPassword = faker.internet.password();
  cy.visit("http://localhost:3000/login");
  // ensure test is done in login page
  cy.get('#login__page__title').should('contain', 'Sign in to your account')
  // fill input password and email
  cy.get("#email").type(randomEmail);
  cy.get("#password").type(randomPassword);
  // submit
  cy.get("#login__button").click();
  // assert there are errors
  cy.get('#login__attempt__error', { timeout: 10000 }).should('contain', 'User does not exist.')
});

// end