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

describe('categories', () => {
  it('check that homepage categories work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000');

    // Set view port
    cy.viewport('macbook-16');

    // Check each nav item
    const categoryItems = [
      'Tiktok',
      'Lesbian',
      'Cumshot',
      'Asian',
      'Teen',
      'Amateur',
      'Ass',
      'Tits',
      'Pussy',
      'Blowjob',
      'Celebrity',
      'Dildo',
      'Blonde',
    ];

    // For each item, make a http get request to each link
    categoryItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });
  });

  it('check that explore page categories work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/explore');

    // Set view port
    cy.viewport('macbook-16');

    // Check each nav item
    const categoryItems = [
      'Tiktok',
      'Lesbian',
      'Cumshot',
      'Asian',
      'Amateur',
      'Ass',
      'Tits',
      'Pussy',
      'Blowjob',
      'Celebrity',
    ];

    // For each item, make a http get request to each link
    categoryItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });
  });

  it('check that categories page categories work', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/categories');

    // Set view port
    cy.viewport('macbook-16');

    // Check each nav item
    const categoryItems = [
      'Tiktok',
      'Ass',
      'Lesbian',
      'Femboy',
      'Asian',
      'Tits',
      'Teen',
      'Blonde',
      'Webcam',
      'Celebrity',
      'Dildo',
      'Pussy',
      'Amateur',
      'Rough',
      'Cumshot',
      'Blowjob',
      'Hardcore',
      'Doggystyle',
      'Gay',
      'Facial',
      'Petite',
      'Anal',
      'Big Tits',
      'Pornstar',
      'BBC',
      '18 Years Old',
      'Riding',
      'Latina',
      'Homemade',
      'NSFW',
      'Japanese',
      'Threesome',
    ];

    // For each item, make a http get request to each link
    categoryItems.forEach((item) => {
      cy.get(`[data-cy=${item}`).then((link) => {
        cy.request(link.prop('href'));
      });
    });
  });
});
