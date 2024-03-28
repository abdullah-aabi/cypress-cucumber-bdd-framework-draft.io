/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { performOperation } from "../../common/helpers"

const commonLocators = require("../../../Locators/commonLocators.json")

When("the user hits {string} button.", (btn) => {
    cy.get(commonLocators[btn]).click() 
})

When("the user {string} at the {string} screen.", (operation, fieldsType) => {
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
