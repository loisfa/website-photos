# Reactive Photo Gallery Webapp

## Context
This web application works hand-in-hand with an android Augmented Reality app which you can find here: https://github.com/loisfa/ar-photo-visu. \
\
Here is the business use case:\
<strong>1 - [desktop or mobile] on the webapp frontend,</strong> the user explores the photo gallery and 'likes' photos in the gallery.\
<strong>2 - [desktop or mobile] on the webapp frontend,</strong> the user generates a unique Code to 'save' the liked photos. These photos are saved on the webapp backend and attached to the unique Code.\
<strong>3 - \[mobile\] on the webappfrontend,</strong> the user downloads the Android APK, installs the app it on his device then starts it.\
<strong>4 - [mobile] on the Android app,</strong> the user types the unique Code generated at step 2. All the 'liked' photos are then downloaded and the user can see them in his environment thanks to Augmented Reality.

## Pre-requisites:
Install:
- Node 14+
- NPM 7+

## Frontend (Angular)

### Run
Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `npm run build:dev` to build the project in dev mode (debugging will be allowed in browser). 
Run `npm run build` to build the project in production mode (minified bundle). 
The build artifacts will be stored in the `dist/` directory.

## Backend (Express.js)

### Run
Run `npm run start:dev` to start the server locally.
If deployed on heroku `npm run start` will be invoked to start the server.

## Deployment (Heroku)
The app is deployed as a single/simple app (see Heroku dynos).\
The Node server is responsible for running the backend server and serving the frontend static bundle.\
Note: the frontend bundle should have been built before. This is done via `postinstall` script invoked when deployed on heroku)