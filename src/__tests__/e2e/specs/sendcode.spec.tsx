//__tests__/e2e/specs/reset.spec.tsx
export {}

/**
 * http://localhost:3000/reset
*/


// assert errors are displayed when user submit without email
it("assert errors are displayed when user submit without an email", () => {
  cy.visit("http://localhost:3000/reset");
  // ensure test is done in reset page
  cy.get('#send__code__title').should('contain', 'Reset your password')
  // submit button
  cy.get("#send__code__button").click();
  // assert there are errors
  cy.get('#email__error').should('contain', 'Please enter your valid email address')
});

// assert error is displayed when user submit with wrong email and password
it("assert errors are displayed when user submit with wrong email and password", () => {
    var faker = require('faker');
    var randomEmail = faker.internet.email();
    cy.visit("http://localhost:3000/reset");
    // ensure test is done in reset page
    cy.get('#send__code__title').should('contain', 'Reset your password')
    // fill input email
    cy.get("#email").type(randomEmail);
    // submit button
    cy.get("#send__code__button").click();
    // assert there are errors
    cy.get('#send__code__error', { timeout: 10000 }).should('contain', 'Username/client id combination not found.')
});
  
// end