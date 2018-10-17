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

* [IBM Open Banking Platform v1.1.0.0](https://console.bluemix.net/docs/services/open-banking-platform/index.html#getting-started-with-ibm-open-banking-platform) IBM Open Banking Platform is a software suite that accelerates a bank's transformation to a platform economy
* [API Connect](https://www.ibm.com/cloud/api-connect), a comprehensive API management solution for your entire API lifecycle from creation to management

## Featured Technologies

* [Nodejs](https://www.python.org/) Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side
* React.js
* Docker
* REST API

# Register with the IBM Open Banking Platform

To authenticate your requests you need to obtain a clientId and clientSecret. 

1. If you dont have an IBMid yet, create an IBMid, https://www.ibm.com/account/us-en/signup/register.html
Click Continue, Proceed, 
Check your email for the 7-digit security code, copy-paste, Verify
2. Create an account with an IBMid
Go to the IOBP Payments API portal https://psd2-payments-ibmopenbanking-demo.developer.us.apiconnect.ibmcloud.com/
3. Developer organization:
Username: (unique for the portal)
Captcha:
Create new account
4. Login
Enter 'Organization name: 
5. Go to API Products, IBM Open Banking Payment Initiation API (1.1.0), Subscribe to the Default Plan
6. Register a new application:
Title:
Description:
OAuth Redirect URI: http://localhost:8080
Submit
7. You now have a Client ID (Show next to the Details>Credentials>Client ID) and a Client Secret (Show Client Secret on top of the page)
8. Copy-paste you Client ID and Client Secret
9. Open a new tab and go to the IOBP Admin API portal https://iobp-administration-ibmopenbanking-demo.developer.us.apiconnect.ibmcloud.com
10. Login
Organization name: 
11. Go to API Products, IBM Open Banking Administration API (1.1.0), Subscribe to the Default Plan
12. Register a new application:
Title:
Description:
OAuth Redirect URI: http://localhost:8080
13. You now have a Client ID (Show next to the Details>Credentials>Client ID) and a Client Secret (Show Client Secret on top of the page)
14. Copy-paste you Client ID and Client Secret


### Update code withe clientId and Secret

Update your local configuration file with your Client ID and Client Secret from the Payments API.

`src/conf/local.config.json`

```
  "clientId": "REPLACE ME",
  "clientSecret": "REPLACE ME"
```

# Running the Application

## Manually deploy to local machine
1. [Setup your machine](#1-setup-your-machine)
2. [Clone the repository](#2-clone-the-repository)
3. [Run application in Docker container](#3-run-with-docker) OR [Run application with npm](#3-run-with-nodejs)

### 1. Setup your machine
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
	Go to the docker website and download the installer. After installation, run Docker.

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

By default the application runs on port 8080. (This can be changed in `src/conf/local.config.json`)

View the application by typing `http://localhost:8080` in a browser.

# License

[Apache 2.0](LICENSE)
