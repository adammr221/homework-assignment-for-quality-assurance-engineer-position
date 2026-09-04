# Homework Assignment for Quality Assurance Engineer Position

This is a **Node.js + TypeScript Playwright test automation project** containing both UI and API tests.

The other answers can be found at the bottom of the page.

## Application

- **UI Base URL:** https://demo.realworld.show
- **API Base URL:** https://api.testauto.app/api/v1
- **Swagger:** https://api.testauto.app/swagger-ui/index.html

## Project Structure

The project supports two environments:

- **Dev**
- **Prod**

Environment configuration is handled using **dotenv** and **cross-env**.

The environment files are located in the `env` folder:

```text
env/
├── .env.dev
└── .env.prod
```

The selected environment is provided through the `ENV` variable:

```bash
ENV=dev
```

or:

```bash
ENV=prod
```

The `playwright.config.ts` file uses `dotenv` to load the appropriate environment configuration based on the value provided through `ENV`.

## Test Execution

The project is configured to use **1 worker globally**.

This is intentional because the tests share backend data. Running them in parallel can cause flaky tests, so they are run one at a time.

## Playwright Projects

The Playwright configuration contains four projects:

- **api** – API tests
- **chromium** – UI tests in Chromium
- **webkit** – UI tests in WebKit
- **firefox** – UI tests in Firefox

## Prerequisites

Before running the project, make sure you have:

- Node.js installed

Install the project dependencies:

```bash
npm install
```

## Running the Tests

The main test commands are defined in `package.json`.

### Run all UI tests in production

```bash
npm run test:ui:all:prod
```

This runs the UI tests across Chromium, Firefox, and WebKit.

### Run API tests in production

```bash
npm run test:api:prod
```

### Run smoke tests in production

```bash
npm run test:smoke:prod
```

## Task 1: Manual Testing

```
assignment/Test_Cases_xlsx.xlsx
assignment/Test_Cases_pdf.pdf
assignment/bug_report_xlsx.xlsx
assignment/bug_report_pdf.pdf

```

## CI Integration

I added the following CI components to the project using **GitHub Actions**:
GitHub Actions workflows are located in the `.github/workflows` folder.

- **Pull Request Template**
- **PR Validator** – automatically runs the smoke tests when a PR is created or updated. The PR can only be merged if the validation passes.
- **Nightly API Regression** – runs all API tests automatically every night.
- **Nightly UI Regression** – runs all UI tests across Chromium, Firefox, and WebKit every night.
- **Notifications** – nightly regression results can be sent to a Microsoft Teams or Slack channel so the team is immediately aware of failures. **(Not implemented)**

GitHub Actions is the CI tool used to automate these test executions and workflows.

### Jenkins

As an alternative CI solution, I would configure a **Jenkins pipeline** to automatically:

1. Check out the code.
2. Install dependencies.
3. Run the automated tests.
4. Publish the test results.

The pipeline could be triggered after each commit or on a scheduled basis.

## JUnit + Selenium

I would use **Selenium WebDriver** to interact with the browser and **JUnit** to organize and execute the tests and verify the expected results using assertions.

### Reference Project

For reference, an older Selenium + JUnit automation project is available here:

https://github.com/adammr221/Vizsgaremek_notebook

## Docker

Docker is a tool that allows us to run an application and everything it needs inside a container.

For a QA engineer, Docker is useful because it provides a separeted testing environment across different machines. This helps avoid environment-related problems.

For example, I can create a Docker image containing Node.js, Playwright, and my test dependencies. A colleague can clone the project, build the same image, and run the tests inside a container using the same environment.

**To run the tests, first navigate to the root of the project using BASH terminal and run:**

The first one builds the image from the Dockerfile.

The second one creates a container from the image, runs the tests, and removes the container.

```bash
docker build -t playwright-tests .
docker run --rm playwright-tests
```
