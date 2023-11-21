# Person Frontend

This is the frontend for the person display system, a monorepo comprising micro
frontends taken from Single View and ultimately the @mtfh scope and repurposed for this application.

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

On **Windows** the hosts file can be found at **c:\Windows\System32\Drivers\etc\hosts**

In the hosts file, add the line: 

`127.0.0.1 local.hackney.gov.uk`

<hr>

### Install Dependencies 

From the root directory in the terminal, run:

`yarn install-all`

This may take some time to run the first time.

### Add environment variables:
Copy the `apps/root/.env.sample` into an `.env` file in the same directory
The app URLs are already set up for you, and are not considered secrets. See the [MTFH Root Microfrontend](https://github.com/LBHackney-IT/mtfh-frontend-root/blob/main/.env.sample)

### Allow CORS to connect to the remote microfrontends from the domains in .env
The "authentication" and "common" microfrontends should be connected to from the Hackney CDN, which is not configured to allow CORS requests from local.hackney.gov.uk. To get around this, you can use a browser extension to allow CORS requests from local.hackney.gov.uk.

Recommended extension is Cross Domain - CORS

[Chrome Link](https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai)

[Firefox Link](https://addons.mozilla.org/en-GB/firefox/addon/cross-domain-cors)

To set this extension up, open the extension settings and add the following regex under the Apply Urls:

`.*cloudfront.*`

This matches all of the microfrontends being served from cloudfront.

Ensure the extension is enabled and click "Save"

## Running it locally

Run the application with `yarn start`

This will run the "root", "header", and "person" microfrontends locally, and connect to the "authentication" and "common" microfrontends on the Hackney CDN.

Load `http://local.hackney.gov.uk:9000` in your browser

If nothing appears, ensure your environment variables are set up correctly, and that you have CORS enabled for `.*cloudfront.*` in your browser extension.

You can change which API you're pointing to from the `.env` file in `apps/single-view`

## Running Cypress tests

 -- TODO --

## Committing to GitHub
### Linting
By default, Husky will run a lint check before each commit and prevent the commit if this fails.

These failures can often be resolved automatically by opening a terminal, `cd`-ing into the /app/single-view directory, then running `yarn lint:fix`


## Resources

[Hackney Design System](https://design-system.hackney.gov.uk/developing/installing-from-npm/)
[Single SPA Framework](https://single-spa.js.org/docs/getting-started-overview)
