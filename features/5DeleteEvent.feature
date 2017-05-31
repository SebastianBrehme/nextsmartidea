Feature: Delete Event

As member
I want to delete an event

Scenario: Delete Event works fine
 Given I navigate to "http://localhost:4200/login"
 And I wait for 4 sec
 When I click on element having class "button-deleteEvent"
 And I wait for 2 sec
 Then element having id "eventContainer#0:0" should not be present
 And link having text "New Edit Event Test" should not be present
 And I click on link having text "Logout"
 And I wait for 2 sec
 And I close browser
