# Fashion Store with IBM Open Banking Platform
Imagine you are bank that wants the agility of a digital platform but you are averse to the risks of replacing legacy systems or moving directly to the public cloud. You might be seeking accelerators for your digital transformations, or you may be driven by new regulation and compliance -- or perhaps you're simply on the lookout of opportunities to unlock new digital channels and revenue streams. Your clients want to integrate with direct payments from banks to accommodate customers' needs while making purchases, securely and easily. The IBM Open Banking Platform is a software-as-a-service suite built on certain predefined industry standards that financial institutions can use to help accelerate their core-to-cloud journey.

In this code pattern, we will show you how to create a fashion store merchant site -- Here and Now -- that's integrated with the payments API of the IBM Open Banking Platform, and we'll demonstrate it through a Node.js and React.js web application. The application showcases the scenario of a customer purchasing an item on the fashion store site and making a payment directly through their bank. It has three primary sections:

1. The store catalog is on display for the customer to peruse and select items they wish to purchase.
1. The cart where all the items that the customer has shown interest in appears for a final review before checking out.
1. After checking out, the customer can select the payment method and complete the purchase by going through the system flow.

This code pattern is for developers who are looking to start building applications with payment integration using the Open Banking Platform. When you have completed this code pattern, you will understand how to:

* Create an online store with a catalog of items open to purchase.
* Build a Node.js web application to interact with the payments API.

# Architecture Flow
![Architecture Flow](docs/doc-images/arch-flow.png?raw=true)

1. Customer enters the shopping catalog and places items in the cart to purchase.
1. Customer reviews the cart and proceeds to checkout and pay.
1. A payment initiate request is sent to the IBM Open Banking Platform to start the transaction.
1. The IBM Open Banking Platform initiates a single payment with the customer's bank.
1. Customer enters their credentials on the bank authentication page to authorize the transaction.
1. Once successfully authenticated, the payment submission is made from the customer's account.

# Included Components
* [IBM Open Banking Platform v1.0](https://console.bluemix.net/docs/services/open-banking-platform/index.html#getting-started-with-ibm-open-banking-platform) IBM Open Banking Platform is a software suite that accelerates a bank's transformation to a platform economy

## Featured Technologies
* [Nodejs](https://www.python.org/) Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side

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

Update your node server with your clientId and clientSecret

`src/server.js`

```
const clientId = '{REPLACE_ME}'
const clientSecret = '{REPLACE_ME}'
```

# Running the Application
## Manually deploy to local machine
1. [Setup your machine](#1-setup-your-machine)
2. [Clone the repository](#2-clone-the-repository)
3. [Run application in Docker container](#3-run-application-in-docker-container)

### 1. Setup your machine
- [Docker](https://www.docker.com/)
	Go to the docker website and download the installer. After installation, run Docker.

### 2. Clone the repository

```
git clone https://github.ibm.com/Banksy/fashion-store.git
```

### 3. Run application in Docker container

```
bash docker-run.sh
```
By default the application runs on port 8080. (This can be changed in `src/conf/local.config.json`)

View the application by typing `http://localhost:8080` in a browser.

# License
[Apache 2.0](LICENSE)
