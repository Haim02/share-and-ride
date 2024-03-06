# MERN Bicycle and Scooter Rental Platform with Email Sending and External APIs (Google Maps) - Dockerized and Deployed on AWS

Welcome to the GitHub repository for our MERN-based Bicycle and Scooter Rental Platform project. This project aims to provide users with a platform to rent bicycles and scooters, integrated with Google Maps for location services, and the ability to send emails for notifications. The entire application is containerized using Docker and deployed on AWS cloud services.
https://www.shareandride.site/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Bicycle and Scooter Rental Platform is built using the MERN stack, comprising MongoDB, Express.js, React, and Node.js. It enables users to view available bicycles and scooters on a map, rent them, and receive notifications through emails. The integration with Google Maps enhances the user experience by providing location-based services.

## Features

- User authentication and registration.
- Browse available bicycles and scooters on an interactive map powered by Google Maps.
- Rent bicycles/scooters by selecting a location on the map.
- Email notifications for successful rentals, returns, and other important updates.
- Admin panel to manage vehicle availability, users, and rentals.
- Docker containerization for easy deployment.
- Integration with Google Maps API for location services.

## Technologies Used

- MongoDB: Database for storing user information, vehicle data, and rental records.
- Express.js: Backend framework for handling API requests and business logic.
- React: Frontend library for building the user interface.
- Node.js: Server-side environment for running JavaScript code.
- Docker: Containerization technology for packaging the application and its dependencies.
- AWS EC2: Cloud compute service for hosting the Dockerized application.
- Google Maps API: Integration for displaying maps and location-related services.
- Google OAuth 2.0: For login.
- Firebase: for images storage.
- SendGrid Email Service: Used for sending rental notifications and updates.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.
- Google Maps API key.
- Email service credentials.

### Installation

1. Clone this repository to your local machine.
   ```bash
   git clone [https://github.com/your-username/bicycle-scooter-rental.git](https://github.com/Haim02/share-and-ride.git)
   
2. Navigate to the project directory.
   ```bash
   cd ShareAndRide
   
3. Install backend dependencies.
   ```bash
   cd backend
   npm install
   
4. Install frontend dependencies.
   ```bash
   cd ../client
   npm install
   
4. Install admin dependencies.
   ```bash
   cd ../admin
   npm install

## Configuration
Create a .env file in the backend directory for your environment variables. Configure the following:
 ```makefile
    DATABASE_URI=your_mongodb_connection_string
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    EMAIL_SERVICE_API_KEY=your_email_service_api_key
```

## Configuration
 Start the backend server:
 ```bash
  cd backend
  npm start
```

Start the frontend development server:
  ```bash
  cd client
  npm start
  ```
Access the application in your browser at http://localhost:3000.

## Deployment
The project is containerized using Docker for easy deployment. To deploy on AWS EC2, follow the relevant documentation for deploying Docker containers to an EC2 instance.




