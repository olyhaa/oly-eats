describe('Recipe Page', () => {
  beforeEach(() => {
    cy.fixture('add-recipe-payload.json').as('recipeData');
    cy.get('@recipeData').then((addRecipePayload) => {
      cy.visit('/home');
      cy.get('[data-test="search-box"]')
        .should('be.visible')
        .type(addRecipePayload.variables.recipe.title);
      cy.get('[data-test="recipe-list-item"]').should('have.length', 0);

      // add test recipe to DB
      cy.addRecipe(addRecipePayload).as('recipeId');
      cy.visit('/home');
      cy.get('[data-test="search-box"]')
        .should('be.visible')
        .type(addRecipePayload.variables.recipe.title);
      cy.get('[data-test="recipe-list-item"]').should('have.length', 1);
      cy.get('[data-test="search-box"]').clear();
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

  it('Search Recipe by Ingredient', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      cy.get('@recipeData').then((recipeData) => {
        const initialCount = $list.length;
        expect(initialCount > 0).to.be.true;

        const searchIngredient =
          recipeData.variables.recipe.ingredients[0].ingredients[0].name;
        cy.get('[data-test="search-box"]')
          .should('be.visible')
          .clear()
          .type(`i:"${searchIngredient}"`);

        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be.lt', initialCount)
          .should('be.gt', 0);

        cy.get('[data-test="recipe-title"]').should(
          'contain',
          recipeData.variables.recipe.title
        );

        cy.get('[data-test="search-box"]').clear();
        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be', initialCount);
      });
    });
  });

  it('Search Recipe by Source', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      cy.get('@recipeData').then((recipeData) => {
        const initialCount = $list.length;
        expect(initialCount > 0).to.be.true;

        const searchSource = recipeData.variables.recipe.source.display;
        cy.get('[data-test="search-box"]')
          .should('be.visible')
          .clear()
          .type(`s:"${searchSource}"`);

        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be.lt', initialCount)
          .should('be.gt', 0);

        cy.get('[data-test="recipe-title"]').should(
          'contain',
          recipeData.variables.recipe.title
        );

        cy.get('[data-test="search-box"]').clear();
        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be', initialCount);
      });
    });
  });

  it('Search Recipe by Timing', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      cy.get('@recipeData').then((recipeData) => {
        const initialCount = $list.length;
        expect(initialCount > 0).to.be.true;

        const searchTiming = 120;
        cy.get('[data-test="search-box"]')
          .should('be.visible')
          .clear()
          .type(`time:"${searchTiming}"`);

        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be.lt', initialCount)
          .should('be.gt', 0);

        cy.get('[data-test="recipe-title"]').should(
          'contain',
          recipeData.variables.recipe.title
        );

        cy.get('[data-test="search-box"]').clear();
        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be', initialCount);
      });
    });
  });

  it('Search Recipe by Tag', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      cy.get('@recipeData').then((recipeData) => {
        const initialCount = $list.length;
        expect(initialCount > 0).to.be.true;

        const searchTag = 'bakery';
        cy.get('[data-test="search-box"]')
          .should('be.visible')
          .clear()
          .type(`tag:"${searchTag}"`);

        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be.lt', initialCount)
          .should('be.gt', 0);

        cy.get('[data-test="recipe-title"]').should(
          'contain',
          recipeData.variables.recipe.title
        );

        cy.get('[data-test="search-box"]').clear();
        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be', initialCount);
      });
    });
  });
});
