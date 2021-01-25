describe('Admin Page - Tag Types', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[data-test="app-title"]').contains('OlyEats: Admin');
  });

  it('should render tag type picker', () => {
    cy.get('[data-test="tag-type-list"]').should('be.visible');
    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 4);
  });

  it('should add/edit/delete new tag type', () => {
    cy.log('open menu, click cancel');
    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 4);
    cy.get('body').type('{esc}');

    cy.get('[data-test="tag-type-item-add"]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-test="edit-modal-dialog"]').should('be.visible');
    cy.get('[data-test="edit-modal-cancel"]').should('be.visible').click();
    cy.get('[data-test="edit-modal-dialog"]').should('not.exist');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 4);
    cy.get('body').type('{esc}');

    cy.log('open menu, click add');
    cy.get('[data-test="tag-type-item-add"]')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-test="edit-modal-dialog"]').should('be.visible');
    cy.get('[data-test="edit-modal-confirm"]').should('be.visible').click();
    cy.get('[data-test="edit-modal-dialog"]').should('be.visible');

    cy.log('open menu, add data, click add');
    const new_tag = 'A Test Tag';
    cy.get('[data-test="edit-modal-input"]').should('be.visible').type(new_tag);
    cy.get('[data-test="edit-modal-confirm"]').should('be.visible').click();
    cy.get('[data-test="edit-modal-dialog"]').should('not.exist');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 5);
    cy.get('[data-test="tag-type-item"]').contains(new_tag);
    cy.get('body').type('{esc}');

    cy.log('edit new tag, click cancel');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').contains(new_tag).click();
    cy.get('[data-test="tag-type-item-edit"]').click({ force: true });
    cy.get('[data-test="edit-modal-dialog"]').should('be.visible');
    cy.get('[data-test="edit-modal-cancel"]').should('be.visible').click();
    cy.get('[data-test="edit-modal-dialog"]').should('not.exist');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 5);
    cy.get('[data-test="tag-type-item"]').contains(new_tag);
    cy.get('body').type('{esc}');

    cy.log('edit new tag, click confirm');
    const updated_tag = '2';

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').contains(new_tag).click();
    cy.get('[data-test="tag-type-item-edit"]').click({ force: true });
    cy.get('[data-test="edit-modal-dialog"]').should('be.visible');
    cy.get('[data-test="edit-modal-input"]')
      .should('be.visible')
      .type(updated_tag);
    cy.get('[data-test="edit-modal-confirm"]').should('be.visible').click();
    cy.get('[data-test="edit-modal-dialog"]').should('not.exist');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 5);
    cy.get('[data-test="tag-type-item"]').contains(new_tag + updated_tag);
    cy.get('body').type('{esc}');

    cy.log('delete new tag, click cancel');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]')
      .contains(new_tag + updated_tag)
      .click();
    cy.get('[data-test="tag-type-item-delete"]').click({ force: true });
    cy.get('[data-test="delete-modal-title"]').should('be.visible');
    cy.get('[data-test="delete-modal-cancel"]').click();
    cy.get('[data-test="delete-modal-title"]').should('not.exist');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 5);
    cy.get('body').type('{esc}');

    cy.log('delete new tag, click confirm');

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]')
      .contains(new_tag + updated_tag)
      .click();
    cy.get('[data-test="tag-type-item-delete"]').click({ force: true });
    cy.get('[data-test="delete-modal-title"]').should('be.visible');
    cy.get('[data-test="delete-modal-confirm"]').click();
    cy.get('[data-test="delete-modal-title"]').should('not.exist');

    // brief wait for list to update after delete
    cy.wait(200);

    cy.get('#tag-type-list-select').should('be.visible').click();
    cy.get('[data-test="tag-type-item"]').should('have.length', 4);
    cy.get('body').type('{esc}');
  });
});
