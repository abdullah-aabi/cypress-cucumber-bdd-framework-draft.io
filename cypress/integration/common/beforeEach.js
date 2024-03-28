beforeEach(() => {
    Cypress.Cookies.preserveOnce('__stripe_sid', '__stripe_mid', 'email', '_session_id', 'axeptio_cookies', '_gid', '_ga', 'axeptio_all_vendors', 'axeptio_authorized_vendors')
    cy.restoreLocalStorage()
    cy.runRoutes()
})
