Feature: Line Widget test cases

    This Feature: contains all the test cases of Line Widget test cases

    Scenario: Add Plain line to the draft canvas.
    When the user "addsPlainLine" at the "Drafts" screen.

    Scenario: Add Single-headed arrow to the draft canvas.
    When the user "addsSingleHeadedArrow" at the "Drafts" screen.

    Scenario: Add Double-headed arrow to the draft canvas.
    When the user "addsDoubleHeadedArrow" at the "Drafts" screen.

    Scenario: Add 2x2 matrix to the draft canvas.
    And the user "adds2x2Matrix" at the "Drafts" screen.

    Scenario: Add XY Referenced Centered to the draft canvas.
    When the user "addsXyReferencedCentered" at the "Drafts" screen.

    Scenario: Add XY Referenced Centered to the draft canvas.
    When the user "addsXyReference" at the "Drafts" screen.

    Scenario: Destroy the draft canvas.
    When the user "destroyLineDraft" at the "Drafts" screen.