let express = require( 'express' )
let request = require( 'request' )
let bodyParser = require( 'body-parser' )

const gateway_url = "https://api.us.apiconnect.ibmcloud.com/ibmopenbanking-demo/psd2-payments/open-banking/v1.1/"
//const gateway_url = "http://localhost:8400/open-banking/v1.1/"

// TODO get the merchantID from the merchant-onboarding api since it will be different per local system
const merchantId = "1234"

// TODO replace with your own client id/secret from registering your merchant with the IBM Open Banking Platform
const clientId = '{REPLACE_ME}'
const clientSecret = '{REPLACE_ME}'

let paymentInits = {}
let app = express()

// make the React client public
app.use( '/', express.static( `${__dirname}/client/build` ) )

// for parsing incoming requests
app.use( bodyParser.json() )       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( {     // to support URL-encoded bodies
    extended: true
} ) )

app.use( function ( err, req, res, next )
{
    res.end( JSON.stringify( { error: err } ) )
} )

app.get( '/gateway/open-banking/banks', function ( req, res )
{
    console.log( '>>> /gateway/open-banking/banks' )

    let apiEndpointControllerUrl = gateway_url + 'banks'

    console.log( 'calling api-endpoint-controller: ' + apiEndpointControllerUrl )

    let options = {
        url: apiEndpointControllerUrl,
        'headers': {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-IBM-Client-Id': clientId,
            'X-IBM-Client-Secret': clientSecret
        },
        agentOptions: {
            securityOptions: 'SSL_OP_NO_SSLv3'
        },
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        json: true
    }

    request( options, function ( error, response, body )
    {
        if( error )
        {
            console.error( error )
            res.status( 500 ).send( error )
        }
        else
        {
            res.json( body )
        }
    })
} )

app.post( '/gateway/open-banking/payments', function ( req, res )
{
    let url = gateway_url + 'payments'

    console.log( url )

    let amount = parseFloat(req.body.amount + '').toFixed(2) + ''  // make sure it is a string
    let currency = req.body.currency

    let xFapiFinancialId = req.headers[ 'x-fapi-financial-id' ]

    let paymentSetupRequest = {
        "Data": {
            "Initiation": {
                "EndToEndIdentification": "8125371765489664",
                "InstructedAmount": {
                    "Amount": amount,
                    "Currency": currency
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
                "AddressLine": [ "totbelsanagrusa" ],
                "StreetName": "Morning Road",
                "BuildingNumber": "62",
                "PostCode": "G3 5HY",
                "TownName": "Glasgow",
                "CountrySubDivision": [ "Scotland" ],
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
            'X-IBM-Client-Id': clientId,
            'X-IBM-Client-Secret': clientSecret,
        },
        "body": paymentSetupRequest,
        agentOptions: {
            securityOptions: 'SSL_OP_NO_SSLv3'
        },
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        json: true
    }

    request.post( options, function ( error, response, body )
    {
        if ( error )
        {
            console.log('[/gateway/open-banking/payments] ERROR: ' + error)
            res.status( 500 ).send( error )
            return
        }

        if ( response.statusCode !== 302 )
        {
            console.log('[/gateway/open-banking/payments] ERROR: wrong status code: ' + response.statusCode)
            res.sendStatus( 500 )
            return
        }

        let paymentId = response.body.Data.PaymentId

        let paymentBody = paymentSetupRequest
        paymentBody.Data.PaymentId = paymentId

        paymentInits[ paymentId ] = { xFapiFinancialId: xFapiFinancialId, body: paymentBody }

        console.log( 'body:', body ) // print the body

        let redirectUrl = response.headers.location

        console.log( '/payments response redirect_url: ' + redirectUrl )

        res.json( { paymentId, redirect_url: redirectUrl } )
    } )
} )

let port = 8080

// get the app environment from Cloud Foundry
let cfenv = require( 'cfenv' )
let appEnv = cfenv.getAppEnv()
if ( appEnv.isLocal )
{
    appEnv.url = appEnv.url.replace( appEnv.port, port )
    appEnv.port = port
}

// start server on the specified port and binding host
module.exports = app.listen( port, '0.0.0.0', function ()
{
    // print a message when the server starts listening
    console.log( 'server starting on ' + appEnv.url )
} )
