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
  And I clear input field having id "inputDateFrom"
 And I clear input field having id "inputTimeFrom"
 And I clear input field having id "inputDateTo"
 And I clear input field having id "inputTimeTo"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "20:00" into input field having id "inputTimeTo"
 And I enter "nextsmartidea@gmail.com" into input field having name "currentInviteString"
 And I click on element having class "btn-primary"
 And I wait for 30 sec
 Then element having class "container" should have partial text as "nextsmartidea@gmail.com"
 And I wait for 2 sec
