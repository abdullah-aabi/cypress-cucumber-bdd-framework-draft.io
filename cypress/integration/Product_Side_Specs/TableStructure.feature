Feature: All Widget test cases

    This Feature: contains all the test cases 

    Scenario: Creating Table to the draft canvas.
        And the user "addsMatrix" at the "Widget" screen.

    Scenario: Table Headings to the draft canvas.
        And the user "addsHeading" at the "Widget" screen.

    Scenario: Table List items to the draft canvas.
        When the user "addsWidget" at the "Widget" screen.
         And the user "addsWidget2" at the "Widget" screen.
          And the user "addsWidget3" at the "Widget" screen.

# Scenario: Destroy the draft canvas.
# When the user "destroyMediaDraft" at the "Widget" screen.