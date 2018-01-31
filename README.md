# shoe-store-website

# TODO
1. save hostname & port as a config file to be read by app.js

# Setup
note: check the Dockerfile & modify port as needed so you don't have conflicts.  if you change it up date the app.js

also, the api-endpoint-controller component default port is 8400, if you changed it then update app.js as well.

# Build
in the /bin folder run the build.sh

# Run
To run you can simply use the ./run.sh GATEWAYURL

Where GATEWAYURL is the apicontroller.  It must be in the form of http://9.30.202.303:8400/open-banking/

Just make sure the shoe container can reach the apicontroller container.

# Execute Manually
* go to ./src
* run 'npm start'
