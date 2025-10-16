# Playwright JS Test Automation Framework

This repository contains a simple test automation framework built with Playwright and JavaScript for User Interface (UI) and Application Programming Interface (API) test automation, along with proper test data management, custom reporting using Monocart Reporter, and continuous integration/continuous deployment (CI/CD) setup using GitHub Actions.

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
| `UI_tests/` | Contains UI test specifications. |
| `Api_tests/` | Contains API test specifications and helper classes. |
| `pages/` | Contains Page Object Model (POM) files for UI test automation. |
| `userData.js` | Contains user credentials for UI login and checkout information (uses environment variables). |
| `apiData.js` | Contains authentication credentials and booking payloads for API tests (uses environment variables). |
| `APIHelper.js` | Contains helper functions for API test automation. |
| `env.example` | Template file showing required environment variables for secure data management. |
| `.env` | Local environment variables file (not committed to version control). |
| `.gitignore` | Excludes sensitive files and directories from version control. |
| `test-results/` | Contains generated test reports and artifacts. |
| `.github/workflows/` | Contains the GitHub Actions workflow file for CI/CD. |

## 3. Setup and Execution Instructions

### Prerequisites

1.  **Node.js**: Ensure you have Node.js (version 18+) installed.
2.  **Git**: Ensure you have Git installed.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dumza4life/playwright-JS-test-framework.git
    cd playwright-JS-test-framework
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

4.  **Set up secure test data:**
    ```bash
    # Copy the environment template
    cp env.example .env
    
    # Edit .env file with your actual test data
    # The .env file contains sensitive information and is not committed to version control
    ```

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
    ```bash
    npx playwright test
    ```

2.  The report will be generated in the `test-results/` directory. Open the file in your browser:
    ```bash
    open test-results/monocart-report.html
    # or on Linux
    xdg-open test-results/monocart-report.html
    ```

## 4. Test Data Management & Security

This framework implements secure test data management using environment variables to protect sensitive information.

### Secure Data Handling

-   **Environment Variables**: All sensitive test data is stored in environment variables
-   **Template File**: `env.example` provides a template for required environment variables (with placeholder values, no sensitive data)
-   **Fallback Values**: Test data files include fallback values for development
-   **Git Protection**: Sensitive data files are excluded from version control via `.gitignore`

### Data Files

-   `userData.js`: Contains user credentials for UI login and checkout information (uses environment variables)
-   `apiData.js`: Contains authentication credentials and booking payloads for API tests (uses environment variables)
-   `APIHelper.js`: Contains helper functions for API test automation
-   `env.example`: Template file showing required environment variables (with placeholder values, no sensitive data)

### Setup Instructions

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Edit the `.env` file and add test data:**
   ```bash
   # API credentials are public test data - no changes needed
   API_USERNAME=admin
   API_PASSWORD=password123
   
   # Update with any random details, can be John Doe, 7708 does not matter or you can use your details
   CHECKOUT_FIRST_NAME=your_actual_first_name
   CHECKOUT_LAST_NAME=your_actual_last_name
   CHECKOUT_ZIP_CODE=your_actual_zip_code
   # ... other personal variables with your actual values
   ```

3. **Install dependencies (including dotenv):**
   ```bash
   npm install
   ```

### Security Best Practices

- **Never commit `.env` files** - They are excluded in `.gitignore`
- **Use environment variables** - Sensitive data is not hardcoded
- **Template-based setup** - `env.example` shows required variables
- **Fallback values** - Tests work with default values if env vars are missing
- **CI/CD ready** - Environment variables can be set in CI/CD pipelines

## 5. CI/CD Integration (GitHub Actions)

The framework is configured with a GitHub Actions workflow (`.github/workflows/playwright.yml`) to run tests automatically on every push and pull request to the `main` or `master` branches.

### CI/CD Workflow Details

-   **Job:** `test`
-   **Runner:** `ubuntu-latest`
-   **Steps:**
    1.  Checkout code.
    2.  Setup Node.js (version 20).
    3.  Install dependencies (`npm ci`).
    4.  Install Playwright system dependencies and browsers (`npx playwright install --with-deps`).
    5.  Run all tests (`npx playwright test`) with secure environment variables.
    6.  Upload the **Monocart Report** as a build artifact named `playwright-report`.

### CI/CD Security Features

- **Environment Variables**: All test data is securely provided via GitHub Actions environment variables
- **No Hardcoded Secrets**: Sensitive data is never committed to the repository
- **Secure Test Data**: All credentials and test data are externalized
- **Artifact Generation**: Test reports are automatically generated and uploaded
- **Parallel Execution**: Tests run efficiently with proper worker configuration

You can view the test execution evidence by checking the **Actions** tab in the GitHub repository and downloading the `playwright-report` artifact from a completed run.