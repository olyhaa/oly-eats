describe('Edit Recipe Page', () => {
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
          cy.visit(`/editRecipe/${recipeId}`);
          cy.get('[data-test="app-title"]').contains('Edit Recipe');
          cy.get('input[name="title"]')
            .should('be.visible')
            .should('have.value', recipeData.recipeTitle);
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
        cy.get('@recipeData').then((recipeData) => {
          cy.visit('/home');
          cy.wait(2000);
          cy.get('[data-test="search-box"]')
            .should('be.visible')
            .type(recipeData.recipeTitle);
          cy.get('[data-test="recipe-list-item"]').should('have.length', 0);
        });
      });
    });
  });

  it('Should render edit page fields', () => {
    cy.get('@recipeData').then((recipeData) => {
      cy.get('input[name="title"]')
        .should('be.visible')
        .should('have.value', recipeData.recipeTitle);
      cy.get('textarea[name="description"]')
        .should('be.visible')
        .should('have.value', recipeData.recipeDescription);
      cy.get('input[name="photo"]')
        .should('be.visible')
        .should('have.value', recipeData.recipePhotoUrl);
      cy.get('input[name="sourceDisplay"]')
        .should('be.visible')
        .should('have.value', recipeData.recipeSource);
      cy.get('input[name="sourceURL"]')
        .should('be.visible')
        .should('have.value', recipeData.recipeSourceUrl);

      cy.get('input[name="ingredients[0].ingredientsLabel"]')
        .should('be.visible')
        .should('have.value', recipeData.ingredientTitle1);
      recipeData.ingredients1.split('\n').forEach((ingredient) => {
        cy.get('textarea[name="ingredients[0].ingredientsList"]')
          .should('be.visible')
          .invoke('val')
          .should('contain', ingredient);
      });
      cy.get('input[name="ingredients[1].ingredientsLabel"]')
        .should('be.visible')
        .should('have.value', recipeData.ingredientTitle2);
      recipeData.ingredients2.split('\n').forEach((ingredient) => {
        cy.get('textarea[name="ingredients[1].ingredientsList"]')
          .should('be.visible')
          .invoke('val')
          .should('contain', ingredient);
      });
      cy.get('input[name="directions[0].directionsLabel"]')
        .should('be.visible')
        .should('have.value', recipeData.directionsTitle1);
      recipeData.directions1.split('\n').forEach((direction) => {
        cy.get('textarea[name="directions[0].directionsList"]')
          .should('be.visible')
          .invoke('val')
          .should('contain', direction);
      });
      cy.get('input[name="directions[1].directionsLabel"]')
        .should('be.visible')
        .should('have.value', recipeData.directionsTitle2);
      recipeData.directions2.split('\n').forEach((direction) => {
        cy.get('textarea[name="directions[1].directionsList"]')
          .should('be.visible')
          .invoke('val')
          .should('contain', direction);
      });
      cy.get('input[name="servings"]')
        .should('be.visible')
        .should('have.value', recipeData.servings);

      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .should('have.value', '');
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .should('have.value', recipeData.prepTimeMins);

      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .should('have.value', recipeData.totalTimeHr);
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .should('have.value', recipeData.totalTimeMins);

      if (recipeData.category) {
        for (let i = 0; i < recipeData.category.length; i++) {
          const item = recipeData.category[i];
          cy.get('#Category-select')
            .should('be.visible')
            .find('span')
            .contains(item);
        }
      }
      if (recipeData.cuisine) {
        for (let i = 0; i < recipeData.cuisine.length; i++) {
          const item = recipeData.cuisine[i];
          cy.get('#Cuisine-select')
            .should('be.visible')
            .find('span')
            .contains(item);
        }
      }
      if (recipeData.equipment) {
        for (let i = 0; i < recipeData.equipment.length; i++) {
          const item = recipeData.equipment[i];
          cy.get('#Equipment-select')
            .should('be.visible')
            .find('span')
            .contains(item);
        }
      }
      if (recipeData.mealType) {
        for (let i = 0; i < recipeData.mealType.length; i++) {
          const item = recipeData.mealType[i];
          cy.get('#Meal_Type-select')
            .should('be.visible')
            .find('span')
            .contains(item);
        }
      }

      cy.get('[data-test="submit-recipe"]').should('not.be.disabled');
    });
  });

  it('should update title', () => {
    const new_title = 'New Title';
    cy.get('input[name="title"]').clear().type(new_title);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="app-title"]').contains(new_title);
  });

  it('should update description', () => {
    const new_description = 'A new description';
    cy.get('textarea[name="description"]').clear().type(new_description);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="card-description"]').contains(new_description);
  });

  it('should update photo url', () => {
    const new_img =
      'https://media.giphy.com/media/duLufyPXU5j74jzi8i/giphy.gif';
    cy.get('input[name="photo"]').should('be.visible').clear().type(new_img);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="recipe-photo"]').its('src').should('be', new_img);
  });

  it('should update source display', () => {
    const new_source = 'New Source';
    cy.get('input[name="sourceDisplay"]').clear().type(new_source);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="card-source"]').contains(new_source);
  });

  it('should update source link', () => {
    const new_source = 'www.google.com';
    cy.get('input[name="sourceURL"]').clear().type(new_source);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="card-source"]')
      .find('a')
      .should('have.attr', 'href')
      .and('include', new_source);
  });

  it('should remove single ingredient section', () => {
    cy.get('[data-test="remove-ingredients-1"]').should('be.visible').click();
    cy.get('input[name="ingredients[1].ingredientsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'not.be.visible'
    );

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="ingredient-section"]')
      .should('have.length', 1)
      .find('[data-test="ingredient-list-item"]')
      .should('have.length', 5);
  });

  it('should add new ingredient section', () => {
    cy.get('[data-test="add-ingredients-section"]')
      .should('be.visible')
      .click();
    cy.get('input[name="ingredients[2].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[2].ingredientsList"]')
      .should('be.visible')
      .type('1 thing');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="ingredient-section"]')
      .should('have.length', 3)
      .eq(2)
      .find('[data-test="ingredient-list-item"]')
      .should('have.length', 1);
  });

  it('should remove single direction section', () => {
    cy.get('[data-test="remove-directions-1"]').should('be.visible').click();
    cy.get('input[name="directions[1].directionsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="directions[1].directionsList"]').should(
      'not.be.visible'
    );

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="directions-section"]')
      .should('have.length', 1)
      .find('[data-test="direction-list-item"]')
      .should('have.length', 3);
  });

  it('should add new direction section', () => {
    cy.get('[data-test="add-directions-section"]').should('be.visible').click();
    cy.get('input[name="directions[2].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[2].directionsList"]')
      .should('be.visible')
      .type('Do the mixin');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="directions-section"]')
      .should('have.length', 3)
      .eq(2)
      .find('[data-test="direction-list-item"]')
      .should('have.length', 1);
  });

  it('update prep and total times', () => {
    const new_prep_hours = 2;
    const new_prep_mins = 36;
    const new_total_hours = 3;
    const new_total_mins = 40;
    cy.get('input[name="timingPrepValueHours"]').clear().type(new_prep_hours);
    cy.get('input[name="timingPrepValueMins"]').clear().type(new_prep_mins);

    cy.get('input[name="timingTotalValueHours"]').clear().type(new_total_hours);
    cy.get('input[name="timingTotalValueMins"]').clear().type(new_total_mins);

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="card-prep"]')
      .find('h6')
      .should('be.visible')
      .contains('2 hours 36 minutes');
    cy.get('[data-test="card-total_time"]')
      .find('h6')
      .should('be.visible')
      .contains('3 hours 40 minutes');
  });

  it('should update ingredient label', () => {
    cy.get('input[name="ingredients[0].ingredientsLabel"]').clear();

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="ingredient-section"]')
      .should('have.length', 2)
      .first()
      .find('[data-test="ingredient-section-label"]')
      .contains('Ingredients');
  });

  it('should update ingredient list', () => {
    cy.get('textarea[name="ingredients[1].ingredientsList"]')
      .clear()
      .type('1 thing');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="ingredient-section"]')
      .eq(1)
      .find('[data-test="ingredient-list-item"]')
      .should('have.length', 1);
  });

  it('should update direction label', () => {
    cy.get('input[name="directions[0].directionsLabel"]').clear();
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="directions-section"]')
      .should('have.length', 2)
      .first()
      .find('[data-test="directions-section-label"]')
      .contains('Directions');
  });

  it('should update direction list', () => {
    cy.get('textarea[name="directions[0].directionsList"]')
      .clear()
      .type('Do the mixin');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="directions-section"]')
      .first()
      .find('[data-test="direction-list-item"]')
      .should('have.length', 1);
  });

  it('should update servings', () => {
    const new_servings = '20';
    cy.get('input[name="servings"]').clear().type(new_servings);
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/recipe');
    cy.get('[data-test="card-servings"]').contains(new_servings);
  });
});
