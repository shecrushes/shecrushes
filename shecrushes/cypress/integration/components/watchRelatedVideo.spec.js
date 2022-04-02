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

describe('related videos', () => {
  it('check that related videos column exists and has 5 items', () => {
    // Start from a video page
    cy.visit('http://localhost:3000/watch/sombermistyrosepacaldGIrfS1sSHh');

    //
    // Make sure there are 5 items in the related video column
    //

    // Get number of videos in column
    cy.get('[data-cy=RelatedVideos]').children().should('have.length', 5);
  });

  it('check that related video has all elements', () => {
    //
    // Make sure that related video component has all elements
    //

    // Make sure related video has image
    cy.get('[data-cy=RelatedVideoImage]').first().should('have.attr', 'src');

    // Make sure related video has title
    cy.get('[data-cy=RelatedVideoTitle]').first();

    // Make sure related video has star
    cy.get('[data-cy=RelatedVideoStar]').first();
  });
});
