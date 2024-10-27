Here's a `README.md` for the root of the `movietrack` project, including a relative link to the test-specific `README.md` that will work both locally and on GitHub.

---

# MovieTrack Project

The `movietrack` project is a movie management application designed to handle movie data through a combination of frontend and backend services. This project utilizes a modular structure, organized to separate frontend, backend, and shared components, ensuring clear responsibility areas.

## Project Overview

The `movietrack` project includes the following components:
- **Frontend**: React-based UI using Next.js for server-side rendering, Styled Components for styling, and Jest for testing.
- **Backend**: API endpoints using Next.js API routes with a structured service and repository layer for movie data.
- **Shared Components**: Reusable UI elements and utilities shared across the application.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/movietrack.git
   cd movietrack
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
    - Duplicate `.env.example` and rename it to `.env`.
    - Adjust environment variables as needed.

## Running the Application

### Development Mode

To start the application in development mode, use the following command:

```bash
npm run dev
```

This command starts both the frontend and backend in development mode, allowing live reloads for changes in code.

### Build and Production

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Start the Project in Production**:
   ```bash
   npm start
   ```

## Project Structure

The `src` directory is organized as follows:

```
src
├── app                   # Next.js pages and API routes
├── backend               # Backend services, controllers, repositories
├── config                # Configurations and utilities
├── db                    # Database files (e.g., lowdb setup)
├── frontend              # Frontend modules and components
├── shared                # Shared components and utilities
├── styles                # Global styling and theme setup
└── tests                 # Testing directory with subfolders for unit, integration, and E2E tests
```

## Scripts

The `package.json` file includes various scripts to streamline the development process:

- **`npm run dev`**: Run the application in development mode.
- **`npm run build`**: Build the application for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Lint codebase with ESLint.
- **`npm run format`**: Format code using Prettier.
- **`npm run test`**: Run all tests.
- **`npm run test:unit`**: Run only unit tests.
- **`npm run test:integration`**: Run only integration tests.
- **`npm run test:e2e`**: Run only end-to-end tests.

## Testing

The `movietrack` project includes a comprehensive suite of tests covering unit, integration, and end-to-end (E2E) scenarios. Tests are organized by type within the `src/tests` folder.

For more details on the testing structure and specific instructions, please refer to the [Testing README](src/tests/README.md).

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of the changes.

## License

This project is licensed under the MIT License.

---

This `README.md` serves as an overview of the `movietrack` project, including instructions for installation, running, and testing. For more specific details about the testing setup, refer to the linked [Testing README](src/tests/README.md).
