describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.viewport(410, 860);
  });
  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Leonardo");
    cy.get("#lastName").type("Baestero");
    cy.get("input[type='email']").type("leonardobaestero@gmail.com");
    cy.get("#open-text-area").type(
      "testandotestandotestandotestandotestandovvtestandotestandotestandotestandotestandotestandotestando",
      { delay: 0 }
    );
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulario com um email com formatação inválida", () => {
    cy.get("#firstName").type("Leonardo");
    cy.get("#lastName").type("Baestero");
    cy.get("input[type='email']").type("leonardobaestero");
    cy.get("#open-text-area").type(
      "testandotestandotestandotestandotestandovvtestandotestandotestandotestandotestandotestandotestando",
      { delay: 0 }
    );

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não-numérico", () => {
    cy.get("#phone").type("abc");
    cy.get("#phone").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario", () => {
    cy.get("#firstName").type("Leonardo");
    cy.get("#lastName").type("Baestero");
    cy.get("input[type='email']").type("leonardobaestero");
    cy.get("#open-text-area").type(
      "testandotestandotestandotestandotestandovvtestandotestandotestandotestandotestandotestandotestando",
      { delay: 0 }
    );

    cy.get("#phone-checkbox").check();

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Leonardo").clear().should("have.value", "");
    cy.get("#lastName").type("Baestero").clear().should("have.value", "");
    cy.get("input[type='email']")
      .type("leonardobaestero")
      .clear()
      .should("have.value", "");
    cy.get("#phone").type("11985784859").clear().should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (Youtube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check();
        cy.wrap(radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o ultimo", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get('a[href="privacy.html"]').invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });
});
