Feature: Sign Up Feature

    This Feature: contains all the test cases of sign up.

    Scenario: Verify Mandatory, Invalid and blank fields validations.
        Given the user should be moved to the "signUpScreen" screen.
        When the user hits the "submitBtn" button at "SignUp" screen.
        Then the user verify "invalidFields" at the "SignUp" screen.

    # # Enable below scenario only if you have an existing user in this Environment.
    # # If you have, then provide username and password in Cypress.json > env > username and password

    Scenario: Verify Already Existing account validation.
        Given the user verify "alreadyExistingAccount" at the "SignUp" screen.
        And the user get the "alreadyExistingAccount" email sent to the provided email address.

    Scenario: Sign Up a new user in the Application.
        Given the user redirects to the URL: "/get-started".
        And the user should be moved to the "signUpScreen" screen.
        When the user "createsAccount" at the "SignUp" screen.
        Then the user get the "createsAccount" email sent to the provided email address.
