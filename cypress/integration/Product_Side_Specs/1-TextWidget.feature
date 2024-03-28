Feature: Text Widget test cases

    This Feature: contains all the test cases of Text Widget test cases

    Scenario: Add Chunked note to the draft canvas.
        When the user "createsChunkedNote" at the "TextWidget" screen.

    Scenario: Add Heading one (45 px) to the draft canvas.
        When the user "addsHeadingOne" at the "TextWidget" screen.

    Scenario: Add Heading two (22 px) to the draft canvas.
        When the user "addsHeadingTwo" at the "TextWidget" screen.

    Scenario: Add Heading three (15 px) to the draft canvas.
        And the user "addsHeadingThree" at the "TextWidget" screen.

    Scenario: Add Squared Sticky note to the draft canvas.
        When the user "createsSquareStickyNotes" at the "TextWidget" screen.

    Scenario: Add Rectangular Sticky note to the draft canvas.
        When the user "createsRectangularStickyNotes" at the "TextWidget" screen.

    Scenario: Add Rectangular Text box to the draft canvas.
        When the user "createsRectangularTextBox" at the "TextWidget" screen.

    Scenario: Add Ellipse Text box to the draft canvas.
        When the user "createsEllipseTextBox" at the "TextWidget" screen.

    Scenario: Add Triangle Text box to the draft canvas.
        When the user "createsTriangleTextBox" at the "TextWidget" screen.

    Scenario: Add Rhombus Text box to the draft canvas.
        When the user "createsRhombusTextBox" at the "TextWidget" screen.

    Scenario: Add Card to the draft canvas.
        When the user "createsCard" at the "TextWidget" screen.

    Scenario: Destroy the draft canvas.
        When the user "destroyTextDraft" at the "TextWidget" screen.