describe('Home Page - Search', () => {
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

  it('Edit search terms via UI', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      cy.get('@recipeData').then((recipeData) => {
        const initialCount = $list.length;
        expect(initialCount > 0).to.be.true;

        cy.log('expand search box');
        cy.get('[data-test="expand-search-area"]').click();

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

        cy.get('[data-test^="filter-item-"]').its('length').should('be', 1);

        cy.get('[data-test="category-select"]').should(
          'have.value',
          'INGREDIENT'
        );

        cy.get('[data-test="search-item-value"]').should(
          'have.value',
          searchIngredient
        );

        const newText = 'updated ingredient';
        cy.log('updating ingredient value');
        cy.get('[data-test="search-item-value"]').clear().type(newText);

        cy.get('[data-test="search-box"]').should(
          'have.value',
          `i:"${newText}"`
        );

        cy.log('updating search category value');
        cy.get('[data-test="category-dropdown"]').click();
        cy.get('[data-test="search-category-item"]').first().click();
        cy.get('[data-test="category-select"]').should('have.value', 'NAME');
        cy.get('[data-test="search-box"]').should('have.value', `"${newText}"`);

        cy.log('deleting search item');
        cy.get('[data-test="search-item-delete"]').click();

        cy.get('[data-test="search-box"]').should('have.value', '');

        cy.log('add search term via UI');
        const newAddText = 'my new search name';
        cy.get('[data-test="add-search-button"]').should('be.visible').click();
        cy.get('[data-test="category-dropdown"]').click();
        cy.get('[data-test="search-category-item"]').first().click();
        cy.get('[data-test="category-select"]').should('have.value', 'NAME');
        cy.get('[data-test="search-item-value"]').clear().type(newAddText);

        cy.get('[data-test="search-box"]').should(
          'have.value',
          `"${newAddText}"`
        );
        cy.get('[data-test="search-item-delete"]').click();

        cy.get('[data-test="recipe-list-item"]')
          .its('length')
          .should('be', initialCount);
      });
    });
  });
});
