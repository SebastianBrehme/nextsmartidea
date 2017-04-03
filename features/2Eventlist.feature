Feature: See list of Events

As a member with Events
I want to see the Events

Scenario: See Events in Dashboard
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 4 sec
 Then element having id "eventContainer#0" should have partial text as "New Create Event Test"
 And I wait for 2 sec

Scenario: See Events in Sidebar
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 4 sec
 Then link having text "New Create Event Test" should be present
 And I wait for 2 sec