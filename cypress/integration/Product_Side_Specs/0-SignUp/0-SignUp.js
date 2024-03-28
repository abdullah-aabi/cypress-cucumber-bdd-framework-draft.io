// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { getUniqueEmail, performOperation } from "../../common/helpers"

const commonLocators = require("../../../Locators/commonLocators.json")

When("the user hits {string} button.", (btn) => {
    cy.get(commonLocators[btn]).click()
})

When("the user adds {string} at the {string} screen.", (operation, fieldsType) => {
    performOperation(operation, fieldsType)
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

When("the user verify {string} at the {string} screen.", (operation, fieldsType) => {
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

Then("the user get the {string} email sent to the provided email address.", (type, testEmail) => {
    cy.fixture("SignUp_data").then(data => {
        let testEmail = (type == "createsAccount" ? getUniqueEmail(data[type]["UNIQUE_Email"]) : data[type]["emailField"])
        cy.log(testEmail)
        let serverId = Cypress.env("MAILOSAUR_Server_ID")
        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail,
            sentFrom: "hi@recette.draft.io"
        }, {
            timeout: 50000
        }).then(email => {
            if (type == "createsAccount") {
                cy.visit(email.html.links[1].href)
            } else {
                expect(email.html.body).to.include(data[type].alreadyExistingAccountMsg)
                cy.mailosaurDeleteMessage(email.id)
            }

        })
    })
})
