/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('move through the application authentication flow', () => {
  //   it('sign up a user', () => {
  //     // Start from signup page
  //     cy.visit('http://localhost:3000/signup');

  //     // Set view port
  //     cy.viewport('iphone-xr');

  //     // Type in username input
  //     cy.get(`[data-cy=UsernameInput`).type('testUser00');

  //     // Type in the email input
  //     cy.get(`[data-cy=EmailInput`).type('futuerfortnite@gmail.com');

  //     // Type in password
  //     cy.get(`[data-cy=PasswordInput`).type('Test123!');

  //     // Type in confirm password
  //     cy.get(`[data-cy=confirmPasswordInput`).type('Test123!');

  //     // Click submit button
  //     // cy.get(`[data-cy=SignupButton`).click();
  //   });

  it('sign in a user', () => {
    // Start from signup page
    cy.visit('http://localhost:3000/signin');

    // Set view port
    cy.viewport('iphone-xr');

    // Type in the email input
    cy.get(`[data-cy=EmailInput`).type('besera6806@toudrum.com');

    // Type in password
    cy.get(`[data-cy=PasswordInput`).type('Test123!');

    // Click submit button
    cy.get(`[data-cy=SigninButton`).click();
  });

  it('sign out a user', () => {
    // Go to explore page
    cy.visit('http://localhost:3000');

    // Set viewport to mobile size
    cy.viewport('iphone-xr');

    // Open menu
    cy.get('[data-cy=MobileFeedOpenMenu]').click();

    // Click on signout item
    cy.get(`[data-cy=SignoutItem]`).click();
  });
});
