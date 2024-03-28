/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { performOperation } from "../../common/helpers"

const commonLocators = require("../../../Locators/commonLocators.json")
const LanguageLocators = require("../../../Locators/LanguageLocators.json")

When("the user hits {string} button.", (btn) => {
    cy.get(commonLocators[btn]).click() 
})

When("the user adds {string} at the {string} screen.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
})

When("the user {string} the {string}.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
})

Then("the {string} appears for the created {string} should be correct.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
})

When("the user hits {string} without submitting mandatory fields at the {string} screen.", (operation, fieldsType) => {
    cy.get(commonLocators[operation + "Btn"]).click()
    performOperation(operation + "Invalid", fieldsType, "invalid")
})

When("the user hits {string} with submitting all mandatory fields at the {string} screen.", (operation, fieldsType) => { 
    cy.get(commonLocators[operation + "Btn"]).click()
    performOperation(operation + "Valid", fieldsType, "valid")
})

Then("Initially, the {string} should not be clickable at {string} screen.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
})

When("the user {string} at the {string} screen.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
})

When("the user {string} of the app.", (fields) => {
    cy.get(LanguageLocators[fields]["chosenLanguage"]).invoke("text").then(chosenLanguage => {
        cy.get(LanguageLocators[fields]["chosenLanguage"]).click()
        if (chosenLanguage == "English") {
            cy.get(LanguageLocators[fields]["choseFrenchBtn"]).click()
            cy.wait("@updateLanguage").its("response.statusCode").should("eq", 200)
            cy.get(LanguageLocators[fields]["chosenLanguage"]).should("have.text", "Français")
        } else {
            cy.get(LanguageLocators[fields]["choseEnglishBtn"]).click()
            cy.wait("@updateLanguage").its("response.statusCode").should("eq", 200)
            cy.get(LanguageLocators[fields]["chosenLanguage"]).should("have.text", "English")
        }
    })
})
