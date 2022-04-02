// /// <reference types="cypress" />

// // Welcome to Cypress!
// //
// // This spec file contains a variety of sample tests
// // for a todo list app that are designed to demonstrate
// // the power of writing tests in Cypress.
// //
// // To learn more about how Cypress works and
// // what makes it such an awesome testing tool,
// // please read our getting started guide:
// // https://on.cypress.io/introduction-to-cypress

// describe('video feed', () => {
//   it('check that videos are being fetched as user scrolls down on desktop', () => {
//     // Start from the homepage
//     cy.visit('http://localhost:3000');

//     // Scroll down to bottom of page
//     cy.scrollTo('bottom');

//     // Check that the api request returns a 200
//     cy.intercept('/category/', { hostname: 'localhost' }, (req, res) => {
//       expect(res.status).to.eq(200);
//     });
//   });

//   it('check that videos are being fetched as user scrolls down on mobile', () => {
//     // Start from the homepage
//     cy.visit('http://localhost:3000');

//     // Viewport
//     cy.viewport('iphone-xr');

//     // Scroll down to bottom of page
//     cy.scrollTo(0, 1000, { ensureScrollable: false });

//     // Check that the api request returns a 200
//     cy.intercept('/category/', { hostname: 'localhost' }, (req, res) => {
//       expect(res.status).to.eq(200);
//     });
//   });
// });
