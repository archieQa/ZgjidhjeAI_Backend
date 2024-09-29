# The Albanian Gauth Backend

## Overview

This project is a backend authentication service built with Node.js, Express, and PostgreSQL. It supports user registration, login, password reset, and OAuth authentication with Google. The frontend is built with React and includes pages for login, registration, and password reset.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Database Schema](#database-schema)
- [License](#license)

## Features

- User Registration
- User Login
- Password Reset (Forgot Password)
- OAuth Authentication with Google
- JWT Token Generation
- PostgreSQL Database Integration

## Technologies Used

### Backend

- **Node.js**
- **Express**
- **PostgreSQL**
- **Passport.js** (for OAuth)
- **JWT** (jsonwebtoken)
- **Bcrypt** (for password hashing)
- **Nodemailer** (for sending emails)

### Frontend

- **React**
- **Axios**
- **React Router DOM**

## Project Structure

```bash
.
├── backend
│   ├── config
│   │   └── config.js               # Configuration settings (DB connection, API keys)
│   ├── models
│   │   └── userModel.js            # User schema for PostgreSQL
│   ├── routes
│   │   └── authRoutes.js           # Authentication routes (login, register, forgot password)
│   ├── services
│   │   └── emailService.js         # Service for sending password recovery emails
│   └── utils
│       ├── generateToken.js        # Utility for generating JWT tokens
│       └── oauthStrategy.js        # Setup OAuth strategies (Google, iCloud, TikTok)
│   ├── app.js                      # Main application entry point
│   ├── server.js                   # Starts the Express server
│   └── .env                        # Environment variables (DB, OAuth keys, etc.)
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ForgotPasswordForm.jsx
│   │   │   ├── ResetPasswordForm.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── HelloWorldPage.jsx   # Placeholder page after successful login/registration
│   │   ├── App.js                  # Main React component
│   │   └── index.js                # React app entry point
│   └── .env                        # Environment variables for frontend
├── .gitignore                      # Files and directories to be ignored by Git
├── README.md                       # Project documentation




## Setup and Installation

### Prerequisites

- **Node.js**
- **PostgreSQL**

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/the-albanian-gauth-backend.git
    cd the-albanian-gauth-backend/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the `backend` directory and add the following:

    ```bash
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the `frontend` directory and add the following:

    ```bash
    REACT_APP_API_URL=http://localhost:3000
    ```

4. **Start the frontend:**

    ```bash
    npm start
    ```

---



