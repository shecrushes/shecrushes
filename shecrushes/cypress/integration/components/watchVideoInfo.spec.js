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

describe('video info', () => {
  it('check that video info exists', () => {
    // Start from a video page
    cy.visit('http://localhost:3000/watch/sombermistyrosepacaldGIrfS1sSHh');

    //
    // Make sure video title exists
    //

    // Click play button
    cy.get('[data-cy=VideoTitle]').contains(
      'Amateur Big Tits Boobs Bouncing Tits College Girls Teen Tits'
    );

    //
    // Make sure video star exists
    //
    cy.get('[data-cy=VideoStar]').contains('lamsinka89');

    //
    // Make sure video tags exist
    //
    cy.get('[data-cy=VideoTag]').first().contains('Amateur');
  });
});
