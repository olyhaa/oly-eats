describe('Recipe Page', () => {
  beforeEach(() => {
    // add test recipe to DB and navigate to its page
    cy.fixture('add-recipe-payload.json').then((addRecipePayload) => {
      cy.addRecipe(addRecipePayload).as('recipeId');
      cy.fixture('recipe-data.json').as('recipeData');
    });
    cy.get('@recipeId').then((recipeId) => {
      cy.visit(`/recipe/${recipeId}`);
      cy.get('@recipeData').then((recipeData) => {
        cy.get('[data-test="app-title"]').contains(recipeData.recipeTitle);
      });
    });
  });

  afterEach(() => {
    // delete test recipe from DB
    cy.fixture('delete-recipe-payload.json').then((deleteRecipePayload) => {
      cy.get('@recipeId').then((recipeId) => {
        deleteRecipePayload.variables.id = recipeId;
        cy.deleteRecipe(deleteRecipePayload);
      });
    });
  });

  it('Should render recipe page fields', () => {
    cy.get('[data-test="recipe-photo"]').should('be.visible');
    cy.get('[data-test="card-description"]').should('be.visible');
    cy.get('[data-test="card-prep"]').should('be.visible');
    cy.get('[data-test="card-total_time"]').should('be.visible');
    cy.get('[data-test="card-servings"]').should('be.visible');
    cy.get('[data-test="card-date_added"]').should('be.visible');
    cy.get('[data-test="card-source"]').should('be.visible');
    cy.get('[data-test="ingredient-box"]').should('be.visible');
    cy.get('[data-test="ingredient-section"]').should('have.length', 2);
    cy.get('[data-test="directions-box"]').should('be.visible');
    cy.get('[data-test="directions-section"]').should('have.length', 2);
    cy.get('[data-test="action-menu"]').should('be.visible');
  });

  it('Delete', () => {
    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Delete"]').should('be.visible').click();

    cy.get('[data-test="delete-modal-title"]').should('be.visible');
    cy.get('[data-test="delete-modal-text"]').should('be.visible');
    cy.get('[data-test="delete-modal-cancel"]').should('be.visible');
    cy.get('[data-test="delete-modal-confirm"]').should('be.visible');

    cy.get('[data-test="delete-modal-cancel"]').click();
    cy.url().should('contain', '/recipe');

    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Delete"]').should('be.visible').click();

    cy.get('[data-test="delete-modal-confirm"]').click();
    cy.url().should('contain', '/home');
  });

  it('Edit Recipe Navigation', () => {
    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Edit"]').should('be.visible').click();
    cy.url().should('contain', '/editRecipe');
  });
});
