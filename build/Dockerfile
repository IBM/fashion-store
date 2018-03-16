FROM node:carbon

ARG PORT
RUN echo ${PORT}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./src/ .

WORKDIR /usr/src/app/client

CMD ["npm", "run", "build"]

WORKDIR /usr/src/app

#EXPOSE 8080
EXPOSE ${PORT}

CMD [ "npm", "run", "server" ]
