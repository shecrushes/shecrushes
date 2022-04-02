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

describe('desktop single video', () => {
  it('check that videos links work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000');

    // Set view port
    cy.viewport('macbook-16');

    cy.wait(500);

    // Check that video leads to correct link
    cy.get(`[data-cy=DesktopSingleVideo`)
      .first()
      .then((link) => {
        cy.request(link.prop('href'));
      });
  });

  it('check that videos tags work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000');

    // Set view port
    cy.viewport('macbook-16');

    // Check that video tag works
    cy.get(`[data-cy=CategoryTag`)
      .first()
      .then((link) => {
        cy.request(link.prop('href'));
      });
  });
});
