describe('Create New Hotel Modal', () => {
  beforeEach(() => {
    cy.visit('/travel-agent');
    cy.get('[data-cy=create-hotel-button]').click();
  });

  it('should display validation errors when form is submitted empty', () => {
    cy.get('[data-cy=create-hotel-submit]').click();
    cy.get('[data-cy=name-error]').should(
      'contain',
      'El nombre del hotel es requerido'
    );
    cy.get('[data-cy=country-error]').should('contain', 'El país es requerido');
    cy.get('[data-cy=city-error]').should('contain', 'La ciudad es requerido');
  });

  it('should create a new hotel with valid data', () => {
    cy.get('[data-cy=name-input]').type('Hotel Cypress');
    cy.get('[data-cy=description-input]').type('Este es un hotel de prueba.');
    cy.get('[data-cy=country-dropdown]')
      .click()
      .get('.p-dropdown-item')
      .contains('Colombia')
      .click();
    cy.get('[data-cy=city-dropdown]')
      .click()
      .get('.p-dropdown-item')
      .contains('Bogotá')
      .click();
    cy.get('[data-cy=latitude-input]').clear().type('4.7110');
    cy.get('[data-cy=longitude-input]').clear().type('-74.0721');
    cy.get('[data-cy=create-hotel-submit]').click();
    cy.get('.p-toast-message').should(
      'contain',
      'Se ha creado el hotel exitosamente'
    );
    cy.get('.create-hotel-container').should('not.exist');
  });

  it('should open the map modal and update coordinates', () => {
    cy.get('[data-cy=open-map-modal-button]').click();
    cy.get('[data-cy=select-location]').click();
    cy.get('[data-cy=latitude-input]').should('have.value', '4.5709');
    cy.get('[data-cy=longitude-input]').should('have.value', '-74.2973');
  });
});
