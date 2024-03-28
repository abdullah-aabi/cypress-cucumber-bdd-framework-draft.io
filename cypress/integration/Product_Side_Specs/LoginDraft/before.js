before(() => {
    // Login in to app.
    cy.log("This is inner before call")
    cy.runRoutes()
    // cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
    cy.clearLocalStorage()
    cy.visit("https://draft.io/login")
})