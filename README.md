# Fashion Store with IBM Open Banking Platform
Imagine you are bank which wants the agility of a digital platform but are averse to the risks of replacing the legacy systems or moving it directly to the public cloud. You seek accelerators for your digital transformations, are driven by new regulation and compliance, or are simply on the lookout of opportunities to unlock new digital channels and revenue streams. Your clients want to integrate with direct payments from banks to accommodate customer’s needs while making purchases, securely and easily. TheIBM Open Banking Platform is a software-as-a-service suite built on certain predefined 
industry standards that financial institutions can use to help accelerate their core-to-cloud journey.

In this code pattern, we will create a fashion store merchant site - Here and Now - integrated with the payments API of the Open Banking Platform, and demonstrate it through a Node.js and React.js web application.The application showcases the scenario of a customer purchasing an item on the fashion store site, and making a payment directly through their bank.It has three primary sections. One where the store catalog is on display for the customer to peruse and select items they wish to purchase. The second view is the cart where all the items that the customer has shown interest in will appear for a final review before checking out. The third is after checking out, when the customer can select their payment method and complete the purchase by going through the system flow.

This code pattern is for developers looking to start building applications with payment integration using the Open Banking Platform. When the reader has completed this code pattern, they will understand how to:
* Create an online store with a catalog of items open to purchase
* Build a Node.js web application to interact with the Payments API

# Architecture Flow
![Architecture Flow](docs/doc-images/arch-flow.png?raw=true)

1. The customer enters the shopping catalog and places items in the cart to purchase.
2. Reviews the cart and proceeds to checkout and pay.
3. A payment initiate request is sent to IOBP to start the transaction.
4. The IOBP initiates a single payment with the customer’s bank.
5. The customer enters their credentials on the bank authentication page to authorize the transaction.
6. Once successfully authenticated, the payment submission is made from the customer’s account.
7. The Bank sends the payment status back to IOBP to complete the transaction.

# Included Components
* [IBM Open Banking Platform v1.0](https://console.bluemix.net/docs/services/open-banking-platform/index.html#getting-started-with-ibm-open-banking-platform) IBM Open Banking Platform is a software suite that accelerates a bank's transformation to a platform economy

## Featured Technologies
* [Nodejs](https://www.python.org/) Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side

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
