# Setup:

1) install node v20+
 -  install nvm/fnm then install node v20+
     -  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
     -  `nvm install 20`
 - you can also follow instructions from https://nodejs.org/en/download

2) install dependencies: 
- `npm install`

#### how to run all tests: (from the root of the project)
 - `npx playwright test`

#### how to run specific tests:
 - `npx playwright test <relative-path-to-test-file>`

#### how to run tests in debug mode (with UI & code side by side):
 - add `--debug` to the command
 - example: `npx playwright test specification.spec.js --debug`
 - test can break if browser window is interacted with

#### how to view test results (including *screenshots*):
 - `npx playwright show-report`

--- 

# Future improvements:
 - as it stands, using specification.spec.js we can test multiple languages - just need to add the other locales to the localisation object
 - break down different localisation language strings into separate files and granulate strings into smaller strings
 - add tags to tests to run specific tests
 - integrate with the CI system available in the project
 - annotate tests with links to specification and/or task management platform
 - 