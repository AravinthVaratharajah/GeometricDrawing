describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Multiplication');
    cy.contains('Samples');
    cy.contains('button', 'Get random config from server').click();
    // cy.contains('Samples : 25');
    // cy.contains('Multiplication Factor : 15');
    cy.contains('button', 'Play').click();
    cy.wait(2000);
    cy.contains('button', 'Stop').click();
  });
});
