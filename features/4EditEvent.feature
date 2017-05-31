Feature: Edit Event

As Member
I want to edit an event

Scenario: Edit Event failed
 Given I navigate to "http://localhost:4200/login"
 And I wait for 4 sec
 When I click on element having id "eventContainer#0:0" 
 And I wait for 2 sec
 And I click on element having id "buttonEdit"
 And I wait for 2 sec
 And I enter "EditEvent Test" into input field having id "eventName"
 And I enter "Description Text" into input field having id "eventDescription"
 And I select "Party" option by text from dropdown having id "eventType"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "18:00" into input field having id "inputTimeTo"
 And I click on element having class "btn-primary"
 Then element having class "text-danger" should have text as "Date-From has to be before Date-To"

Scenario: Edit Event works fine
 Given I navigate to "http://localhost:4200/login"
 And I wait for 4 sec
 When I click on element having id "eventContainer#0:0" 
 And I wait for 2 sec
 And I click on element having id "buttonEdit"
 And I wait for 2 sec
 And I enter "Edit Event Test" into input field having id "eventName"
 And I enter "Description Text" into input field having id "eventDescription"
 And I select "Party" option by text from dropdown having id "eventType"
 And I enter "10.10.2016" into input field having id "inputDateFrom"
 And I enter "19:00" into input field having id "inputTimeFrom"
 And I enter "10.10.2016" into input field having id "inputDateTo"
 And I enter "20:00" into input field having id "inputTimeTo"
 And I click on element having class "btn-primary"
 And I wait for 2 sec
 And I click on link having text "Smart Event"
 Then element having id "eventContainer#0:0" should have partial text as "Edit Event Test"
 And link having partial text "Edit Event Test" should be present
 And I wait for 2 sec
