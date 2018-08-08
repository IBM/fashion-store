// This application uses express as its web server
// for more info, see: http://expressjs.com

let config = require( './conf/' + process.env.NODE_ENV + '.config.json' )

let express = require( 'express' )
let path = require( 'path' )
let request = require( 'request' )
let bodyParser = require( 'body-parser' )
const url = require( 'url' )
let session = require( 'express-session' )
let fetch = require( 'node-fetch' )
const URLSearchParams = require( 'url-search-params' )
var jwtDecode = require('jwt-decode')

let data = new URLSearchParams()

let port = config.PORT
//let gateway_url = 'http://localhost:8400/open-banking/' //'https://citigatewaynode-determined-coelom.eu-gb.mybluemix.net/open-banking/'
//let gateway_url = 'http://apollo11.fyre.ibm.com:8400/open-banking/'
let gateway_url = config.GATEWAYURL || 'http://localhost:8400/open-banking/v1.1/'

console.log( ' gateway: %s', gateway_url )

let paymentInits = {}

// TODO get the merchantID from the merchant-onboarding api since it will be different per local system
//const xFapiFinancialId = config.xFapiFinancialId
const merchantId = config.merchantId

let code = null

let cfenv = require( 'cfenv' )
let app = express()

app.use( '/', express.static( `${__dirname}/client/build` ) )

// serve the files out of ./public as our main files
app.use( express.static( path.join( __dirname, '/public' ) ) )

//app.use( '/callback', express.static( path.join( __dirname, '/public/tmp' ) ) )
// session tokens
app.use( session( {
    secret: 'sdfrsedterdsafaasdf',
    resave: true,
    saveUninitialized: true
} ) )

let ssn

// for parsing incoming requests
app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( {     // to support URL-encoded bodies
    extended: true
} ) )

// get the app environment from Cloud Foundry
let appEnv = cfenv.getAppEnv()

app.get( '/gateway/open-banking/banks', function ( req, res )
{
    let url = gateway_url + 'banks'

    let options = {
        'headers': {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    }

    fetch( url, options )
        .then( response =>
        {

            if ( response.status !== 200 )
            {
                res.status( response.status ).send()
                throw('unexpected status: ' + response.status)
            }

            return response.json()
        } )
        .then( json =>
        {
            console.log( json )
            res.json( json )
        } )
} )

let oauthcomplete = false

app.post( '/gateway/open-banking/payments', function ( req, res )
{
    oauthcomplete = false

    ssn = req.session

    let url = gateway_url + 'payments'

    console.log( url )

    let amount = req.body.amount + ''   // make sure it is a string
    let currency = req.body.currency

    let xFapiFinancialId = req.headers['x-fapi-financial-id']

    let paymentSetupRequest = {
        "Data": {
            "Initiation": {
                "InstructionIdentification": "5791997839278080",
                "EndToEndIdentification": "8125371765489664",
                "InstructedAmount": {
                    "Amount": "700.00",
                    "Currency": "EUR"
                },
                "DebtorAgent": {
                    "SchemeName": "BICFI",
                    "Identification": "AAAAGB2L"
                },
                "DebtorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "IE29AIBK93115212345678",
                    "Name": "Gary Kean",
                    "SecondaryIdentification": "6686302651023360"
                },
                "CreditorAgent": {
                    "SchemeName": "BICFI",
                    "Identification": "AAAAGB2K"
                },
                "CreditorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "IE29AIBK93115212345676",
                    "Name": "TESTING",
                    "SecondaryIdentification": "8380390651723776"
                },
                "RemittanceInformation": {
                    "Unstructured": "emeherpakkaodafeofiu",
                    "Reference": "ehoorepre"
                }
            }
        },
        "Risk": {
            "PaymentContextCode": "PersonToPerson",
            "MerchantCategoryCode": "nis",
            "MerchantCustomerIdentification": "1130294929260544",
            "DeliveryAddress": {
                "AddressLine": ["totbelsanagrusa"],
                "StreetName": "Morning Road",
                "BuildingNumber": "62",
                "PostCode": "G3 5HY",
                "TownName": "Glasgow",
                "CountrySubDivision": ["Scotland"],
                "Country": "GB"
            }
        }
    }

    let options = {
        "url": url,
        "headers": {
            "authorization": "Bearer",
            "accept": "application/json",
            "content-type": "application/json",
            "x-fapi-customer-ip-address": 1,
            "x-fapi-financial-id": xFapiFinancialId,
            "x-fapi-interaction-id": 1,
            "x-idempotency-key": 1,
            "x-jws-signature": 1,
            "merchantId": merchantId,
        },
        "body": paymentSetupRequest,
        json: true
    }

    request.post( options, function ( error, response, body )
    {
        if ( error )
        {
            res.status( 500 ).send( error )
            return
        }

        if ( response.statusCode !== 302 )
        {
            res.sendStatus( 500 )
            return
        }

        let paymentId = response.body.Data.PaymentId

        let paymentBody = paymentSetupRequest
        paymentBody.Data.PaymentId = paymentId

        paymentInits[paymentId] = { xFapiFinancialId: xFapiFinancialId, body: paymentBody }

        console.log( 'error:', error ) // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ) // Print the response status code if a response was received
        console.log( 'body:', body ) // print the body

        let redirectUrl = response.headers.location

        console.log( '/payments response redirect_url: ' + redirectUrl )

        // TODO might need to save the paymentId.... how will I know what payment data the code belongs to?
        res.json( { paymentId, redirect_url: redirectUrl } )
    } )
} )

app.post( '/gateway/open-banking/payment-submissions', function ( req, res )
{
    let url = gateway_url + 'payments-submissions'
    let xFapiFinancialId = req.headers[ 'x-fapi-financial-id' ]
    let code = req.headers.code

    let paymentRequest = req.body

    let options = {
        "url": url,
        "headers": {
            "authorization": "Bearer",
            "accept": "application/json",
            "content-type": "application/json",
            "x-fapi-customer-ip-address": 1,
            "x-fapi-financial-id": xFapiFinancialId,
            "x-fapi-interaction-id": 1,
            "x-idempotency-key": 1,
            "x-jws-signature": 1,
            "merchantId": 'xxxx-10',
            "code": code
        },
        "body": paymentRequest,
        json: true
    }

    request.post( options, function ( error, response, body )
    {
        if ( error )
        {
            res.status( 500 ).send( error )
            return
        }

        if ( response.statusCode !== 302 )
        {
            res.sendStatus( 500 )
            return
        }

        console.log( 'error:', error ) // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ) // Print the response status code if a response was received
        console.log( 'body:', body ) // print the body

        res.json( response.body )
    } )
} )

app.get( '/oauth/callback', function ( req, res )
{
    let url = gateway_url + 'payment-submissions'
    let code = req.query.code

    var decoded = jwtDecode(req.query.id_token)

    let paymentId = decoded.openbanking_intent_id

    let paymentRequest = paymentInits[paymentId]

    let body = paymentRequest.body

    let options = {
        url: url,
        headers: {
            "authorization": "Bearer",
            "accept": "application/json",
            "content-type": "application/json",
            "x-fapi-financial-id": paymentRequest.xFapiFinancialId,
            "x-fapi-interaction-id": 1,
            "x-idempotency-key": 1,
            "merchantId": merchantId,
            "code": code
        },
        body: body,
        json: true
    }

    request.post( options, function ( error, response, body )
    {
        if ( error )
        {
            console.log( 'error:', error )
            res.status( 500 ).send( error )
            return
        }

         // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ) // Print the response status code if a response was received
        console.log( 'body:', body ) // print the body

        res.json( response.body )
    } )
} )

// the cfenv library will not reflect a change to the port in it's url
// so hack in the correct values - ok while it works...
if ( appEnv.isLocal )
{
    appEnv.url = appEnv.url.replace( appEnv.port, port )
    appEnv.port = port
}

console.log( appEnv.port )
// start server on the specified port and binding host
module.exports = app.listen( port, '0.0.0.0', function ()
{
    // print a message when the server starts listening
    console.log( 'server starting on ' + appEnv.url )
} )
