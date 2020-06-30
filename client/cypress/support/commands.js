// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('addRecipe', (payload) => {
  return cy
    .request({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      url: Cypress.config('backendUrl'),
      body: payload,
    })
    .then((response) => {
      const { recipe, success, message } = response.body.data.addRecipe;
      if (!success) {
        cy.log(`Error creating recipe: ${message}`);
      }
      return recipe?.id;
    });
});

Cypress.Commands.add('deleteRecipe', (payload) => {
  return cy.request({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    url: Cypress.config('backendUrl'),
    body: payload,
  });
});

Cypress.Commands.add('addTagType', (payload) => {
  return cy
    .request({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      url: Cypress.config('backendUrl'),
      body: payload,
    })
    .then((response) => {
      const { tagType, success, message } = response.body.data.addTagType;
      if (!success) {
        cy.log(`Error creating tag type: ${message}`);
      }
      return tagType;
    });
});

Cypress.Commands.add('deleteTagType', (payload) => {
  return cy.request({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    url: Cypress.config('backendUrl'),
    body: payload,
  });
});
