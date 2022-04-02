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

describe('Navigation', () => {
  it('should check that all desktop navbar elements work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Set view port
    cy.viewport('macbook-16');

    // Check each nav item
    const navbarItems = [
      'navbarLogo',
      'FeedItem',
      'ExploreItem',
      'CategoriesItem',
      'WebcamsItem',
      'LiveSexItem',
      'SexGamesItem',
    ];

    // For each item, make a http get request to each link
    navbarItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });
  });

  it('should check that all mobile navbar elements work', () => {
    // Go to explore page
    cy.visit('http://localhost:3000/explore');

    // Set viewport to mobile size
    cy.viewport('iphone-xr');

    // Open menu
    cy.get('[data-cy=OpenMobileMenu]').click();

    // Check each nav item
    const navbarItems = [
      'navbarLogo',
      'FeedItem',
      'ExploreItem',
      'CategoriesItem',
      'WebcamsItem',
      'LiveSexItem',
      'SexGamesItem',
    ];

    // For each item, make a http get request to each link
    navbarItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });

    // Close menu
    cy.get('[data-cy=CloseMobileMenu]').click();
  });

  it('should check that all mobile feed navbar elements work', () => {
    // Go to explore page
    cy.visit('http://localhost:3000/');

    // Set viewport to mobile size
    cy.viewport('iphone-xr');

    // Open menu
    cy.get('[data-cy=MobileFeedOpenMenu]').click();

    // Check each nav item
    const navbarItems = [
      'navbarLogo',
      'FeedItem',
      'ExploreItem',
      'CategoriesItem',
      'WebcamsItem',
      'LiveSexItem',
      'SexGamesItem',
    ];

    // For each item, make a http get request to each link
    navbarItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });

    // Close menu
    cy.get('[data-cy=CloseMobileMenu]').click();
  });
});
