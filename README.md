Here's the updated `README.md` with the Vercel deployment URL added at the very top for easy access:

---

# MovieTrack Project

[**Live Application on Vercel**](https://movie-track-seven.vercel.app/)

The `movietrack` project is a movie management application designed to handle movie data through a combination of frontend and backend services. This project utilizes a modular structure, organized to separate frontend, backend, and shared components, ensuring clear responsibility areas.

## Project Overview

The `movietrack` project includes the following components:
- **Frontend**: React-based UI using Next.js for server-side rendering, Styled Components for styling, and Jest for testing.
- **Backend**: API endpoints using Next.js API routes with a structured service and repository layer for movie data.
- **Shared Components**: Reusable UI elements and utilities shared across the application.

![Swagger Preview](https://i.postimg.cc/BbB12390/i-Screen-Shoter-Google-Chrome-241028015617.jpg)

![Site Preview](https://i.postimg.cc/pVfjwf96/i-Screen-Shoter-Google-Chrome-241028015638.jpg)

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Using Docker](#using-docker)
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

   - Create environment files as needed for different environments:
      - `.env.development` for development.
      - `.env.production` for production.
      - `.env.local` for machine-specific overrides (not committed to version control).

   - **Example of `.env.development`**:
     ```plaintext
     # Server Configuration
     API_PORT=3000
     BASE_URL=http://localhost:3000
     NEXT_PUBLIC_API_URL=http://localhost:3000
     VERCEL_URL=

     # Database Configuration
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=dev_db_user
     DB_PASSWORD=dev_db_password
     DB_NAME=dev_db_name

     # Logging and Environment
     LOG_LEVEL=debug
     NODE_ENV=development

     # Application Settings
     GENERATE_INITIAL_DATA=true
     ```

   - **Example of `.env.production`**:
     ```plaintext
     # Server Configuration
     API_PORT=80
     BASE_URL=https://movie-track-seven.vercel.app
     NEXT_PUBLIC_API_URL=https://movie-track-seven.vercel.app
     VERCEL_URL=movie-track-seven.vercel.app

     # Database Configuration
     DB_HOST=prod-db-hostname
     DB_PORT=5432
     DB_USER=prod_db_user
     DB_PASSWORD=prod_db_password
     DB_NAME=prod_db_name

     # Logging and Environment
     LOG_LEVEL=error
     NODE_ENV=production

     # Application Settings
     GENERATE_INITIAL_DATA=false
     ```

   - **Example of `.env.local`** (for local machine-specific overrides):
     ```plaintext
     # Server Configuration
     API_PORT=3000
     BASE_URL=http://localhost:3000
     NEXT_PUBLIC_API_URL=http://localhost:3000

     # Database Configuration (local credentials)
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=local_db_user
     DB_PASSWORD=local_db_password
     DB_NAME=local_db_name

     # Logging and Environment
     LOG_LEVEL=debug
     NODE_ENV=development

     # Application Settings
     GENERATE_INITIAL_DATA=true
     ```

   - Environment Variable Notes:
      - **`NEXT_PUBLIC_API_URL`**: Exposed to the client-side, accessible within frontend code.
      - **Sensitive Variables**: Keep variables like `DB_PASSWORD` server-only (i.e., without the `NEXT_PUBLIC_` prefix) to avoid exposing them on the client side.
      - **Vercel Deployment**: When deploying to Vercel, configure production variables through the Vercel dashboard to avoid committing sensitive information.

---

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

## Using Docker

You can also use Docker to containerize and run the `movietrack` project. Below are the steps for building and running the Docker container:

### Step 1: Build the Docker Image

Run the following command to build the Docker image for the `movietrack` application:

```bash
docker build -t movietrack-app .
```

This command reads the instructions in the `Dockerfile`, installs dependencies, and builds the project, creating a Docker image named `movietrack-app`.

### Step 2: Run the Docker Container

After building the Docker image, start a container from this image using:

```bash
docker run -p 3000:3000 movietrack-app
```

- **Explanation**: The `-p 3000:3000` flag maps port 3000 on your local machine to port 3000 in the container, making the application accessible at `http://localhost:3000`.

### Step 3: Verify the Application

Open your browser and go to:

- **Local Development**: `http://localhost:3000`
- **Production (Vercel)**: [https://movie-track-seven.vercel.app/](https://movie-track-seven.vercel.app/)

You should see the application running. If not, check the Docker container logs to troubleshoot.

### Step 4: Stop and Remove the Container (Optional)

When you’re done testing locally, stop and remove the Docker container with the following commands:

1. List the running containers and find the container ID:

   ```bash
   docker ps
   ```

2. Stop and remove the container:

   ```bash
   docker stop [container_id]
   docker rm [container_id]
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

---

With the Vercel link at the top, it’s now easily accessible for anyone reading the README. Let me know if there’s anything else to modify!
