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

    cy.get('input[name="ingredients[1].ingredientsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'not.be.visible'
    );

    cy.get('[data-test="add-ingredients-section"]').should('be.visible');

    cy.log('removing only ingredient section');
    cy.get('[data-test="remove-ingredients-0"]').should('be.visible').click();
    cy.get('input[name="ingredients[0].ingredientsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="ingredients[0].ingredientsList"]').should(
      'not.be.visible'
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

    cy.get('input[name="ingredients[1].ingredientsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="ingredients[1].ingredientsList"]').should(
      'not.be.visible'
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

    cy.get('input[name="directions[1].directionsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="directions[1].directionsList"]').should(
      'not.be.visible'
    );

    cy.get('[data-test="add-directions-section"]').should('be.visible');

    cy.log('removing only direction section');
    cy.get('[data-test="remove-directions-0"]').should('be.visible').click();
    cy.get('input[name="directions[0].directionsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'not.be.visible'
    );

    cy.log('add only direction section');
    cy.get('[data-test="add-directions-section"]').should('be.visible').click();
    cy.get('input[name="directions[0].directionsLabel"]').should('be.visible');
    cy.get('textarea[name="directions[0].directionsList"]').should(
      'be.visible'
    );
    cy.get('[data-test="remove-directions-0"]').should('be.visible');

    cy.get('input[name="directions[1].directionsLabel"]').should(
      'not.be.visible'
    );
    cy.get('textarea[name="directions[1].directionsList"]').should(
      'not.be.visible'
    );

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
    cy.get('[data-test="add-recipe-photo"]').find('p').should('not.be.visible');
    cy.get('input[name="photo"]').should('be.visible').type('bad-photo');
    cy.get('[data-test="submit-recipe"]').should('be.visible').click();
    cy.get('[data-test="add-recipe-photo"]')
      .find('p')
      .should('be.visible')
      .contains('URL must be a photo');

    cy.get('@recipeData').then((recipeData) => {
      cy.get('input[name="photo"]')
        .should('be.visible')
        .clear()
        .type(recipeData.recipePhotoUrl);
      cy.get('[data-test="submit-recipe"]').should('be.visible').click();
      cy.get('[data-test="add-recipe-photo"]')
        .find('p')
        .should('not.be.visible');
    });
  });
});
