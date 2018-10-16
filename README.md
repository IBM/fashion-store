# fashion-store-website

# ABOUT

This project is a fashion store that demonstrates connecting to the IBM Open Banking Platform API.  The store is built using React and Node Express server.

# Install

Run `npm install` in both the server and React client directories

server:
```
cd src
npm install
```

client:
```
cd src/client
npm install
```

# Build the React client

```
cd src/client
npm run build
```

# Register with the IBM Open Banking Platform

To obtains a clientId and clientSecret, register:
https://github.ibm.com/Banksy/banksy/wiki/Demo-System

### Update code withe clientId and Secret

Update your node server with your clientId and clientSecert

`src/server.js`

```
const clientId = '{REPLACE_ME}'
const clientSecret = '{REPLACE_ME}'
```

# TODO
1. save hostname & port as a config file to be read by app.js


# Setup
note: check the Dockerfile & modify port as needed so you don't have conflicts.  if you change it up date the app.js

also, the api-endpoint-controller component default port is 8400, if you changed it then update app.js as well.

# Build
in the /bin folder run the build.sh

# Run
There is a run.sh which will call build.sh & start the container for you.  run.sh has a few options to help you out.

You can now set the external port & point to a specific api gateway url for your own development.  You can also do nothing and let the defaults take hold.

Default port is 8080 & the configfile is http://localhost:8400/open-banking

Usage: ./run.sh -e 80 -g http://myserver:8400/open-banking

Where PAYMENTSAPI is the apicontroller.  It must be in the form of http://9.30.202.303:8400/open-banking/

Note: You don't need the / at the end anymore.

Just make sure the fashion container can reach the apicontroller container.

# Execute Manually
* go to ./src
* run 'npm start'
