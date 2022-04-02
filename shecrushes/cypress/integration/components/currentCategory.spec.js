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

describe('current categpory tag', () => {
  it('check that category tag matches current category on desktop', () => {
    // Start from tiktok category page
    cy.visit('http://localhost:3000/category/tiktok');

    // Check that the category tag matches the href it leads to
    cy.get('[data-cy=tiktokTag').then((link) => {
      cy.request(link.prop('href'));
    });

    // Check that video tags text matches pages url
    cy.url().should('include', '/category/tiktok');
  });

  it('check that category tag matches current category on mobile', () => {
    // Start from tiktok category page
    cy.visit('http://localhost:3000/category/tiktok');

    // Set view port
    cy.viewport('iphone-xr');

    // Check that the category tag matches the href it leads to
    cy.get('[data-cy=tiktokTag').then((link) => {
      cy.request(link.prop('href'));
    });

    // Check that video tags text matches pages url
    cy.url().should('include', '/category/tiktok');
  });
});
