# Person Frontend

This is the frontend for the person display system, a monorepo built on micro frontends taken from Hackney's [Single View](https://github.com/LBHackney-IT/single-view-frontend) application and ultimately from the @mtfh scope.

<hr>

## Installing dependencies:
If any command fails, try closing and reopening the terminal, then try again.

### Install Node Version Manager (nvm)
https://github.com/nvm-sh/nvm

### Install Node Version 16

`nvm install 16`

### Use Node version 16 by default:

`nvm alias default 16`

### Update npm to the latest version

`npm install -g npm`

### Install Yarn package manager globally

`npm install --global yarn`

<hr>

## Setting up
### Update your hosts file:
To allow the Google authentication to work locally, you need to alias local.hackney.gov.uk to 127.0.0.1 in your local hosts file. This allows the Google authentication token to be accepted as you're on a subdomain of hackney.gov.uk.

Open your hosts file, which on **Linux** and **macOS** can be done by running:

`sudo open /etc/hosts`

or opening the file directly with root access

On **Windows** the hosts file can be found at **c:\Windows\System32\Drivers\etc\hosts** - it must be opened as administrator

In the hosts file, add the line: 

`127.0.0.1 local.hackney.gov.uk`

<hr>

### Install Dependencies 

From the root directory in the terminal, run:

`yarn install-all`

This may take some time to run the first time.

### Add environment variables:
Copy the `apps/root/.env.sample` into an `.env` file in the same directory if you want to reconfigure the API URL

Ensure the `API_URL` is set to the url of the running [Person API](https://github.com/adamtry/assessment-person-api) (default localhost:3000)

## Running it locally

*Warning:* Realistically, this application needs at least 16GB of total RAM to run smoothly locally (uses at least 8GB), including the API. This could be reduced in future by deploying some of the microfrontends and connecting to them remotely.

Run the application with `yarn start`

This will run the "root", "header", "auth", "common", and "person" microfrontends locally.

Load `http://local.hackney.gov.uk:9000` in your browser

If nothing appears, ensure your environment variables are set up correctly.

You can change which API you're pointing to from the `.env` file in `apps/person`

## Running Jest unit tests

Run unit tests with `yarn test`


## Running Cypress tests

 -- TODO --

## Committing to GitHub
### Linting
Run the linter with `yarn lint`

## Resources

[Hackney Design System](https://design-system.hackney.gov.uk/developing/installing-from-npm/)
[Single SPA Framework](https://single-spa.js.org/docs/getting-started-overview)
