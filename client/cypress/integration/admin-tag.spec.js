describe('Admin Page - Tags', () => {
  beforeEach(() => {
    cy.fixture('add-tag-type-payload.json').then((addTagTypePayload) => {
      cy.addTagType(addTagTypePayload).as('tagType');

      cy.get('@tagType').then(({ label: tagTypeLabel }) => {
        cy.visit('/admin');
        cy.get('[data-test="app-title"]').contains('OlyEats: Admin');
        cy.get('#tag-type-list-select').should('be.visible').click();
        cy.get('[data-test="tag-type-item"]').contains(tagTypeLabel).click();
        cy.get('body').type('{esc}');
        cy.get('[data-test="tag-table-toolbar"]')
          .find('h6')
          .contains(tagTypeLabel)
          .click();
        cy.get('[data-test^="tag-table-row"]').should('have.length', 0);
      });
    });
  });

  afterEach(() => {
    cy.fixture('delete-tag-type-payload.json').then((deleteTagTypePayload) => {
      cy.get('@tagType').then(({ id: tagTypeId }) => {
        deleteTagTypePayload.variables.id = tagTypeId;
        cy.deleteTagType(deleteTagTypePayload);
      });
    });
  });

  it('should add new tag', () => {
    cy.log('cancel new tag');
    cy.get('[data-test="add-new-row"]').click();
    cy.get('[data-test="clear-row"]').click();
    cy.get('[data-test^="tag-table-row"]').should('have.length', 0);

    cy.log('add new tag');
    const new_tag = 'New Tag';
    cy.get('[data-test="add-new-row"]').click();
    cy.get('[data-test="tag-table-edit-row"]').find('input').type(new_tag);
    cy.get('[data-test="save-row"]').click();
    cy.get('[data-test^="tag-table-row"]')
      .should('have.length', 1)
      .contains(new_tag);

    cy.log('cancel edit tag');
    const updated_tag = 'Updated Tag';
    cy.get('[data-test="edit-row"]').click();
    cy.get('[data-test="tag-table-edit-row"]')
      .find('input')
      .clear()
      .type(updated_tag);
    cy.get('[data-test="clear-row"]').click();
    cy.get('[data-test^="tag-table-row"]')
      .should('have.length', 1)
      .contains(new_tag);

    cy.log('edit tag');
    cy.get('[data-test="edit-row"]').click();
    cy.get('[data-test="tag-table-edit-row"]')
      .find('input')
      .clear()
      .type(updated_tag);
    cy.get('[data-test="save-row"]').click();
    cy.wait(2000);
    cy.get('[data-test^="tag-table-row"]')
      .should('have.length', 1)
      .contains(updated_tag);

    cy.log('cancel delete tag');
    cy.get('[data-test="delete-row"]').click();
    cy.get('[data-test="clear-row"]').click();
    cy.get('[data-test^="tag-table-row"]')
      .should('have.length', 1)
      .contains(updated_tag);

    cy.log('delete tag');
    cy.get('[data-test="delete-row"]').click();
    cy.get('[data-test="save-row"]').click();
    cy.get('[data-test^="tag-table-row"]').should('have.length', 0);
  });
});
