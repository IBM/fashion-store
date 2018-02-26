// This application uses express as its web server
// for more info, see: http://expressjs.com


/*
    [patrick cremin] Notes on payment and oauth process
    1. user selects bank and hits 'pay now'
    2. '/gateway/open-banking/payments': payment request is sent to api server and payment data is returned
    3. oauth flow is started by redirecting the user to the bank login page
    4. after users enters their credentials, bank redirects back to us '/oauth/callback'
        a) code is used to get auth token from the bank
    5. '/redirect_payment_complete' payment is completed and user is redirected to payment complete page
 */

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
let gateway_url = "http://athena1.fyre.ibm.com:32756/open-banking/"
//let gateway_url = "http://localhost:8400/open-banking/"

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
    console.log( request_url );
    console.log( req.headers );
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
        console.log( 'error:', error ); // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
        console.log( 'body:', body );
        res.send( JSON.parse( response.body ) );
    } );

} );

// payment initiations step 2
app.post( '/gateway/open-banking/payments', function ( req, res )
{
    ssn = req.session;

    let tempData = {};
    let request_url = gateway_url + 'payments';

    console.log( request_url );

    let bodyTemp = JSON.stringify( req.body );
    bodyTemp = JSON.parse( bodyTemp );

    let bankId = req.header( "bankID" );
    ssn.bankId = bankId;

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
        "body": bodyTemp,
        json: true
    };

    console.log( '2. Initiating the Payment..' );
    console.log( JSON.stringify( options ) );

    request.post( options, function ( error, response, body )
    {
        console.log( 'error:', error ); // Print the error if one occurred
        console.log( 'statusCode:', response && response.statusCode ); // Print the response status code if a response was received
        console.log( 'body:', body ); // print the body

        tempData.Data = response.body.Data;
        tempData.Risk = response.body.Risk;

        ssn.payment_data = JSON.stringify( tempData );

        //response.body.Links.next = response.body.Links.next.replace('redirect_uri=http://localhost:8080/paymentcomplete.html', 'redirect_uri=' + appEnv.url +'/redirect_location');
        //response.body.Links.next = external_url + 'paymentcomplete.html';
        //response.body.Links.next = external_url + 'redirect_location';

        response.body.Links.next = "http://169.46.60.51:8181/loginOauthUser";


        //let token_url = response.body.Links.last.split('?')[0];
        //ssn.token_url = token_url;

        //let next_url = response.body.Links.next;
        //res.send(response.body);

        res.send( body );
    } );
} );

// Step 4 (and 5) (how to be sure this comes from the auth server?)
/*
app.get('/redirect_location', function (req, res) {
  // get the oauth code
  let code = req.query.code;
  // get the url for the bank oauth from the session (could save this somewhere else also)
  let bank_url = ssn.token_url;
  // swap this for a token
  let options = {
    method: 'POST',
    url: ssn.token_url,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: 'Basic NTA2ODJmNDItMzlkNC00ODAwLTk4Y2YtMWM0ZmRhYThlOGE2OnJDN3RFNHdONXhJNWNRNWFQNG5XNXhMN3NBM2NGMWdJOGNZM2lDMmlVNG9NN2VCN3NI'
    },
    form:
    {
      grant_type: 'authorization_code',
      redirect_uri: appEnv.url + req.route.path, // TODO Check this appEnv.url reflects the correct port local!!!
      code: code,
    }
  };

  // step 4
  console.log('4. Swapping the token for the authorizaion code..');
  console.log(options);
  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // print the body

    // submit the payment - Step 5
    let access_token = JSON.parse(body).access_token;

    let options = {
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
        authorization: 'Bearer ' + access_token
      },
      body: JSON.parse(ssn.payment_data),
      json: true
    };
    console.log('5. Submitting the payment..');
    console.log(options);
    request(options, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // print the body

      // send the completed file
      res.redirect('/paymentcomplete.html');
    });

  });

});
*/

app.get( '/oauth/callback', function ( req, res )
{

    if ( !req.query.code )
    {
        // TODO what is the proper status code?
        res.send( 500 )
        return
    }

    let data = new URLSearchParams();
    data.append( "code", req.query.code );
    data.append( 'grant_type', 'authorization_code' );
    data.append( 'client_id', 'client123456' );
    data.append( 'client_secret', 'client123456' );
    data.append( 'redirect_uri', 'http://169.46.60.51:8181/login' );


    fetch( "http://169.46.60.51:8181/oauth/token",
        {
            method: 'POST',
            body: data
        } )
        .then( response =>
        {
            return response.json()
        } )
        .then( json =>
        {
            console.log( JSON.stringify( json ) )
            // TODO [patrick cremin] save the token so that it can be used for the payment
            res.body.Links.next = external_url + 'redirect_payment_complete';
            res.redirect(external_url + 'redirect_payment_complete')
        } )
        .catch( error =>
        {
            console.log( error )
        } )
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
    let options = {
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
    } );
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

