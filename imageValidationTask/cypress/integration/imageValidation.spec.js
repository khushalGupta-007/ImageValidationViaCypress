describe("Verify the images search on the google", () => {
  beforeEach("Visit google search page", () => {
    cy.visit("/");
  });
  it("Verify the searched images", () => {
    cy.get("[title='Search']").type("Cypress{enter}");
    cy.xpath("//*[@role='navigation']//*[text()='Images']", {
      timeout: 1000,
    }).click();
    cy.xpath("//*[text()='Image Results']/following-sibling::*//img", {
      timeout: 10000,
    }).each(($el, index, $list) => {
      if (index <= 6) {
        cy.get($el)
          .invoke("attr", "alt")
          .then((alt) => {
            alt = alt.replace(/ /g, "");
            cy.log(alt);
            cy.wrap($el).toMatchImageSnapshot({ name: alt });
          });
      }
    });
  });
});
