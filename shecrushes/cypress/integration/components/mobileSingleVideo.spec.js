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

describe('mobile single video', () => {
  it('check that the videos tags work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000');

    // Set view port
    cy.viewport('iphone-xr');

    cy.wait(2000);

    // Check that video tag works
    cy.get(`[data-cy=CategoryTag`)
      .first()
      .then((link) => {
        cy.request(link.prop('href'));
      });
  });

  it('check that the watch video button works', () => {
    // Set view port
    cy.viewport('iphone-xr');

    // Check that video tag works
    cy.get(`[data-cy=WatchVideo`)
      .first()
      .then((link) => {
        cy.request(link.prop('href'));
      });
  });

  it('check that video audio toggle on', () => {
    // Set view port
    cy.viewport('iphone-xr');

    // Click audio toggle
    cy.get(`[data-cy=SingleMobileVideo`).first().click({ force: true });

    // Check that video is unmuted
    cy.get('[data-cy=SingleMobileVideo')
      .first()
      .should('have.prop', 'muted', false);
  });

  it('check that video audio toggle off', () => {
    // Click audio toggle
    cy.get(`[data-cy=SingleMobileVideo`).first().click({ force: true });

    // Check that video is muted
    cy.get('[data-cy=SingleMobileVideo').should('have.prop', 'muted', true);
  });
});
