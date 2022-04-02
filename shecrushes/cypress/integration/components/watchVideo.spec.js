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

describe('video bar', () => {
  it('check that main video bar works', () => {
    // Start from a video page
    cy.visit('http://localhost:3000/watch/sombermistyrosepacaldGIrfS1sSHh');

    //
    // Test play button starts/pauses video
    //

    // Click play button
    cy.get('[data-cy=PlayButtonIcon]').first().click();

    // Make sure video is playing
    cy.get('[data-cy=MainVideo]')
      .should('have.prop', 'paused', false)
      .and('have.prop', 'ended', false);

    // Click pause button
    cy.get('[data-cy=PauseButtonIcon]').first().click();

    // Make sure video is paused
    cy.get('[data-cy=MainVideo]')
      .should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false);

    //
    // Test mute button mutes/unmutes video
    //

    // Click mute button
    cy.get('[data-cy=MuteButtonIcon]').first().click();

    // Click unmute button
    cy.get('[data-cy=UnMuteButtonIcon]').first().click();

    //
    // Test quality dropup buttons
    //

    // Click quality dropup
    cy.get('[data-cy=QualityDropupButton]').first().click();

    // Click 1080p button
    cy.get('[data-cy=1080pButton]').first().click();

    // Make sure quality badge has changed
    cy.get('[data-cy=QualityBage').contains('HD');

    // Click quality dropup
    cy.get('[data-cy=QualityDropupButton]').first().click();

    // Click 480p button
    cy.get('[data-cy=480pButton]').first().click();

    // Make sure quality badge has changed
    cy.get('[data-cy=QualityBage').contains('SD');
  });
});
