Feature: All Widget test cases

    This Feature: contains all the test cases of Line Widget test cases

    Scenario: Add Chunk Notes to the draft canvas.
    When the user "addsChunkNote" at the "Widget" screen.

    Scenario: Add Heading 1 to the draft canvas.
    When the user "addsHeading1" at the "Widget" screen.

    Scenario: Add Heading 2 to the draft canvas.
    When the user "addsHeading2" at the "Widget" screen.

    Scenario: Add Heading three (15 px) to the draft canvas.
    And the user "addsHeading3" at the "Widget" screen.

    Scenario: Add Rectangular Sticky note to the draft canvas.
    When the user "createsRectangularStickyNotes" at the "Widget" screen.

    Scenario: Add Squared Sticky note to the draft canvas.
    When the user "createsSquareStickyNotes" at the "Widget" screen.

    Scenario: Add Rectangular Text box to the draft canvas.
    When the user "createsRectangularTextBox" at the "Widget" screen.
        
    Scenario: Add Ellipse Text box to the draft canvas.
    When the user "createsEllipseTextBox" at the "Widget" screen.

    Scenario: Add Triangle Text box to the draft canvas.
    When the user "createsTriangleTextBox" at the "Widget" screen.

    Scenario: Add Rhombus Text box to the draft canvas.
    When the user "createsRhombusTextBox" at the "Widget" screen.

    Scenario: Add Card to the draft canvas.
    When the user "createsCard" at the "Widget" screen.

     Scenario: Add Plain line to the draft canvas.
    When the user "addsPlainLine" at the "Widget" screen.

    Scenario: Add Single-headed arrow to the draft canvas.
    When the user "addsSingleHeadedArrow" at the "Widget" screen.

    Scenario: Add Double-headed arrow to the draft canvas.
    When the user "addsDoubleHeadedArrow" at the "Widget" screen.

    Scenario: Add 2x2 matrix to the draft canvas.
    And the user "adds2x2Matrix" at the "Widget" screen.

    Scenario: Add XY Referenced Centered to the draft canvas.
    When the user "addsXyReferencedCentered" at the "Widget" screen.

    Scenario: Add XY Referenced Centered to the draft canvas.
    When the user "addsXyReference" at the "Widget" screen.

    Scenario: Add Rectangle-Frame to the draft canvas.
    When the user "addsRectangleFrame" at the "Widget" screen.

    Scenario: Add Elliptical-Frame arrow to the draft canvas.
    When the user "addsEllipticalFrame" at the "Widget" screen.

    Scenario: Add PolygonHull to the draft canvas.
    When the user "addsPolygoneHull" at the "Widget" screen.

    Scenario: Add Single-headed arrow to the draft canvas.
    When the user "addsRectangleHull" at the "Widget" screen.

    # Scenario: Add LocalMedia to the draft canvas.
    # When the user "addsLocalMedia" at the "Widget" screen.

    # Scenario: Add Website Link to the draft canvas.
    # When the user "addsWebLink" at the "Widget" screen.

    # Scenario: Add Iframe Link to the draft canvas.
    # When the user "addsIframeLink" at the "Widget" screen.

    # Scenario: Add Progress-Bar to the draft canvas.
    # When the user "addsProgressBar" at the "Widget" screen.

    Scenario: Destroy the draft canvas.
    When the user "destroyMediaDraft" at the "Widget" screen.