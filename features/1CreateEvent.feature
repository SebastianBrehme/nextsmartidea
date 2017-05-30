Feature: Create Event

 As a member 
 I want to create a Event

 Scenario: Create Event failed
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 4 sec
 And I click on link having text "Logintestestest"
 And I wait for 2 sec
 And I enter "nextsmartidea@gmail.com" into input field having id "Email"
 And I click on element having id "next"
 And I wait for 2 sec
 And I enter "ideasmartnext" into input field having id "Passwd"
 And I click on element having id "signIn"
 And I wait for 4 sec
 When I click on element having id "createEvent"
 And I wait for 2 sec
 And I enter "New Create Event Test" into input field having id "eventName"
 And I enter "Description Text" into input field having id "eventDescription"
 And I select "Party" option by text from dropdown having id "eventType"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "19:00" into input field having id "inputTimeTo"
 And I check the checkbox having name "checkboxAgree"
 And I click on element having class "btn-primary"
 Then element having class "text-danger" should have text as "Date-From has to be before Date-To"

 Scenario: Create Event failed
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 4 sec
 When I click on element having id "createEvent"
 And I wait for 2 sec
 And I enter "New Create Event Test" into input field having id "eventName"
 And I enter "Description Text" into input field having id "eventDescription"
 And I select "Party" option by text from dropdown having id "eventType"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "20:00" into input field having id "inputTimeTo"
 And I click on element having class "btn-primary"
 Then element having class "text-danger" should have text as "please agree..."

 Scenario: Create Event works fine
 Given I navigate to "https://smartevent-a3c4f.firebaseapp.com/login"
 And I wait for 4 sec
 When I click on element having id "createEvent"
 And I wait for 2 sec
 And I enter "New Create Event Test" into input field having id "eventName"
 And I enter "Description Text" into input field having id "eventDescription"
 And I select "Party" option by text from dropdown having id "eventType"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "20:00" into input field having id "inputTimeTo"
 And I check the checkbox having name "checkboxAgree"
 Then I click on element having class "btn-primary"
 And I wait for 2 sec
