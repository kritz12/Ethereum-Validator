## Project Overview

This project involves creating a React application that renders a navigation header, a sidebar, and a validator tracking component. The primary objective of this app is to allow users to input an Ethereum validator ID or pubkey and retrieve the corresponding validator stats and attestations. The data is fetched using the beaconcha.in API.

## Features

- **Navigation Header:** Provides easy access to different sections of the app.
- **Sidebar:** Contains navigational links and options.
- **Validator Tracking Component:** Allows users to input a validator ID or pubkey and view detailed information and attestations for the provided index.

## API Information

The app utilizes the [beaconcha.in API](https://beaconcha.in) for fetching Ethereum validator information. The API offers high performance and is free to use with a fair use policy. It is rate limited to 10 requests per minute per IP, with all results cached for 1 minute. If higher usage is required, different pricing plans are available [here](https://beaconcha.in/pricing).

### API Documentation

- **Endpoint:** `https://beaconcha.in/api/v1`
- **Rate Limit:** 10 requests / 1 minute / IP
- **Caching:** All results are cached for 1 minute
- **Usage Plans:** Available at [beaconcha.in/pricing](https://beaconcha.in/pricing)
- **API Key:** Can be provided in the Header or as a query string parameter

## Project Structure

The project structure is as follows:
krithik-project/
├── public/
│   ├── ethereum.png
│   ├── github.jpg
│   ├── Linkedin.png
│   ├── Logo192.png
│   └── logo512.png
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js 
│   ├── Home.css
│   ├── Home.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── Navbar.css
│   ├── Navbar.js
│   ├── reportWebVitals.js
│   ├── setupTest.js
│   ├── Sidebar.css
│   ├── Sidebar.js
│   ├── TopValidators.css
│   ├── Validator.css
│   ├── Validator.js
│   ├── ValidatorDetails.js
│   ├── ValidatorDetails.css
│   ├── Welcome.css
│   └── Welcome.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## Navigate to the project directory:
cd krithik-project
## Install dependencies:
npm install
## Start the development server:
npm start
