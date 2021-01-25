describe('Add Recipe Page', () => {
  beforeEach(() => {
    cy.visit('/addRecipe');
    cy.get('[data-test="app-title"]').contains('New Recipe');
    cy.fixture('recipe-data.json').as('recipeData');
  });

  it('Should render all fields', () => {
    cy.get('input[name="title"]').should('be.visible');
    cy.get('textarea[name="description"]').should('be.visible');
    cy.get('input[name="photo"]').should('be.visible');
    cy.get('input[name="sourceDisplay"]').should('be.visible');
    cy.get('input[name="sourceURL"]').should('be.visible');

    cy.get('input[name="ingredients[0].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'be.visible'
    );

    cy.get('input[name="directions[0].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'be.visible'
    );

    cy.get('input[name="servings"]').should('be.visible');

    cy.get('input[name="timingPrepValueHours"]').should('be.visible');
    cy.get('input[name="timingPrepValueMins"]').should('be.visible');

    cy.get('input[name="timingTotalValueHours"]').should('be.visible');
    cy.get('input[name="timingTotalValueMins"]').should('be.visible');

    cy.get('#Category-select').should('be.visible');
    cy.get('#Cuisine-select').should('be.visible');
    cy.get('#Equipment-select').should('be.visible');
    cy.get('#Meal_Type-select').should('be.visible');

    cy.get('[data-test="submit-recipe"]').should('be.disabled');
  });

  it('should add and remove ingredient sections', () => {
    cy.log('initial state');
    cy.get('input[name="ingredients[0].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'be.visible'
    );

    cy.get('input[name="ingredients[1].ingredientsLabel"]').should('not.exist');
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'not.exist'
    );

    cy.get('[data-test="add-ingredients-section"]').should('be.visible');

    cy.log('removing only ingredient section');
    cy.get('[data-test="remove-ingredients-0"]').should('be.visible').click();
    cy.get('input[name="ingredients[0].ingredientsLabel"]').should('not.exist');
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'not.exist'
    );

    cy.log('add only ingredient section');
    cy.get('[data-test="add-ingredients-section"]')
      .should('be.visible')
      .click();
    cy.get('input[name="ingredients[0].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'be.visible'
    );

    cy.get('input[name="ingredients[1].ingredientsLabel"]').should('not.exist');
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'not.exist'
    );

    cy.log('add second ingredient section');
    cy.get('[data-test="add-ingredients-section"]')
      .should('be.visible')
      .click();
    cy.get('input[name="ingredients[0].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-ingredients-0"]').should('be.visible');

    cy.get('input[name="ingredients[1].ingredientsLabel"]').should(
      'be.visible'
    );
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-ingredients-1"]').should('be.visible');

    cy.get('[data-test="add-ingredients-section"]').should('be.visible');
  });

  it('should add and remove direction sections', () => {
    cy.log('initial state');
    cy.get('input[name="directions[0].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'be.visible'
    );

    cy.get('input[name="directions[1].directionsLabel"]').should('not.exist');
    cy.get('textarea[name="directions[1].directionsList"]').should('not.exist');

    cy.get('[data-test="add-directions-section"]').should('be.visible');

    cy.log('removing only direction section');
    cy.get('[data-test="remove-directions-0"]').should('be.visible').click();
    cy.get('input[name="directions[0].directionsLabel"]').should('not.exist');
    cy.get('textarea[name="directions[0].directionsList"]').should('not.exist');

    cy.log('add only direction section');
    cy.get('[data-test="add-directions-section"]').should('be.visible').click();
    cy.get('input[name="directions[0].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-directions-0"]').should('be.visible');

    cy.get('input[name="directions[1].directionsLabel"]').should('not.exist');
    cy.get('textarea[name="directions[1].directionsList"]').should('not.exist');

    cy.log('add second ingredient section');
    cy.get('[data-test="add-directions-section"]').should('be.visible').click();
    cy.get('input[name="directions[0].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-directions-0"]').should('be.visible');

    cy.get('input[name="directions[1].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[1].directionsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-directions-1"]').should('be.visible');
    cy.get('[data-test="add-directions-section"]').should('be.visible');
  });

  it('should validate photo url', () => {
    cy.get('[data-test="add-recipe-photo"]').find('p').should('not.exist');
    cy.get('input[name="photo"]').should('be.visible').type('bad-photo');
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('[data-test="add-recipe-photo"]')
      .find('div')
      .should('be.visible')
      .should('have.class', 'Mui-error');

    cy.get('@recipeData').then((recipeData) => {
      cy.get('input[name="photo"]')
        .should('be.visible')
        .clear()
        .type(recipeData.recipePhotoUrl);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-photo"]')
        .find('div')
        .should('be.visible')
        .should('not.have.class', 'Mui-error');
    });
  });

  it('should validate time inputs - missing prep time', () => {
    cy.get('@recipeData').then((recipeData) => {
      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .type(' ');
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .type(' ');

      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .type(recipeData.totalTimeHr);
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .type(recipeData.totalTimeMins);

      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingPrepValueHours"]')
        .parent()
        .parent()
        .should('be.visible')
        .should('have.class', 'Mui-error');

      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .type(recipeData.prepTimeHr);
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .type(recipeData.prepTimeMins);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingPrepValueHours"]')
        .parent()
        .parent()
        .should('be.visible')
        .should('not.have.class', 'Mui-error');
    });
  });

  it('should validate time inputs - missing total time', () => {
    cy.get('@recipeData').then((recipeData) => {
      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .type(' ');
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .type(' ');

      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .type(recipeData.prepTimeHr);
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .type(recipeData.prepTimeMins);

      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingTotalValueHours"]')
        .parent()
        .parent()
        .should('be.visible')
        .should('have.class', 'Mui-error');

      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .type(recipeData.totalTimeHr);
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .type(recipeData.totalTimeMins);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingTotalValueHours"]')
        .parent()
        .parent()
        .should('be.visible')
        .should('not.have.class', 'Mui-error');
    });
  });

  it('should validate time inputs - total < prep time', () => {
    cy.get('@recipeData').then((recipeData) => {
      cy.log('swap prep and total times');
      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .type(recipeData.prepTimeHr);
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .type(recipeData.prepTimeMins);

      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .type(recipeData.totalTimeHr);
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .type(recipeData.totalTimeMins);

      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingTotalValueHours"]')
        .parent()
        .parent()
        .should('be.visible')
        .should('have.class', 'Mui-error');

      cy.log('check valid values');
      cy.get('input[name="timingTotalValueHours"]')
        .should('be.visible')
        .clear()
        .type(recipeData.totalTimeHr);
      cy.get('input[name="timingTotalValueMins"]')
        .should('be.visible')
        .clear()
        .type(recipeData.totalTimeMins);

      cy.get('input[name="timingPrepValueHours"]')
        .should('be.visible')
        .type(recipeData.prepTimeHr);
      cy.get('input[name="timingPrepValueMins"]')
        .should('be.visible')
        .type(recipeData.prepTimeMins);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-timingTotalValueHours"]')
        .parent()
        .parent()
        .parent()
        .should('be.visible')
        .should('not.have.class', 'Mui-error');
    });
  });

  it('should fail if missing title', () => {
    cy.get('input[name="title"]').clear();
    cy.get('textarea[name="description"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('input[name="title"]').parent().should('have.class', 'Mui-error');
  });

  it('should fail if missing description', () => {
    cy.get('textarea[name="description"]').clear();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('textarea[name="description"]')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('should fail if missing source', () => {
    cy.get('input[name="sourceDisplay"]').clear();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('input[name="sourceDisplay"]')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('should fail if missing ingredients - empty section', () => {
    cy.get('textarea[name="ingredients[0].ingredientsList"]').clear();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('textarea[name="ingredients[0].ingredientsList"]')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('should fail if missing ingredients - no sections', () => {
    cy.get('[data-test="remove-ingredients-0"]').should('be.visible').click();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('[data-test="ingredients-error"]').should('be.visible');
  });

  it('should fail if missing directions - empty section', () => {
    cy.get('textarea[name="directions[0].directionsList"]').clear();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('textarea[name="directions[0].directionsList"]')
      .parent()
      .should('have.class', 'Mui-error');
  });

  it('should fail if missing directions - no sections', () => {
    cy.get('[data-test="remove-directions-0"]').should('be.visible').click();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('[data-test="directions-error"]').should('be.visible');
  });

  it('should fail if missing servings', () => {
    cy.get('input[name="servings"]').clear();
    cy.get('input[name="title"]').type('test');

    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('input[name="servings"]').parent().should('have.class', 'Mui-error');
  });

  const inputRecipeInfo = (recipeData) => {
    cy.get('input[name="title"]')
      .should('be.visible')
      .type(recipeData.recipeTitle);
    cy.get('textarea[name="description"]')
      .should('be.visible')
      .type(recipeData.recipeDescription);
    cy.get('input[name="photo"]')
      .should('be.visible')
      .type(recipeData.recipePhotoUrl);
    cy.get('input[name="sourceDisplay"]')
      .should('be.visible')
      .type(recipeData.recipeSource);
    cy.get('input[name="sourceURL"]')
      .should('be.visible')
      .type(recipeData.recipeSourceUrl);

    if (recipeData.ingredientTitle1) {
      cy.get('input[name="ingredients[0].ingredientsLabel"]')
        .should('be.visible')
        .type(recipeData.ingredientTitle1);
    }
    cy.get('textarea[name="ingredients[0].ingredientsList"]')
      .should('be.visible')
      .type(recipeData.ingredients1);

    if (recipeData.ingredientTitle2 || recipeData.ingredients2) {
      cy.log('Adding section ingredient section');
      cy.get('[data-test="add-ingredients-section"]')
        .should('be.visible')
        .click();

      if (recipeData.ingredientTitle2) {
        cy.get('input[name="ingredients[1].ingredientsLabel"]')
          .should('be.visible')
          .type(recipeData.ingredientTitle2);
      }
      if (recipeData.ingredients2) {
        cy.get('textarea[name="ingredients[1].ingredientsList"]')
          .should('be.visible')
          .type(recipeData.ingredients2);
      }
    }

    if (recipeData.directionsTitle1) {
      cy.get('input[name="directions[0].directionsLabel"]')
        .should('be.visible')
        .type(recipeData.directionsTitle1);
    }
    cy.get('textarea[name="directions[0].directionsList"]')
      .should('be.visible')
      .type(recipeData.directions1);

    if (recipeData.directionsTitle2 || recipeData.directions2) {
      cy.log('Adding section directions section');
      cy.get('[data-test="add-directions-section"]')
        .should('be.visible')
        .click();

      if (recipeData.directionsTitle2) {
        cy.get('input[name="directions[1].directionsLabel"]')
          .should('be.visible')
          .type(recipeData.directionsTitle2);
      }
      if (recipeData.directions2) {
        cy.get('textarea[name="directions[1].directionsList"]')
          .should('be.visible')
          .type(recipeData.directions2);
      }
    }

    cy.get('input[name="servings"]')
      .should('be.visible')
      .type(recipeData.servings);

    cy.get('input[name="timingPrepValueHours"]')
      .should('be.visible')
      .type(recipeData.prepTimeHr);
    cy.get('input[name="timingPrepValueMins"]')
      .should('be.visible')
      .type(recipeData.prepTimeMins);

    cy.get('input[name="timingTotalValueHours"]')
      .should('be.visible')
      .type(recipeData.totalTimeHr);
    cy.get('input[name="timingTotalValueMins"]')
      .should('be.visible')
      .type(recipeData.totalTimeMins);

    if (recipeData.category) {
      cy.get('#Category-select').should('be.visible').click();
      for (let i = 0; i < recipeData.category.length; i++) {
        const item = recipeData.category[i];
        cy.get('[data-test="select-menu-popup"]')
          .find('span')
          .contains(item)
          .should('be.visible')
          .click();
      }
      cy.get('body').type('{esc}');
    }
    if (recipeData.cuisine) {
      cy.get('#Cuisine-select').should('be.visible').click();
      for (let i = 0; i < recipeData.cuisine.length; i++) {
        const item = recipeData.cuisine[i];
        cy.get('[data-test="select-menu-popup"]')
          .find('span')
          .contains(item)
          .should('be.visible')
          .click();
      }
      cy.get('body').type('{esc}');
    }
    if (recipeData.equipment) {
      cy.get('#Equipment-select').should('be.visible').click();
      for (let i = 0; i < recipeData.equipment.length; i++) {
        const item = recipeData.equipment[i];
        cy.get('[data-test="select-menu-popup"]')
          .find('span')
          .contains(item)
          .should('be.visible')
          .click();
      }
      cy.get('body').type('{esc}');
    }
    if (recipeData.mealType) {
      cy.get('#Meal_Type-select').should('be.visible').click();
      for (let i = 0; i < recipeData.mealType.length; i++) {
        const item = recipeData.mealType[i];
        cy.get('[data-test="select-menu-popup"]')
          .find('span')
          .contains(item)
          .should('be.visible')
          .click();
      }
      cy.get('body').type('{esc}');
    }
  };

  it('should successfully add recipe', () => {
    cy.get('@recipeData').then((recipeData) => {
      inputRecipeInfo(recipeData);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();

      cy.url().should('contain', '/recipe');

      cy.get('[data-test="app-title"]').contains(recipeData.recipeTitle);
      cy.get('[data-test="recipe-photo"]')
        .should('be.visible')
        .should('have.attr', 'src', recipeData.recipePhotoUrl);
      cy.get('[data-test="card-description"]')
        .find('p')
        .should('be.visible')
        .contains(recipeData.recipeDescription);

      cy.get('[data-test="card-prep"]')
        .find('h6')
        .should('be.visible')
        .contains('25 minutes');
      cy.get('[data-test="card-total_time"]')
        .find('h6')
        .should('be.visible')
        .contains('1 hour 25 minutes');
      cy.get('[data-test="card-servings"]')
        .find('h6')
        .should('be.visible')
        .contains(recipeData.servings);
      cy.get('[data-test="card-date_added"]').should('be.visible');
      cy.get('[data-test="card-source"]')
        .find('a')
        .should('be.visible')
        .contains(recipeData.recipeSource)
        .should('have.attr', 'href')
        .and('include', recipeData.recipeSourceUrl);

      cy.get('[data-test="ingredient-box"]').should('be.visible');
      cy.get('[data-test="ingredient-section"]').should('have.length', 2);
      cy.get('[data-test="ingredient-section"]')
        .first()
        .find('[data-test="ingredient-list-item"]')
        .should('have.length', 5);
      cy.get('[data-test="ingredient-section"]')
        .eq(1)
        .find('[data-test="ingredient-list-item"]')
        .should('have.length', 9);

      cy.get('[data-test="directions-box"]').should('be.visible');
      cy.get('[data-test="directions-section"]').should('have.length', 2);
      cy.get('[data-test="directions-section"]')
        .first()
        .find('[data-test="direction-list-item"]')
        .should('have.length', 3);
      cy.get('[data-test="directions-section"]')
        .eq(1)
        .find('[data-test="direction-list-item"]')
        .should('have.length', 1);

      cy.log('delete new recipe');
      cy.get('[data-test="action-menu"]').should('be.visible').click();
      cy.get('[data-test="action-Delete"]').should('be.visible').click();
      cy.get('[data-test="delete-modal-confirm"]').click();
      cy.url().should('contain', '/home');
    });
  });
});
