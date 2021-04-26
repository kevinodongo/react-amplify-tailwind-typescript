//__tests__/e2e/specs/confirm.spec.tsx
export { }

/**
 * http://localhost:3000/confirm
*/


// assert errors are displayed when user submit without email and code
it("assert errors are displayed when user submit without an email and code", () => {
  cy.visit("http://localhost:3000/confirm");
  // ensure test is done in confirm page
  cy.get('#confirm__page__title').should('contain', 'Verify email address')
  // submit button
  cy.get("#confirm__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
  cy.get('#code__error').should('contain', 'Please enter a valid code we sent you')
});


// assert errors are displayed when user submit without an email
it("assert errors are displayed when user submit without an email", () => {
  var randomCode = "9281273"
  cy.visit("http://localhost:3000/confirm");
  // ensure test is done in confirm page
  cy.get('#confirm__page__title').should('contain', 'Verify email address')
  // fill input email
  cy.get("#code").type(randomCode);
  // submit button
  cy.get("#confirm__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
});


// assert errors are displayed when user submit without a code
it("assert errors are displayed when user submit without a code", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  cy.visit("http://localhost:3000/confirm");
  // ensure test is done in confirm page
  cy.get('#confirm__page__title').should('contain', 'Verify email address')
  // fill email field
  cy.get("#email").type(randomEmail);
  // submit button
  cy.get("#confirm__button").click();
  // assert there are errors
  cy.get('#code__error').should('contain', 'Please enter a valid code we sent you')
});



// assert error is displayed when user submit with wrong email and code
it("assert errors are displayed when user submit with wrong email and code", () => {
  var faker = require('faker');
  var randomEmail = faker.internet.email();
  var randomCode = "9281273"
  cy.visit("http://localhost:3000/confirm");
  // ensure test is done in confirm page
  cy.get('#confirm__page__title').should('contain', 'Verify email address')
  // fill input email
  cy.get("#email").type(randomEmail);
  cy.get("#code").type(randomCode);
  // submit button
  cy.get("#confirm__button").click();
  // assert there are errors
  cy.get('#confirm__attempt__error', { timeout: 10000 }).should('contain', 'Username/client id combination not found.')
});

// end