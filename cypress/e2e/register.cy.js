import { errorMessages } from "../../src/components/Register";

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  describe("Error Messages", () => {
    it("name input throws error for 2 chars", () => {
      //Arrange
      //Act
      cy.get('[data-cy="ad-input"]').type("em");
      //Assert
      cy.contains(errorMessages.ad);
    });
    it("Surname input throws error for 2 chars", () => {
      //Arrange
      //Act
      cy.get('[data-cy="soyad-input"]').type("sa");
      //Assert
      cy.contains(errorMessages.soyad);
    });
    it("Email input throws error for emre@wit", () => {
      //Arrange
      //Act
      cy.get('[data-cy="email-input"]').type("emre@wit");
      //Assert
      cy.contains(errorMessages.email);
    });
    it("Password input throws error for 1234", () => {
      //Arrange
      //Act
      cy.get('[data-cy="password-input"]').type("1234");
      //Assert
      cy.contains(errorMessages.password);
    });
    it("button is disabled fr unvalidated inputs.", () => {
      //Arrange
      //Act
      cy.get('[data-cy="submit-button"]').should("be.disabled");
      //Assert
    });
  });
  describe("Form inputs validated", () => {
    it("button enabled for validated inputs", () => {
      //Arrange
      //Act
      cy.get('[data-cy="ad-input"]').type("emre");
      cy.get('[data-cy="soyad-input"]').type("kilic");
      cy.get('[data-cy="email-input"]').type("emre@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("12344567Aa.");
      cy.get('[data-cy="submit-button"]').should("be.enabled");
      //Assert
    });
    it("submit form on validated inputs", () => {
      //Arrange
      //Act
      cy.get('[data-cy="ad-input"]').type("emre");
      cy.get('[data-cy="soyad-input"]').type("kilic");
      cy.get('[data-cy="email-input"]').type("emre@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("12344567Aa.");
      cy.get('[data-cy="submit-button"]').click();
      //Assert
      cy.get('[data-cy="response-message"]').should("be.visible");
    });
  });
});
