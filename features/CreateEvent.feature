Feature: Create Event

 As a member 
 I want to create a Event

 Scenario: Create Event works fine
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 1 sec
 And I click on element having class "btn-default"
 And I wait for 1 sec
 And I enter "nextsmartidea@gmail.com" into input field having id "Email"
 And I click on element having id "next"
 And I wait for 1 sec
 And I enter "ideasmartnext" into input field having id "Passwd"
 And I click on element having id "signIn"
 And I wait for 4 sec
 And I refresh page
 When I click on element having id "createEvent"
 And I wait for 2 sec
 And I enter "New Event test" into input field having id "eventName"
 And I check the checkbox having name "checkboxAgree"
 And I click on element having class "btn.primary"
 Then I see the Event Overview
