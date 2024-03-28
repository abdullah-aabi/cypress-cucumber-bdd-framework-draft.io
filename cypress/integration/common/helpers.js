// <reference types="Cypress" />

import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import "cypress-file-upload"
require('@4tw/cypress-drag-drop')

const commonLocators = require("../../Locators/commonLocators.json")
const SignUpLocators = require("../../Locators/SignUpLocators.json")
const SignInLocators = require("../../Locators/SignInLocators.json")
const DraftsLocators = require("../../Locators/DraftsLocators.json")
const LanguageLocators = require("../../Locators/LanguageLocators.json")
const WidgetLocators = require("../../Locators/WidgetLocators.json")
const StoryLocators = require("../../Locators/StoryLocators.json")
const CardLocators = require("../../Locators/CardLocators.json")
const TextWidgetLocators = require("../../Locators/TextWidgetLocators.json")
var x = 100
var y = 100

const modifierKey = Cypress.platform === "darwin" ? "meta" : "ctrl"
window.uniqueId = generateUUID()

function getLocators(fieldsType) { // "Drafts"
    switch (fieldsType) {
        case "SignUp":
            return SignUpLocators
        case "SignIn":
            return SignInLocators
        case "Drafts":
            return DraftsLocators
        case "Language":
            return LanguageLocators
        case "Widget":
            return WidgetLocators
        case "Story":
            return StoryLocators
        case "Card":
            return CardLocators
        case "TextWidget":
            return TextWidgetLocators
        default:
            return commonLocators

    }

}

function generateUUID() {
    const uuid = require("uuid")
    const id = uuid.v4()
    return id.split("-")[4]
}

function getColor(type) {
    if (type.includes("Valid")) {
        if (type.includes("pwPolicy")) {
            return "rgb(10, 136, 82)"
        }
    } else {
        if (type.includes("pwPolicy")) {
            return "rgb(255, 255, 255)"
        }
    }
}

function numToWords(num) {
    var a = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "]
    var b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

    if ((num = num.toString()).length > 9) return "overflow"
    let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/)
    if (!n) return; var str = ""
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore " : ""
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh " : ""
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand " : ""
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred " : ""
    str += (n[5] != 0) ? ((str != "") ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : ""
    return str.trim()
}

export function getUniqueName(previousName) {   // theqa13119+User1
    let firstHalf = previousName.split("_")[0]
    let newName = firstHalf + "_" + window.uniqueId    // theqa13119 + '_' + asdj23j 
    return newName
}

export function getUniqueEmail(previousEmail) { // theqa13119+User1@gmail.com
    let firstHalf = previousEmail.split("+")[0]                   // theqa13119
    let secondHalf = previousEmail.split("@")[1]                      // gmail.com
    let newEmail = firstHalf + "+" + window.uniqueId + "@" + Cypress.env("MAILOSAUR_Server_Domain")    // theqa13119 + '+' + 23jkq3jkbf + '@' + gmail.com
    return newEmail
}

export function getbBeforeAfterValue(selector, pseudo, property, expectedColor) {
    cy.get(selector).then($els => {
        // get Window reference from element
        const win = $els[0].ownerDocument.defaultView
        // use getComputedStyle to read the pseudo selector
        const cssSelector = win.getComputedStyle($els[0], pseudo)
        // read the value of the `content` CSS property
        const contentValue = cssSelector.getPropertyValue(property)
        // the returned value will have double quotes around it, but this is correct
        expect(contentValue).to.eq(expectedColor)
    })
}

export function performOperation(operation, fieldsType) { // operation = "createsChunkedNote" && fieldsType = "Drafts"
    let locators = getLocators(fieldsType) // JSON Locator object "DraftsLocators"
    let Locs = locators[operation] // "createsChunkedNote" > Locators
    cy.fixture(fieldsType + "_data").then(returnedData => { // "Drafts_data"
        let data = returnedData[operation] // "createsChunkedNote" > test data
        for (let loc in Locs) { // Gets children of Locators (i.e "createsChunkedNote") in sequence

            // loc = key , Locs[loc] = value
            if (loc.includes("Checkbox")) {
                cy.get(Locs[loc]).check({ force: true }).should("be.checked")

            } else if (loc.includes("Select")) {
                cy.get(Locs[loc]).select(data[loc], { force: true })

            } else if (loc.includes("TextButton")) {
                cy.get(Locs[loc]).contains(data[loc]).click({ force: true })

            } else if (loc.includes("TextBT")) {
                cy.get(Locs[loc]).contains(data[loc]).dblclick()

            } else if (loc.includes("TextBR")) {
                cy.get(Locs[loc]).contains(data[loc]).rightclick()

            } else if (loc.includes("ImageHolder")) {
                cy.get(Locs[loc])
                    .attachFile(data[loc])

            } else if (loc.includes("Btn")) {

                if (loc.includes("open")) {
                    cy.get(Locs[loc]).contains("01A Draft").should("have.text", "01A Draft").dblclick()
                } else {
                    cy.get(Locs[loc]).click({ force: true })
                }

            } else if (loc.includes("NoteButton")) {
                cy.wait(250)
                cy.get(Locs[loc]).click()

            } else if (loc.includes("DoubleClick")) {
                cy.wait(250)
                cy.get(Locs[loc]).dblclick()

            } else if (loc.includes("clickMe")) {
                cy.wait(550)
                cy.get(Locs[loc]).click()
                cy.get(data[loc]).drag(Locs[loc], {
                    source: { deltax: 100, deltay: 100 }, // applies to the element being dragged
                    target: { position: 'center' }, // applies to the drop target
                    force: true, // applied to both the source and target element
                })

            } else if (loc.includes("Draw")) {
                cy.get(Locs[loc]).click()

                cy.get(Locs[loc]).move({
                    deltaX: 300, deltaY: 300,
                    source: { x: 100, y: 100 }, // applies to the element being dragged
                    target: { position: 'center' }, // applies to the drop target
                    force: true // applied to both the source and target element
                })

            } else if (loc.includes("Multiple")) {
                // cy.get(Locs[loc]).click()

                cy.get(Locs[loc]).move({
                    deltaX: data[loc].x, deltaY: data[loc].y,
                    source: { x: 100, y: 100 }, // applies to the element being dragged
                    target: { position: 'center' }, // applies to the drop target
                    force: true
                })

            } else if (loc.includes("Canvas")) {

                cy.get(Locs[loc]).click("center")

            } else if (loc.includes("ClickArea")) {

                cy.get(Locs[loc]).click(data[loc].x_axis, data[loc].y_axis, { force: true })

            } else if (loc.includes("Clik2")) {

                cy.get(Locs[loc]).click(data[loc].x_axis, data[loc].y_axis)

            }
            else if (loc.includes("PixelClick")) {

                cy.get(Locs[loc]).rightclick(data[loc].x, data[loc].y)
                cy.get(Locs[loc]).click(data[loc].x)

            } else if (loc.includes("ClickEnter")) {
                cy.get(Locs[loc]).type("{enter}")

            } else if (loc.includes("Radio")) {
                cy.get(Locs[loc]).check(data[loc])

            } else if (loc.includes("RightClickMenu")) {

                cy.get(Locs[loc]).rightclick()
                cy.get(data[loc]).click()

            } else if (loc.includes("PastedWidgetMenu")) {
                cy.get(Locs[loc]).click() // Click ... menu btn
                cy.get(data[loc]).click() // Delete option from the dropdown

            } else if (loc.includes("colorAssert")) {
               
                cy.get(Locs[loc]).should('have.css', data[loc]["property"], data[loc]["color"])

            } else if (loc.includes("MultipleButton")) {
                cy.get(Locs[loc]).each((col, index, list) => {
                    cy.wrap(col).click({ force: true })
                })
            } else if (loc.includes("ContainsText")) {
                cy.get(Locs[loc]).should("contain", data[loc])

            } else if (loc.includes("ColorBefore")) {
                getbBeforeAfterValue(Locs[loc], "before", data[loc], getColor(loc))

            } else if (loc.includes("ColorAfter")) {
                getbBeforeAfterValue(Locs[loc], "after", data[loc], getColor(loc))

            } else if (loc.includes("VisitUrl")) {
                cy.get(Locs[loc]).invoke("val").then(inputValue => {
                    cy.get(locators.doneBtn).click()
                    cy.get(commonLocators.homeBtn).click()
                    cy.get(SignInLocators.logoutBtn).click()
                    cy.wait("@signOut").its("response.statusCode").should("eq", 302)
                    cy.visit(inputValue)
                })

            } else if (loc.includes("LoginButton")) {

                cy.get(SignInLocators.logoutBtn).click()
                cy.wait("@signOut").its("response.statusCode").should("eq", 302)
                cy.visit("https://recette.draft.io//login")

            } else if (loc.includes("ShareDraft")) {

                cy.get(locators.doneBtn).click()
                cy.get(commonLocators.homeBtn).click()
                cy.get(SignInLocators.logoutBtn).click()
                cy.wait("@signOut").its("response.statusCode").should("eq", 302)


            } else if (loc.includes("InputField")) {
                cy.get(Locs[loc]["input"]).invoke("val").then(inputValue => {
                    cy.get(Locs[loc]["value"])
                        .eq(data[loc])
                        .should("contain", inputValue)
                })

            } else if (loc.includes("LabelField")) {
                cy.get(Locs[loc]["label"]).invoke("text").then(labelValue => {
                    cy.get(Locs[loc]["value"])
                        .eq(data[loc])
                        .should("contain", labelValue)
                })

            } else if (loc.includes("Msg")) {
                cy.get(Locs[loc]).should("have.text", data[loc])

            } else if (loc.includes("NotInDOM")) {
                cy.get(Locs[loc]).should("not.exist")

            } else if (loc.includes("BeInDOM")) {
                cy.get(Locs[loc]).should("exist")

            } else if (loc.includes("BeVisible")) {
                cy.get(Locs[loc]).should("be.visible")

            } else if (loc.includes("BeDisabled")) {
                cy.get(Locs[loc]).should("be.disabled")

            } else if (loc.includes("IsFocused")) {
                cy.get(Locs[loc]).should("be.focused")

            } else if (loc.includes("Evaluated")) {
                cy.get(Locs[loc]).should("have.value", data[loc])

            } else if (loc.includes("@")) {
                cy.wait(loc).its("response.statusCode").should("eq", Locs[loc])

            } else if (loc.includes("haveText")) {
                cy.get(Locs[loc]).invoke("text").then(copy => {
                    expect(copy).to.equal(data[loc])
                })
            } else if (loc.includes("MultipleInputs")) {
                cy.get(Locs[loc]).each((col, index, list) => {
                    cy.wrap(col).clear()
                    cy.wrap(col).type(data[loc] + numToWords(index + 1))
                })
            } else if (loc.includes("Guest")) {
                cy.clearLocalStorage()
                cy.visit("{ctrl}v")

            } else if (loc.includes("Reload")) {
                cy.reload()
                cy.wait(100)

            } else if (loc.includes("Replace")) {
                cy.get(Locs[loc]).clear({ force: true })
                cy.get(Locs[loc]).type(data[loc].a)
                cy.get(Locs[loc]).type(data[loc].b)
                cy.get(Locs[loc]).type(data[loc].c)
                cy.get(Locs[loc]).type(data[loc].d)
                cy.get(Locs[loc]).type(data[loc].e)
                cy.get(Locs[loc]).type(data[loc].f)

            } else if (loc.includes("UNIQUE_")) {
                cy.get(Locs[loc]).clear({ force: true })
                if (loc.includes("Name")) {
                    cy.get(Locs[loc]).type(getUniqueName(data[loc]))
                } else {
                    cy.get(Locs[loc]).type(getUniqueEmail(data[loc]))
                }
            } else if (loc.includes("Radio")) {
                cy.get(Locs[loc]).check(data[loc])

            } else {
                cy.get(Locs[loc]).clear({ force: true })
                cy.get(Locs[loc]).type(data[loc], { force: true }) //Locs[loc] = "div.vertice textarea" && data[loc] =  "Chunked Note"
            }
        }
    })
}

Given("the user is logged in successfully.", () => {
    cy.get(commonLocators.sideNavMenu).should("be.visible")
})

Given("the user redirects to the URL: {string}.", (url) => {
    cy.visit(url)
})

Then("the {string} validation error should appear.", (validationError) => {
    cy.get(commonLocators.validationError).contains(validationError).should("have.text", validationError)
})

Then("the {string} validation error should appear against phone number field.", (validationError) => {
    cy.get(commonLocators.phoneValidationError).should("have.text", validationError)
})

When("the user navigates to the {string} screen via {string}.", (subScreen, screen) => {
    cy.get(commonLocators.menuBtn).contains(screen).click()
    cy.get(commonLocators.subMenuBtn).contains(subScreen).click({ force: true })
})

When("the user navigates to the {string} screen.", (screen) => {
    cy.get(commonLocators.menuBtn).contains(screen).click()
})

Then("the user should be moved to the {string} screen.", (screen) => {
    if (screen.includes("sign")) {
        cy.get(commonLocators[screen]).should("be.visible")
    } else {
        cy.get(commonLocators.pageHeading).should("contain", screen)
    }
})

When("the user hits the {string} button at {string} screen.", (btn, btnType) => { // Major Clicks
    let locators = getLocators(btnType)
    cy.get(locators[btn]).click({ force: true })
})