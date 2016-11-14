Feature: Invite Member to Event

  As a member
  I want to Invite someone to my Event

  Scenario: Invite someone to my Event works fine
    Given I am logged in with Google Account
    And I am in the Event Overview of my Event
    When I press "Add Member"
    And I enter a valid Email Address
    And I press "Invite"
    Then I see the "Event Overview"
    And the Application sends an invitation via mail
    
  Scenario: Invite someone to my Event failed
    Given I am logged in with Google Account
    And I am in the Event Overview of my Event
    When I press "Add Member"
    And I enter an invalid Email Address
    And I press "Invite"
    Then I see a hint that the Email Address is invalid