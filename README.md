# Fashion Store with IBM Open Banking Platform

Imagine you are a merchant with an online store and your customers want to integrate with direct payments from banks to accommodate making purchases, securely and easily. 

Or imagine you are a bank and want to offer an easy way for merchants to integrate digital direct payments into your legacy bank systems in order to unlock new digital channels and revenue streams and compete against the many online payment services, but you are averse to the risks of replacing legacy systems or moving directly to the public cloud. But you also need to comply to new regulation and compliance. 

The IBM Open Banking Platform (IOBP) is a banking-as-a-service suite built on certain predefined industry standards that financial institutions can use to help accelerate their core-to-cloud journey.

In this code pattern, we will show you how to create a fashion store merchant site -- Here and Now -- that integrates with the IOBP Payments API of the IBM Open Banking Platform (IOBP). We will demonstrate a Node.js and React.js web application using REST API. The application showcases the scenario of a customer purchasing an item on the fashion store site and making a payment directly through their bank via the IBM Open Banking Platform (IOBP). 

It has three primary sections:

1. The store catalog is on display for the customer to peruse and select items they wish to purchase.
1. The shopping cart where all the items that the customer has shown interest in appears for a final review before checking out.
1. After checking out, the customer can select the payment method and complete the purchase by going through the payment flow.

This code pattern is for developers who are looking to start building applications with payment integration using the IBM Open Banking Platform (IOBP). When you have completed this code pattern, you will understand how to:

* Create an online store with a catalog of items open to purchase.
* Build a Node.js/React.js web application to interact with the IOBP Payments API.

# Architecture Flow

![Architecture Flow](docs/doc-images/arch-flow.png?raw=true)

1. Customer enters the shopping catalog and places items in the cart to purchase.
1. Customer reviews the cart and proceeds to checkout and pay.
1. A payment initiate request is sent to the IBM Open Banking Platform to start the transaction.
1. The IBM Open Banking Platform initiates a single payment with the customer's bank.
1. Customer enters their credentials on the bank authentication page to authorize the transaction.
1. Once successfully authenticated, the payment submission is made from the customer's account.

# Included Components

* [IBM Open Banking Platform v1.1.0](https://console.bluemix.net/docs/services/open-banking-platform/index.html#getting-started-with-ibm-open-banking-platform), IBM Open Banking Platform is a software suite that accelerates a bank's transformation to a platform economy
* [API Connect](https://www.ibm.com/cloud/api-connect), a comprehensive API management solution for your entire API lifecycle from creation to management
* [IBM Cloud Private](https://www.ibm.com/cloud/private), Open Kubernetes-based container platform with Cloud Foundry for application development and deployment, along with DevOps toolchain integration

## Featured Technologies

* [Nodejs](https://www.nodejs.org/) Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side
* [Reactjs](https://reactjs.org/) React.js is a JavaScript library for building user interfaces
* [Docker](https://www.docker.com/) Docker is a computer program that performs operating-system-level virtualization, also known as Containerization
* [Curl](https://curl.haxx.se/) Curl is a command line tool and library for transferring data with URLs
* [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) Representational State Transfer (REST) is an architectural style that defines a set of constraints to be used for creating web services

# Register with the IBM Open Banking Platform

To authenticate your requests you need to obtain a clientId and clientSecret. 

1. If you dont have an IBMid yet, create an IBMid, https://www.ibm.com/account/us-en/signup/register.html. Click Continue, Proceed, Check your email for the 7-digit security code, copy-paste, Verify.

![Screenshot](docs/doc-images/1.png?raw=true)

2. Create an account with an IBMid. Go to the IOBP Payments API portal https://psd2-payments-ibmopenbanking-demo.developer.us.apiconnect.ibmcloud.com/

![Screenshot](docs/doc-images/2.png?raw=true)

3. Fill the form by entering 'Developer organization', 'Username' (unique for the portal) and 'Captcha'. Create new account.

![Screenshot](docs/doc-images/3a.png?raw=true)

![Screenshot](docs/doc-images/3b.png?raw=true)

4. Login. Enter 'Organization name'

![Screenshot](docs/doc-images/4.png?raw=true)

5. Go to API Products, IBM Open Banking Payment Initiation API (1.1.0), Subscribe to the Default Plan

![Screenshot](docs/doc-images/5a.png?raw=true)

![Screenshot](docs/doc-images/5b.png?raw=true)

![Screenshot](docs/doc-images/5c.png?raw=true)

6. Register a new application by filling the 'Title', 'Description'. Set `'OAuth Redirect URI': http://localhost:8080`. Submit

![Screenshot](docs/doc-images/6.png?raw=true)

7. You now have a Client ID (Show next to the Details>Credentials>Client ID) and a Client Secret (Show Client Secret on top of the page)

![Screenshot](docs/doc-images/7.png?raw=true)

8. Copy-paste you Client ID and Client Secret, you need this later

9. Go to API Products, IBM Open Banking Payment Initiation API (1.1.0), click Subscribe. Select your new application to subscribe and click Subscribe. You should see a notification 'Successfully subscribed to this plan'.

![Screenshot](docs/doc-images/9a.png?raw=true)

![Screenshot](docs/doc-images/9b.png?raw=true)

### Update the code with clientId and Secret

Update your local configuration file with your Client ID and Client Secret from the Payments API. The merchantId should be set in the next step, after registering your merchant.

In the 'src/server.js' file, change the IOBP Payments API Client ID and Client Secret, and the merchantId from IOBP Admin API.

```
// TODO change with the client id and client secret from the IOBP Payments API
const clientId = 'REPLACE_ME'
const clientSecret = 'REPLACE_ME'
// TODO change with merchantId from the IOBP Admin API 
const merchantId = 'REPLACE_ME'
```

The `merchantId` will be generated after the next step.

### Register your Merchant

You need to register your merchant with the IBM Open Banking Platform (IOBP) because IOBP redirects the final result of the payment back to the merchant application. Use the Client ID and Client Secret of the IBM Open Banking Administration API (1.1.0) to set respectively the headers x-ibm-client-id and x-ibm-client-secret.

Request
```
curl --request POST \
  --url https://api.us.apiconnect.ibmcloud.com/ibmopenbanking-demo/iobp-administration/v1.1/merchants \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --header 'x-ibm-client-id: REPLACE_ME' \
  --header 'x-ibm-client-secret: REPLACE_ME' \
  --data '{"end_date":"2019-06-15","country":"United States","redirect_uri":"http://localhost:8080","countrySubDivision":"New York","taxId":"be2e44b06b34","name":"Remko Homestore","streetAddress1":"678 Lafayette Ave","effective_date":"2018-06-15","streetAddress2":"Suite 2B","postCode":"10003","cityOrTown":"New York"}'
```

You need the merchantId that is generated for you, to configure your merchantId variable in 'src/server.js'.

Response
```
...
"merchantId":"214b72a0-d241-11e8-a47f-eb7905db5dda"}
```

# Running the Application

## Manually deploy to local machine
1. [Setup your machine](#1-setup-your-machine)
2. [Clone the repository](#2-clone-the-repository)
3. [Run application in Docker container](#3-run-with-docker) OR [Run application with npm](#3-run-with-nodejs)

### 1. Setup your machine
- [npm](https://www.npmjs.com/)  (v5.x)
- [Node](https://nodejs.org/en/) (version 8.9 or higher - note version 9 is not supported)
* to install specific Node version you can use [nvm](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html)

  Example:
  + 1. `nvm install --lts`
  + 2. `nvm use --lts`
  + 3. Output `Now using node v8.11.3 (npm v5.6.0)`
- [Docker](https://www.docker.com/), Go to the docker website and download the installer. After installation, run Docker.

### 2. Clone the repository

```
git clone https://github.ibm.com/Banksy/fashion-store.git
```

### 3. Run with Nodejs

```
$ npm install --save
$ npm start
```

### 3. Run with Docker

```
$ bash docker-run.sh
```

You can view the docker logs of your store,
```
$ docker logs fashion-store
```

### Make a purchase
By default the application runs on port 8080. (This can be changed in `src/conf/local.config.json`)

1. Open the `Here & Now` store at [http://localhost:8080](http://localhost:8080)
1. Click Shop to shop
1. Add an item to the cart
1. In the top right, click `Cart(1)`
1. Review your shopping cart, click `CHECKOUT`
1. Select the Bank icon on the left, this should load the avaible banks
1. Select the Forgerock bank
1. Click the `Pay Now` button
1. The Payment Setup response will redirect you to the bank login page
1. Login with `username/password` (REPLACE_ME)
1. Select the 'Pay from' account and click the 'Allow' button
1. This will then result in running the Payment Submission
1. After a successful payment submission, the Payment Submission response will redirect to the redirect_uri of the merchant, which we defined as http://localhost:8080
1. Your merchant will load with a Successful Payment notification

# License

[Apache 2.0](LICENSE)
