FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/package*.json ./

# install dependencies
RUN npm install
# automatic security fixes
RUN npm audit fix
# manual security fixes 

# Bundle app source
COPY ./src/ .

EXPOSE 8080

CMD [ "npm", "start" ]
