before(() => {
    // Login in to app.
    cy.log("This is inner before call")
    cy.runRoutes()
    cy.loginWithApi(Cypress.env("Username"), Cypress.env("Password"))
    // cy.visit("https://draft.io/x3b46f46vhmqw6avmq8k9ayy3nzayq78xye37mnuepts")
})