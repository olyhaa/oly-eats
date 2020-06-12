describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('Featured Articles Elements', () => {
    cy.get('[data-test="featured-list"]').should('be.visible');
    cy.get('[data-test="recipe-card"]').should('have.length', 3);
    cy.get('[data-test="recipe-card"]')
      .first()
      .find('[data-test="recipe-card-image"]')
      .should('be.visible');
    cy.get('[data-test="recipe-card"]')
      .first()
      .find('[data-test="recipe-card-title"]')
      .should('be.visible');
    cy.get('[data-test="recipe-card"]')
      .first()
      .find('[data-test="recipe-card-description"]')
      .should('be.visible');
  });

  it('Featured Articles Click Main Card', () => {
    cy.get('[data-test="recipe-card"]')
      .first()
      .find('[data-test="recipe-card-primary-action"]')
      .click();
    cy.url().should('contain', '/recipe');
  });

  it('Featured Articles Click Button', () => {
    cy.get('[data-test="recipe-card"]')
      .first()
      .find('[data-test="recipe-card-secondary-action"]')
      .click();
    cy.url().should('contain', '/recipe');
  });

  it('Search Recipe by Name', () => {
    cy.get('[data-test="recipe-list-item"]').then(($list) => {
      const initialCount = $list.length;
      expect(initialCount > 0).to.be.true;

      cy.get('[data-test="recipe-list-item"]')
        .first()
        .find('[data-test="recipe-title"]')
        .then(($title) => {
          const firstTitle = $title.text();
          cy.get('[data-test="search-box"]')
            .should('be.visible')
            .type(firstTitle);

          cy.get('[data-test="recipe-list-item"]')
            .its('length')
            .should('be.lt', initialCount)
            .should('be.gt', 0);
        });
    });
  });

  it('Click Recipe in list', () => {
    cy.get('[data-test="recipe-list-item"]')
      .first()
      .find('[data-test="recipe-title"]')
      .then(($title) => {
        const firstTitle = $title.text();
        cy.get('[data-test="recipe-list-item"]').first().click();
        cy.url().should('contain', '/recipe');
        cy.get('[data-test="app-title"]').contains(firstTitle);
      });
  });

  it('Verifies Add Recipe Button Access', () => {
    cy.get('[data-test="add-recipe"]').should('be.visible').click();
    cy.url().should('contain', '/addRecipe');
  });

  it('Verifies Admin Menu Access', () => {
    cy.get('[data-test="admin-menu"]').should('be.visible').click();
    cy.url().should('contain', '/admin');
  });
});
