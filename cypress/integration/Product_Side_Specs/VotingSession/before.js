before(() => {
    // Login in to app.
    cy.log("This is inner before call")
    cy.runRoutes()
    // cy.loginWithUI(Cypress.env("Username"), Cypress.env("Password"), "")
    cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
})  