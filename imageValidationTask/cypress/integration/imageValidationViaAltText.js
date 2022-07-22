describe("Verify the images search on the google", () => {
  it("Verify the images on the basis of their title", () => {
    let altValues = [],
      altValue,
      altValues1 = [],
      altValue1;
    cy.visit("https://www.google.com/");
    cy.get("[title='Search']").type("Cypress{enter}");
    cy.xpath("//*[@role='navigation']//*[text()='Images']", {
      timeout: 1000,
    }).click();
    cy.xpath("//*[text()='Image Results']/following-sibling::*//img", {
      timeout: 10000,
    }).each(($el, index, $list) => {
      altValue = cy.get($el).invoke("attr", "alt");
      altValues.push(altValue);
    });
    cy.wait(2000);
    cy.clearCookies();
    cy.getCookies().should("be.empty");
    cy.visit("https://www.google.com/");
    cy.get("[title='Search']").type("Cypress{enter}");
    cy.xpath("//*[@role='navigation']//*[text()='Images']", {
      timeout: 1000,
    }).click();
    cy.xpath("//*[text()='Image Results']/following-sibling::*//img", {
      timeout: 10000,
    }).each(($el, index, $list) => {
      altValue1 = cy.get($el).invoke("attr", "alt");
      altValues1.push(altValue1);
    });
    cy.log(Cypress._.isEqual(altValues, altValues1));
  });
});
