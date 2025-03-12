# Phoenix_MDP

## Getting Started

1. **Install NodeJS**: If you don't have NodeJS, download it here and follow the instructions on the website.
2. **Check Node and npm**: Verify that Node and npm are installed.
3. **Install Yarn**: Run the command below to install Yarn globally:
    ```bash
    npm install --global yarn
    ```
4. **Verify Yarn**: Check if Yarn is installed by running:
    ```bash
    yarn --version
    ```

## Setting Up

1. **Open Terminals**: Open two terminal windows:
    - One in the `client` folder
    - One in the `api` folder
2. **Install Dependencies**: Run the following command in both terminals:
    ```bash
    yarn
    ```

## Running the Project

1. **Start the Client**: In the `client` terminal, run:
    ```bash
    yarn dev
    ```
2. **Start the API**: In the `api` terminal, run:
    ```bash
    yarn start
    ```

## Project Structure

### Backend (API Folder)

- **Index.js**: The "brain" of the backend where all connections go through.
- **Controllers**: Handles communication between the database and the client.
- **Routes**: Defines routes for different commands and protocols between the client and database.

### Frontend (Client)

- **SRC Folder**:
    - **Components**: Reusable elements that can appear on multiple pages.
    - **Pages**: Different types of pages on the website.
- **App.jsx**: Connects all pages and links together in the frontend.