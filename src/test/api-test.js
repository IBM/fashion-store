let _ = require( 'lodash' )
let assert = require( 'chai' ).assert
let request = require( 'supertest' )
let server = require( '../server' )

describe( 'get banks', () =>
{
    let paymentInitResponse = {}

    it( 'GET /banks', function ()
    {
        return request( server ).get( '/gateway/open-banking/banks' )
            .set( 'Content-type', 'application/json' )
            .expect( 200 )
    } )

    it( 'POST /payments', function ( done )
    {
        let data = getPaymentRequest()

        request( server ).post( '/gateway/open-banking/payments')
            .set( 'x-fapi-financial-id', '0015800001041REAAY' )
            .send( data )
            .expect( 200 )
            .then( response => {
                // TODO assert that paymentId is in response
                assert.isOk( response.body.redirect_url, 'missing redirect_url from response' )

                console.log( response.body.redirect_url )
                paymentInitResponse = response.body.paymentData
                done()
            })
    } )

    it( 'POST /payment-submissions', function ( done )
    {
        let data = getPaymentRequest()

        data.Data.
        request( server ).post( '/gateway/open-banking/payments')
            .set( 'x-fapi-financial-id', '0015800001041REAAY' )
            .send( data )
            .expect( 200 )
            .then( response => {
                // TODO assert that paymentId is in response
                assert.isOk( response.body.redirect_url, 'missing redirect_url from response' )

                console.log( response.body.redirect_url )
                paymentInitResponse = response.body.paymentData
                done()
            })

    } )
} )

function getPaymentRequest()
{
    return {
        "Data": {
            "Initiation": {
                "EndToEndIdentification": "8125371765489664",
                "InstructedAmount": {
                    "Amount": '100.00',
                    "Currency": 'GBP'
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
                    "Name": "TESTING STUPID TEST FACE",
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
}
