Feature: Add Member to Event

As Member
I want to invite someone to my Event
 
Scenario: Add Member works fine
 Given I navigate to "http://localhost:4200/login"
 And I wait for 4 sec 
 When I click on element having id "eventContainer#0:0" 
 And I wait for 2 sec
 And I click on element having id "buttonEdit"
 And I wait for 2 sec
 And I enter "fbaain@gmail.com" into input field having name "currentInviteString"
 And I click on element having class "btn-primary"
 And I wait for 2 sec
 Then element having class "container" should have partial text as "nextsmartidea@gmail.com"
 And element having class "container" should have partial text as "fbaain@gmail.com"
 And I wait for 2 sec
