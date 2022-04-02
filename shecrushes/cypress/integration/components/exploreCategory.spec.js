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

describe('explore page category', () => {
  it('check that category has 3 videos', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/explore');

    // Check that the category wrapper has 3 videos
    cy.get('[data-cy=ExploreCategory')
      .first()
      .find('div.categoryItem')
      .should('have.length', 3);
  });

  it('check that category videos links work', () => {
    // Check that first video leads to correct link
    cy.get('[data-cy=ExploreCategoryVideo')
      .first()
      .then((link) => {
        cy.request(link.prop('href'));
      });

    // Check that second video leads to correct link
    cy.get('[data-cy=ExploreCategoryVideo')
      .eq(2)
      .then((link) => {
        cy.request(link.prop('href'));
      });

    // Check that third video leads to correct link
    cy.get('[data-cy=ExploreCategoryVideo')
      .eq(3)
      .then((link) => {
        cy.request(link.prop('href'));
      });
  });
});
