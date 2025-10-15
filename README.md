# Playwright JS Test Automation Framework

This repository contains a simple test automation framework built with **Playwright** and **JavaScript**. It demonstrates skills in both **User Interface (UI)** and **Application Programming Interface (API)** test automation, along with proper test data management, custom reporting using **Monocart Reporter**, and continuous integration/continuous deployment (CI/CD) setup using **GitHub Actions**.

## 1. Test Targets

| Test Type | Application Under Test (AUT) | Base URL | Scope |
| :--- | :--- | :--- | :--- |
| **UI Tests** | SauceDemo E-commerce Site | `https://www.saucedemo.com` | Authentication (multiple users), Inventory Management, Shopping Cart, Checkout Process. |
| **API Tests** | Restful-Booker API | `https://restful-booker.herokuapp.com` | Authentication, Booking CRUD operations (Create, Read, Update, Delete), Response Validation. |

## 2. Technical Requirements and Structure

The framework is structured to promote maintainability and readability:

| Directory/File | Purpose |
| :--- | :--- |
| `playwright.config.js` | Main Playwright configuration, including projects for UI and API tests, and Monocart reporter setup. |
| `tests/ui/` | Contains UI test specifications and Page Object Model (POM) files. |
| `tests/api/` | Contains API test specifications and helper classes. |
| `data/` | Stores external test data (e.g., user credentials, booking payloads) for easy management. |
| `.github/workflows/` | Contains the GitHub Actions workflow file for CI/CD. |

## 3. Setup and Execution Instructions

### Prerequisites

1.  **Node.js**: Ensure you have Node.js (version 18+) installed.
2.  **Git**: Ensure you have Git installed.

### Local Setup

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/Dumza4life/playwright-JS-test-framework.git
    cd playwright-JS-test-framework
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`

3.  **Install Playwright browsers:**
    \`\`\`bash
    npx playwright install
    \`\`\`

### Running Tests

The `playwright.config.js` file defines two main projects: `ui-chromium` and `api-tests`.

| Command | Description |
| :--- | :--- |
| `npx playwright test` | Runs all UI and API tests in parallel. |
| `npx playwright test --project=ui-chromium` | Runs only the UI tests against the SauceDemo application. |
| `npx playwright test --project=api-tests` | Runs only the API tests against the Restful-Booker API. |
| `npx playwright test --ui` | Starts the Playwright UI mode for interactive debugging. |

### Viewing Results (Custom Reporting)

This framework uses the **Monocart Reporter** for custom, feature-rich reporting.

1.  **Run the tests:**
    \`\`\`bash
    npx playwright test
    \`\`\`

2.  The report will be generated in the `test-results/` directory. Open the file in your browser:
    \`\`\`bash
    open test-results/monocart-report.html
    # or on Linux
    xdg-open test-results/monocart-report.html
    \`\`\`

## 4. Test Data Management

Test data is externalized in the `data/` directory using JavaScript objects, which are then imported into the test files.

-   `data/userData.js`: Contains user credentials for UI login and checkout information.
-   `data/apiData.js`: Contains authentication credentials and booking payloads for API tests.

This approach separates data from test logic, making tests cleaner and easier to maintain.

## 5. CI/CD Integration (GitHub Actions)

The framework is configured with a GitHub Actions workflow (`.github/workflows/playwright.yml`) to run tests automatically on every push and pull request to the `main` or `master` branches.

### CI/CD Workflow Details

-   **Job:** `test`
-   **Runner:** `ubuntu-latest`
-   **Steps:**
    1.  Checkout code.
    2.  Setup Node.js.
    3.  Install dependencies (`npm ci`).
    4.  Install Playwright system dependencies and browsers (`npx playwright install --with-deps`).
    5.  Run all tests (`npx playwright test`).
    6.  Upload the **Monocart Report** as a build artifact named `playwright-report`.

You can view the test execution evidence by checking the **Actions** tab in the GitHub repository and downloading the `playwright-report` artifact from a completed run.

---


