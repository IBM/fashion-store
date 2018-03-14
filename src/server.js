// This application uses express as its web server
// for more info, see: http://expressjs.com


let express = require( 'express' );
let path = require( 'path' );
let request = require( 'request' );
let bodyParser = require( 'body-parser' );
const url = require( "url" );
let session = require( 'express-session' );
let fetch = require( 'node-fetch' );
const { URLSearchParams } = require( 'url' );

let port = "8080";
//let gateway_url = 'http://localhost:8400/open-banking/'; //'https://citigatewaynode-determined-coelom.eu-gb.mybluemix.net/open-banking/';
let gateway_url = "http://apollo11.fyre.ibm.com:8400/open-banking/"

// TODO crap global to hold the paymentId
let paymentId = null

let external_url = 'http://shoe-store-svc:8080/';

if ( process.env.GATEWAYURL )
{
    gateway_url = process.env.GATEWAYURL + '/';
    console.log( " gateway: %s", gateway_url );
}

if ( process.env.EXTERNALURL )
{
    external_url = process.env.EXTERNALURL + '/';
    console.log( "external url: %s", external_url );
}

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
let cfenv = require( 'cfenv' );

// create a new express server
let app = express();

app.use('/', express.static(`${__dirname}/client/build`));

// serve the files out of ./public as our main files
app.use( express.static( path.join( __dirname, '/public' ) ) );
// session tokens
app.use( session( {
    secret: 'sdfrsedterdsafaasdf',
    resave: true,
    saveUninitialized: true
} ) );

let ssn;

// for parsing incoming requests
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( {     // to support URL-encoded bodies
    extended: true
} ) );

// get the app environment from Cloud Foundry
let appEnv = cfenv.getAppEnv();


// home page is in /checkout.html
app.get( '/', function ( req, res )
{
    res.sendFile( path.resolve( 'public/checkout.html' ) );
} );


// routes to direct to gate way
// get banks Step1
app.get( '/gateway/open-banking/banks', function ( req, res )
{
    let request_url = gateway_url + 'banks';
    // console.log( request_url );
    // console.log( req.headers );
    let options = {
        "url": request_url,
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        }
    };
    console.log( '1. Get the list of available banks..' );
    console.log( options );
    request.get( options, function ( error, response, body )
    {
        if(error || response.statusCode !== 200)
        {
            console.log( 'error:', error ); // Print the error if one occurred
            res.sendStatus(500)
        }
        else
        {
            console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
            console.log( 'body:', body );
            res.json( JSON.parse(response.body) );
        }
    } );

} );

// payment initiations step 2
app.post( '/gateway/open-banking/payments', function ( req, res )
{
    ssn = req.session

    let request_url = gateway_url + 'payments'

    console.log( request_url )

    let amount = req.body.amount
    let currency = req.body.currency
    let bankId = req.header( "bankID" )
    ssn.bankId = bankId

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
                    "Name": "Carlo Marcoli",
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
        "url": request_url,
        "headers": {
            "authorization": "Bearer",
            "accept": "application/json",
            "content-type": "application/json",
            "x-fapi-customer-ip-address": 1,
            "x-fapi-customer-last-logged-time": 1,
            "x-fapi-financial-id": 1,
            "x-fapi-interaction-id": 1,
            "x-idempotency-key": 1,
            "x-jws-signature": 1,
            "bankid": bankId,
        },
        "body": paymentSetupRequest,
        json: true
    };

    console.log( '2. Initiating the Payment..' );
    console.log( JSON.stringify( options ) );

    request.post( options, function ( error, response, body )
    {
        if(response.statusCode !== 302)
        {
            res.sendStatus(500)
            return
        }

        console.log( 'error:', error ); // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
        console.log( 'body:', body ); // print the body

        paymentId = body.Data.PaymentId;

        //ssn.payment_data = JSON.stringify( tempData );

        // TODO look for status code 302 and a redirectUrl
        // use that redirectUrl instead of the hard coded url below
        // Register bank oauth/callback with bank for the auth code that then gets passed to banksy

        let redirectUrl = response.headers.location + "?client_id=54c715f0-231c-11e8-9303-ed96349e1d66&scope=psd2&amount=" + amount + "&currency=" + currency + "&state=123456&paymentid=" + paymentId

        console.log('/payments response redirect_url: ' + redirectUrl)

        //response.body.Links.next = redirectUrl

        //response.body.Links.next = "http://169.46.60.51:8181/loginOauthUser?client_id=bbdf7ed0-2312-11e8-9303-ed96349e1d66&scope=psd2&amount=" + amount + "&currency=" + currency + "&state=123456&paymentid=" + paymentId

        res.json( { redirect_url: redirectUrl } );
    } );
} );

// TODO this really needs to be paymentSubmission to Banksy.  I do not handle getting the token
app.get( '/oauth/callback', function ( req, res )
{

    if ( !req.query.code )
    {
        // TODO what is the proper status code?
        res.send( 500 )
        return
    }

    // TODO the account number should be in the req.query and I need to pass that as well

    let data = new URLSearchParams()
    data.append( "authorizationcode", req.query.code )
    data.append( "paymentid", paymentId )
    data.append( "merchantid", "M0000" )
    data.append( "accountno", req.query.accountno)
    data.append( 'grant_type', 'authorization_code' )
    data.append( 'client_id', '54c715f0-231c-11e8-9303-ed96349e1d66' )
    data.append( 'client_secret', '16826038-c685-484e-9cb6-0fd2e5feecda' )
    data.append( 'redirect_uri', 'http://apollo11.fyre.ibm.com:8500/oauth/callback' )


    let url =  gateway_url + 'oauth';

    res.redirect('/paymentcomplete')

    // fetch( url,
    //     {
    //         method: 'POST',
    //         body: data
    //     } )
    //     .then( response =>
    //     {
    //         // TODO check that there is a 302 status code
    //         res.redirect('/paymentcomplete')
    //     } )
    //     .catch( error =>
    //     {
    //         console.log( error )
    //     } )
} );

app.get( '/redirect_bank_login', function( req, res ) {

    //http://169.46.60.51:8181/loginOauthUser

    // 1. redirect to bank login
    // 2. get auth token
    // 3. complete payment
})

//app.get( '/redirect_location', function ( req, res )
app.get( '/redirect_payment_complete', function ( req, res )
{
    // add bank login here
    /*let options = {
        method: 'POST',
        url: gateway_url + 'payment-submissions',
        headers:
            {
                bankid: ssn.bankId,
                'x-jws-signature': '1',
                'x-idempotency-key': '1',
                'x-fapi-interaction-id': '1',
                'x-fapi-financial-id': '1',
                'x-fapi-customer-last-logged-time': '1',
                'x-fapi-customer-ip-address': '1',
                'content-type': 'application/json',
                accept: 'application/json',
                authorization: 'Bearer ' + 'accesstokenplaceholder'
            },
        body: JSON.parse( ssn.payment_data ),
        json: true
    };

    console.log( '5. Submitting the payment..' );
    console.log( JSON.stringify( options ) );

    request( options, function ( error, response, body )
    {
        console.log( 'error:', error ); // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
        console.log( 'body:', body ); // print the body

        // send the completed file
        res.redirect( '/paymentcomplete.html' );
    } );*/

    res.redirect( '/paymentcomplete.html' );
} );

// the cfenv library will not reflect a change to the port in it's url
// so hack in the correct values - ok while it works...
if ( appEnv.isLocal )
{
    appEnv.url = appEnv.url.replace( appEnv.port, port );
    appEnv.port = port;
}

console.log( appEnv.port );
// start server on the specified port and binding host
app.listen( appEnv.port, '0.0.0.0', function ()
{

    // print a message when the server starts listening
    console.log( "server starting on " + appEnv.url );
} );

