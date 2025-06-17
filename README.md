# Project: Sports Buddy

[cite_start]Sports Buddy is the world's largest sports matching site, with millions of pairings. [cite_start]This application helps users find partners for their favorite sports by allowing them to post and browse sports activities happening near their location.

## Problem Statement

The core problem is to connect individuals who want to play sports but lack a partner or a group. [cite_start]This app provides a platform to form genuine, meaningful interactions outside of one's immediate social circle.

## Technologies Used

* [cite_start]**Frontend**: HTML, CSS, JavaScript 
* [cite_start]**Backend & Database**: Firebase (Firestore and Firebase Authentication) 
* [cite_start]**Domain**: Sports 

## Project Difficulty Level

* [cite_start]Medium 

## [cite_start]Features / System Modules 

### User Module
* User Registration and Login.
* Add a sports event with details like name, location, and time.
* View all added events.
* Update or Delete their own sports events.

### Admin Module
* Admin Login.
* Add/Update sports categories.
* Add/Update cities and areas.
* Delete any user's sports event.

## [cite_start]Project Workflow and Execution 

### 1. Setup
* Clone the repository from GitHub.
* Create a project in the Firebase Console.
* Create a Web App within your Firebase project and copy the `firebaseConfig` object.
* Paste the `firebaseConfig` object into `js/firebase-config.js`.
* Enable **Firestore Database** and **Email/Password Authentication** in the Firebase Console.

### 2. Running the Application
* Open the `index.html` file in your web browser. You can do this by simply double-clicking the file or using a live server extension in your code editor.
* **Register** a new account.
* **Login** with your credentials. You will be redirected to `dashboard.html`.
* On the dashboard, you can **add** new sports events and **delete** them.

## Code Standards & Design

* [cite_start]**Modular**: The code is split into modules (auth, dashboard, config) for better maintainability.
* [cite_start]**Portable**: The application is web-based and works on any modern browser, ensuring it works the same in every environment.
* **Logging**: Every major user action (login, register, add/delete event) is logged to the browser console for debugging purposes.