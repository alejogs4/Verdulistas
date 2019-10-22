describe("Tests for login page", () => {
  it("Should update email and password inputs properly", () => {
    cy.visit("http://10.50.100.85:3000/login");

    cy.get('[type="email"]')
      .type("alejogs4@gmail.com")
      .should("have.value", "alejogs4@gmail.com");

    cy.get('[type="password"]')
      .type("12345")
      .should("have.value", "12345");
  });

  it("Should update email and password and making a click in clear fields those field will be clean up", () => {
    cy.visit("http://10.50.100.85:3000/login");

    const email = cy.get('[type="email"]').type("alejogs4@gmail.com");
    const password = cy.get('[type="password"]').type("12345");

    cy.get("#clear-fields-id").click();

    email.should("have.value", "");
    password.should("have.value", "");
  })
});
