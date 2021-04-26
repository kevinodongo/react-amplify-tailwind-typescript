//__tests__/e2e/specs/login.spec.tsx
export {}

/**
 * http://localhost:3000/dashboard
 * Before running this test please replace email with 
 * a registered user and password
*/

it("assert user is logged out when sign out is clicked", () => {
  // log in
  cy.visit("http://localhost:3000/login");
  var email = "crudavid36@gmail.com"
  var password = "secure83"
  // fill input password and email
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  // submit button
  cy.get("#login__button").click();
  // assertions
  cy.location("pathname", { timeout: 10000 }).should("eq", "/dashboard");
  // open menu
  cy.get("#profile__menu__button").click();
  // sign out
  cy.get("#signout__button").click();
  // assertions
  cy.location("pathname").should("eq", "/login");
  // try going back to dashboard
  cy.visit("http://localhost:3000/dashboard");
});