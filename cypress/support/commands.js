// <reference types="Cypress" />

import 'cypress-mailosaur'

const commonLocators = require("../Locators/commonLocators.json")
const SignInLocators = require("../Locators/SignInLocators.json")
const SignUpLocators = require("../Locators/SignUpLocators.json")
require('@4tw/cypress-drag-drop')
// require('cypress-downloadfile/lib/downloadFileCommand')

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add("loginWithApia", (username, password) => {

  cy.getLoginCookie().then(cookie => {
    cy.request({
      method: "POST",
      url: "/login",
      headers: {
        "host": Cypress.config().baseUrl.split("//")[1],
        "connection": "keep-alive",
        "accept": "/",
        // "Authorization": "Bearer undefined",
        "origin": Cypress.config().baseUrl + "/",
        "referer": Cypress.config().baseUrl + "/login",
        "cookie": "_session_id=" + cookie
      },
      body: {
        "email": username,
        "password": password,
        "async": true
      }
    }).then((response) => {
      expect(response.status).equal(200)
      // Storing user Data in Cache
      cy.window().then((window) => {
        window.localStorage.setItem("profile", JSON.stringify(response.body))
        cy.log("The user logged in successfully")
        cy.visit("/login")
      })
    })
  })
})

Cypress.Commands.add("loginWithApi", (username, password) => {
  cy.request({
    method: "GET",
    url: "/login",
    headers: {
      "connection": "keep-alive",
      "accept": "text/html,/",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      "host": Cypress.config().baseUrl.split("//")[1],
    }
  }).then((response) => {
    // cy.log(JSON.stringify(response.body))
    // Fetching token from the login get api
    let token = JSON.stringify(response.body).split("meta content=")[2]
    token = token.split(" ")[0]
    token = token.replaceAll('"', "")
    token = token.replaceAll('\\', '')
    // cy.log(token)

    // Fetching cookie from the login get api
    let cookie = JSON.stringify(response.headers).split("_session_id=")[1]
    cookie = cookie.split("; ")[0]
    // cy.log(cookie)

    // Hitting login api. 
    cy.request({
      method: "POST",
      url: "/login",
      headers: {
        "host": Cypress.config().baseUrl.split("//")[1],
        "connection": "keep-alive",
        "accept": "/",
        // "Authorization": "Bearer undefined",
        "origin": Cypress.config().baseUrl + "/",
        "referer": Cypress.config().baseUrl + "/login"
      },
      body: {
        "email": username,
        "password": password,
        "async": true,
        "authenticity_token": token
      }
    }).then((response) => {
      expect(response.status).equal(200)
      // Storing user Data in Cache
      cy.window().then((window) => {
        window.localStorage.setItem("profile", JSON.stringify(response.body))
        cy.log("The user logged in successfully")
        cy.visit("/")
        cy.get(commonLocators.homeBtn).should("be.visible")
        cy.url().then(currentUrl => {
          if (currentUrl != Cypress.config().baseUrl + "/app") {
            cy.get(commonLocators.homeBtn).click()
            cy.get(commonLocators.closeTabBtn).click({ multiple: true })
          }
        })

      })
    })
  })
})
//Function For Guest Draft
Cypress.Commands.add("loginWithUI", (username, password, page) => {
  cy.visit("/login")
  // Check if the user is on the Main page. 
  cy.get(SignUpLocators.loginBtn).should("be.visible")

  if (page != "Sign up") {
    // Enter credentials and log in.
    cy.get(SignInLocators.emailField).type(username)
    cy.get(SignInLocators.passwordField).type(password)

    cy.get(SignInLocators.loginBtn).click()
    // cy.wait("@login").its("response.statusCode").should("eq", 200)
    cy.wait("@testr").then(res => {
      cy.log(JSON.stringify(res))
    })
    cy.get(commonLocators.homeBtn).should("be.visible")
  } else {
    cy.get(SignUpLocators.signUpLink).click({ force: true })
  }

})

Cypress.Commands.add("runRoutes", () => {
  cy.intercept("GET", "/login").as("getCookie")
  cy.intercept("POST", "/login").as("login")
  cy.intercept("GET", "https://ka-f.fontawesome.com/releases/*").as("testr")
  cy.intercept("POST", "/get-started").as("createAccount")
  cy.intercept("POST", "/api/edit/update_lang").as("updateLanguage")
  cy.intercept("POST", "/api/edit/update_lang").as("updateLanguage2")
  cy.intercept("POST", "/api/edit/create_doc").as("createDraft")
  cy.intercept("GET", "/signout").as("signOut")
  cy.intercept("GET", "https://recette.draft.io").as("assertDraft")
  cy.intercept("GET", "/api/edit/get_folder_direct_content").as("assertFolder")
  cy.intercept("Post", "/api/edit/set_draft_options").as("assertSettings")
  cy.intercept("GET", "/assets/APP_Icons/light-outer-space/card-icons/ico_card_description.svg").as("assertDownload")
  cy.intercept("Post", "/api/edit/set_preference").as("assertWait")


})
Cypress.Commands.add('simulateOpenLayersEvent', (ol, map, type, x, y, opt_shiftKey = undefined) => {
  var viewport = map.getViewport();
  let position = viewport.getBoundingClientRect();
  cy.log(`left: ${position.left}, top: ${position.top}, width: ${position.width}, height: ${position.height}`)
  cy.get('canvas').trigger(type, {
    clientX: position.left + x + (position.width / 2),
    clientY: position.top + y + (position.height / 2),
  })
})
