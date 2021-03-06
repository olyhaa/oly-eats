describe('Recipe Page', () => {
  beforeEach(() => {
    cy.fixture('recipe-data.json').as('recipeData');

    cy.get('@recipeData').then((recipeData) => {
      cy.visit('/home');
      cy.get('[data-test="search-box"]')
        .should('be.visible')
        .type(recipeData.recipeTitle);
      cy.get('[data-test="recipe-list-item"]').should('have.length', 0);

      // add test recipe to DB and navigate to its page
      cy.fixture('add-recipe-payload.json').then((addRecipePayload) => {
        cy.addRecipe(addRecipePayload).as('recipeId');

        cy.get('@recipeId').then((recipeId) => {
          cy.visit(`/recipe/${recipeId}`);
          cy.get('[data-test="app-title"]').contains(recipeData.recipeTitle);
        });
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

    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Edit"]').should('be.visible').click();
    cy.url().should('contain', '/editRecipe');
  });

  it('Should update serving size', () => {
    // check first ingredient value
    cy.get('[data-test="ingredient-list-item-string-0"] span')
      .should('be.visible')
      .contains('8 ounce all-purpose flour');

    // update the serving size
    cy.get('[data-test="card-servings"]')
      .should('be.visible')
      .find('[data-test="card-edit"]')
      .click({ force: true });

    cy.get('[data-test="edit-modal-input"] input')
      .should('be.visible')
      .clear()
      .type('16');
    cy.get('[data-test="edit-modal-confirm"]').should('be.visible').click();

    // check the first ingredient value
    cy.get('[data-test="ingredient-list-item-string-0"] span')
      .should('be.visible')
      .contains('16 ounce all-purpose flour');
  });

  it('Should update favorite', () => {
    // verify favorite is set
    cy.get('[data-test="favorite-start-true"]').should('be.visible');

    // unset favorite
    cy.get('[data-test="favorite-start-true"]').click();

    // verify favorite is updated
    cy.get('[data-test="favorite-start-false"]').should('be.visible');
  });

  it('Delete', () => {
    cy.log('Delete Cancel');
    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Delete"]').should('be.visible').click();

    cy.get('[data-test="delete-modal-title"]').should('be.visible');
    cy.get('[data-test="delete-modal-text"]').should('be.visible');
    cy.get('[data-test="delete-modal-cancel"]').should('be.visible');
    cy.get('[data-test="delete-modal-confirm"]').should('be.visible');

    cy.get('[data-test="delete-modal-cancel"]').click();
    cy.url().should('contain', '/recipe');

    cy.get('@recipeData').then((recipeData) => {
      cy.visit('/home');
      cy.get('[data-test="search-box"]')
        .should('be.visible')
        .type(recipeData.recipeTitle);

      cy.get('[data-test="recipe-list-item"]').should('have.length', 1).click();
    });

    cy.log('Delete Confirm');
    cy.get('[data-test="action-menu"]').should('be.visible').click();
    cy.get('[data-test="action-Delete"]').should('be.visible').click();

    cy.get('[data-test="delete-modal-confirm"]').click();
    cy.url().should('contain', '/home');

    cy.get('@recipeData').then((recipeData) => {
      cy.get('[data-test="search-box"]')
        .should('be.visible')
        .type(recipeData.recipeTitle);

      cy.get('[data-test="recipe-list-item"]').should('have.length', 0);
    });
  });
});
