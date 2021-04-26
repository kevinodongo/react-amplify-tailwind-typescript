//__tests__/e2e/specs/signup.spec.tsx
export {}

/**
 * http://localhost:3000/signup
*/


// assert sign in button redirects to log in
it("assert sign in button redirects to login page", () => {
  cy.visit("http://localhost:3000/signup");
  // ensure test is done in login page
  cy.get('#signup__page__title').should('contain', 'Create an account')
  // submit button
  cy.get("#have__account").click();
  // assertions
  cy.location("pathname").should("eq", "/login");
  // back to signup page
  cy.visit("http://localhost:3000/signup");
});

// assert errors are displayed when user submit without username, password and email
it("assert errors are displayed when user submit without username, password and email", () => {
  cy.visit("http://localhost:3000/signup");
  // ensure test is done in signup page
  cy.get('#signup__page__title').should('contain', 'Create an account')
  // submit button
  cy.get("#signup__button").click();
  // assert there are errors
  cy.get('#username__error').should('contain', 'Please provide a username or your full names')
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
  cy.get('#password__error').should('contain', 'Please enter your password')
});

// assert errors are displayed when user submit without username
it("assert errors are displayed when user submit without username", () => {
    var faker = require('faker');
    var randomEmail = faker.internet.email();
    var randomPassword = faker.internet.password();
    cy.visit("http://localhost:3000/signup");
    // ensure test is done in signup page
    cy.get('#signup__page__title').should('contain', 'Create an account')
    // fill input password and email
    cy.get("#email").type(randomEmail);
    cy.get("#password").type(randomPassword);
    // submit button
    cy.get("#signup__button").click();
    // assert there are errors
    cy.get('#username__error').should('contain', 'Please provide a username or your full names')
  });

  // assert errors are displayed when user submit without password
it("assert errors are displayed when user submit without password", () => {
    var faker = require('faker');
    var randomEmail = faker.internet.email();
    var randomUsername = faker.internet.userName();
    cy.visit("http://localhost:3000/signup");
    // ensure test is done in signup page
    cy.get('#signup__page__title').should('contain', 'Create an account')
    // fill input password and email
    cy.get("#email").type(randomEmail);
    cy.get("#username").type(randomUsername);
    // submit button
    cy.get("#signup__button").click();
    // assert there are errors
    cy.get('#password__error').should('contain', 'Please enter your password')
  });


  // assert errors are displayed when user submit without email
it("assert errors are displayed when user submit without email", () => {
    var faker = require('faker');
    var randomUsername = faker.internet.userName();
    var randomPassword = faker.internet.password();
    cy.visit("http://localhost:3000/signup");
    // ensure test is done in signup page
    cy.get('#signup__page__title').should('contain', 'Create an account')
    // fill input password and email
    cy.get("#username").type(randomUsername);
    cy.get("#password").type(randomPassword);
    // submit button
    cy.get("#signup__button").click();
    // assert there are errors
    cy.get('#email__error').should('contain', 'Please enter your valid email address')
  });
// end