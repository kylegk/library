# Angular-Nest.js Library Manager

This project contains a small application with limited functionality for managing a collection of books.

It provides a simple CRUD API created with Nest.js, and an Angular frontend allowing users to add, edit, and retrieve books.

The basic structure of this application originates from Brian Stanley's [Angular-NestJS Starter Template](https://github.com/bstanley78/angular-nestjs-starter).

## Project Structure

The project is structured into two main directories:

- `app`: Contains the Nest.js backend application
- `ui`: Contains the Angular frontend for the application

For more information about each of these applications, please see their associated README files

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Building and Running the Applications

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/bstanley78/angular-nestjs-starter.git
   cd angular-nestjs-starter
   ```

2. Install dependencies:

   ```bash
   cd app && yarn install
   cd ui && yarn install
   ```

3. Build and start the applications using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Access the applications:
   - Frontend: Open http://localhost:4200 in your web browser.
   - Backend: Send requests to http://localhost:3000.

### Database

A MongoDB instance is included in the `docker-compose.yml` file, and the Nest.js application is configured to interact with MongoDB using Mongoose. The connection URL is configured in the `docker-compose.yml` file.
