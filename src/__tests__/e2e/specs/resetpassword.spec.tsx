//__tests__/e2e/specs/reset.spec.tsx
export {}

/**
 * http://localhost:3000/reset/password
*/


// assert errors are displayed when user submit without email, code and password
it("assert errors are displayed when user submit without an email", () => {
  cy.visit("http://localhost:3000/reset/password");
  // ensure test is done in reset password page
  cy.get('#reset__title').should('contain', 'Reset your password')
  // submit button
  cy.get("#reset__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
  cy.get('#code__error').should('contain', 'Please enter the password reset code')
  cy.get('#password__error').should('contain', 'Please enter your password')
});


// assert errors are displayed when user submit without email
it("assert errors are displayed when user submit without an email", () => {
  var faker = require('faker');
  var randomPassword = faker.internet.password();
  var randomCode = "9281273"
  cy.visit("http://localhost:3000/reset/password");
  // ensure test is done in reset password page
  cy.get('#reset__title').should('contain', 'Reset your password')
  // fill input password and code
  cy.get("#password").type(randomPassword);
  cy.get("#code").type(randomCode);
  // submit button
  cy.get("#reset__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
});

// assert errors are displayed when user submit without code
it("assert errors are displayed when user submit without a code", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  var randomPassword = faker.internet.password();
  cy.visit("http://localhost:3000/reset/password");
  // ensure test is done in reset password page
  cy.get('#reset__title').should('contain', 'Reset your password')
  // fill input password and code
  cy.get("#password").type(randomPassword);
  cy.get("#email").type(randomEmail);
  // submit button
  cy.get("#reset__button").click();
  // assert there are errors
  cy.get('#code__error').should('contain', 'Please enter the password reset code')
});

// assert errors are displayed when user submit without password
it("assert errors are displayed when user submit without a password", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  var randomCode = "9281273"
  cy.visit("http://localhost:3000/reset/password");
  // ensure test is done in reset password page
  cy.get('#reset__title').should('contain', 'Reset your password')
  // fill input password and code
  cy.get("#email").type(randomEmail);
  cy.get("#code").type(randomCode);
  // submit button
  cy.get("#reset__button").click();
  // assert there are errors
  cy.get('#password__error').should('contain', 'Please enter your password')
});


// assert error is displayed when user submit with wrong email, code and password
it("assert errors are displayed when user submit with wrong email and password", () => {
    var faker = require('faker');
    var randomEmail = faker.internet.email();
    var randomPassword = faker.internet.password();
    var randomCode = "9281273"
    cy.visit("http://localhost:3000/reset/password");
    // ensure test is done in reset page
    cy.get('#reset__title').should('contain', 'Reset your password')
    // fill input email, code and password
    cy.get("#email").type(randomEmail);
    cy.get("#code").type(randomCode);
    cy.get("#password").type(randomPassword);
    // submit button
    cy.get("#reset__button").click();
    // assert there are errors
    cy.get('#reset__alert__attempt', { timeout: 10000 }).should('contain', 'Username/client id combination not found.')
});
  
// end