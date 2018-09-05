FROM node:carbon

# ARG INTERNALPORT
# RUN echo ${INTERNALPORT}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production
#npm WARN notice [SECURITY] https-proxy-agent has the following vulnerability: 1 high. Go here for more details: https://nodesecurity.io/advisories?search=https-proxy-agent&version=1.0.0 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
#npm WARN notice [SECURITY] moment has the following vulnerability: 1 low. Go here for more details: https://nodesecurity.io/advisories?search=moment&version=2.18.1 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
#npm WARN notice [SECURITY] hoek has the following vulnerability: 1 moderate. Go here for more details: https://nodesecurity.io/advisories?search=hoek&version=2.16.3 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
#npm WARN notice [SECURITY] deep-extend has the following vulnerability: 1 low. Go here for more details: https://nodesecurity.io/advisories?search=deep-extend&version=0.4.2 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
#npm WARN notice [SECURITY] lodash has the following vulnerability: 1 low. Go here for more details: https://nodesecurity.io/advisories?search=lodash&version=2.4.2 - Run `npm i npm@latest -g` to upgrade your npm version, and then `npm audit` to get more info.
RUN npm install npm@latest -g
#RUN npm audit

# Bundle app source
COPY ./src/ .

EXPOSE 8080
#EXPOSE ${PORT}

#EXPOSE ${INTERNALPORT}
EXPOSE 8080

CMD [ "npm", "start" ]
