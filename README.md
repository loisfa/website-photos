# Responsive Photo Gallery

This repository is part of a multi-device project made of 2 components:
- a <strong>Responsive Photo Gallery</strong> on which the user can expore and select his favorite photos (this Github repo).
- an <strong>Augmented Reality Android app</strong> where the user can preview his favorite photo at home with real-dimension. (https://github.com/loisfa/ar-photo-visu). \
You can find more information on the [Github page of the project](https://loisfa.github.io/website-photos/).

## Pre-requisites:
Install:
- Node 14+
- NPM 7+

## Frontend (Angular)

### Run
Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `npm run build:dev` to build the project in dev mode (debugging in browser will be possible). 
Run `npm run build` to build the project in production mode (minified bundle, no debugging in browser will be possible). 
The build artifacts are stored in the `dist/` directory.

## Backend (Express.js)

### Run
Run `npm run start:dev` to start the server locally.
If deployed on heroku `npm run start` will be invoked to start the server.

## App Deployment (Heroku)
The app can be deployed as a [dyno](https://www.heroku.com/dynos) on Heroku platform.\
\
A single server is responsible for:
<ul>
<li>running the <strong>backend</strong> application server.</li>
<li>serving the <strong>frontend</strong> static bundle file and assets. Hence the frontend bundle should have been built before. This is done via `postinstall` script invoked when deployed on heroku).</li>
</ul>

