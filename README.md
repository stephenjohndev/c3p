# C3P Website

## Usage
To launch the website, visit the url:

    https://c3p.org.ph

[CNAP Core Council of the Philippines](https://c3p.org.ph)

The admin console can be accessed on the top-right section of the home page.

![Go to Admin Section](https://i.ibb.co/RHCgv74/Capture.jpg)

To set the content displayed on the slideshow, go to [Admin Dashboard](https://c3p.org.ph/admin) > [News](https://c3p.org.ph/admin/news) and toggle the 'star' on the item you want to be highlighted on the home page.

![Set item to homepage slideshow](https://i.ibb.co/nfbdRxq/Capture.jpg)

**(this guide is still a work in progress)**

# Accessing the raw database

To open and make changes on the database, login to [Firebase console](https://firebase.google.com) using your authenticated email.
![Firebase console](https://i.ibb.co/SRHSF4R/Capture.jpg)

# Hacking the source code - Setup

On your shell or terminal, clone the repository using the command: 

    git clone https://github.com/lucky8548875/c3p.git

Install the node packages thru NPM:

    npm install

Run the webapp on your local machine:

    npm run serve

To build the webapp for deployment, run the following code:

    npm run build-deploy
    
| Make sure you are logged in to the Firebase CLI and you are authorized to perform administrative updates.

## Create and Modify files

The webapp is created with **Vue.JS**, a javascript front end framework, alongside with **Vuex**, **Vue-Router** and **Vue CLI**.
You can read their documentations here:
[Vue.JS](https://vuejs.org/v2/guide/),
[Vue CLI](https://vuejs.org/v2/guide/),
[Vue Router](https://vuejs.org/v2/guide/),
[Vuex](https://vuejs.org/v2/guide/),

## File Structure

**dist/**
contains the minified web app, produced by build command, ready for production

**functions/**
contains firebase functions for server-side events

**public/**
contains the necessary root assets

**src/**
contains the actual source code

**src/assets/**
contains static assets (fonts, images, styles, scripts) to be included in the build

**components/**
contains components that build up a page

**modules/**
contains state and action modules for Vuex

**views/**
contains the actual routes (pages) to be rendered

