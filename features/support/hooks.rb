#Cucumber provides a number of hooks which allow us to run blocks at various points in the Cucumber test cycle
begin require 'rspec/expectations'; rescue LoadError; require 'spec/expectations'; end
require 'selenium-webdriver'
require 'sauce_whisk'
#require_relative '../page_objects/home_page'


Before do
  # Do something before each scenario.
end

Before do |scenario|
  # The +scenario+ argument is optional, but if you use it, you can get the title,
  # description, or name (title + description) of the scenario that is about to be
  # executed.
  capabilities_config = {
    :version => "57",#"#{ENV['version']}",
    :platform => "win10", #"#{ENV['platform']}",
    :name => "#{scenario.feature.name} - #{scenario.name}"
  }
  build_name = ENV['JENKINS_BUILD_NUMBER'] || ENV['SAUCE_BAMBOO_BUILDNUMBER'] || ENV['SAUCE_TC_BUILDNUMBER'] || ENV['SAUCE_BUILD_NAME']
  capabilities_config[:build] = build_name unless build_name.nil?

  capabilities = Selenium::WebDriver::Remote::Capabilities.send('chrome'.to_sym, capabilities_config)

  url = "https://#{ENV['SAUCE_USERNAME']}:#{ENV['SAUCE_ACCESS_KEY']}@ondemand.saucelabs.com:443/wd/hub".strip

  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 180

  @browser = Selenium::WebDriver.for(:remote, :url => url, :desired_capabilities => capabilities, :http_client => client)
end

After do |scenario|
    sessionid = @browser.send(:bridge).session_id
  jobname = "#{scenario.feature.name} - #{scenario.name}"

  puts "SauceOnDemandSessionID=#{sessionid} job-name=#{jobname}"

  @browser.quit

  if scenario.passed?
    SauceWhisk::Jobs.pass_job sessionid
  else
    SauceWhisk::Jobs.fail_job sessionid
  end
end

#Tagged hooks

Before('@Ex_tag1, @Ex_tag2') do
  # This will only run before scenarios tagged
  # with @Ex_tag1 OR @Ex_tag2.
end

AfterStep('@Ex_tag1, @Ex_tag2') do |scenario|
  # This will only run after steps within scenarios tagged
  # with @Ex_tag1 AND @Ex_tag2.
end

Around('@Ex_tag1') do |scenario, block|
  # Will round around a scenario
end

AfterConfiguration do |config|
  # Will run after cucumber has been configured
end

# Quit the selenium driver from the example tests.
at_exit do

end
