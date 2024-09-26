Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Leonardo");
  cy.get("#lastName").type("Baestero");
  cy.get("input[type='email']").type("leonardobaestero@gmail.com");
  cy.get("#open-text-area").type("Teste");
  cy.contains("button", "Enviar").click();
});
