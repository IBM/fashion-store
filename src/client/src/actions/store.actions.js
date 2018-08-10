import { createAction } from 'redux-actions'
import history from '../history';

export const addItemToCart = createAction( 'ADD_ITEM_TO_CART' )
export const exampleAction2 = createAction( 'EXAMPLE_ACTION2' )
export const receiveBanks = createAction( 'RECEIVE_BANKS' )
export const bankSelected = createAction( 'BANK_SELECTED' )



export const paymentInitiationSent = createAction( 'PAYMENT_INITIATED_SENT' )
export const paymentInitiatedReceived = createAction( 'PAYMENT_INITIATED_RECEIVED' )

export const paymentCompleted = createAction( 'PAYMENT_COMPLETED' )


export function fetchBanks()
{
    return dispatch =>
    {
        return fetch( '/gateway/open-banking/banks' )
            .then( response => response.json() )
            .then( banks =>
            {
                dispatch( receiveBanks( banks ) )
            } )
            .catch( error => {
                console.log( error )
            })

        // TODO handle error case
    };
}

export function sendPayment( bank, amount, cartItems )
{
    return dispatch =>
    {
        let purchasedItems = cartItems

        dispatch( paymentInitiationSent() )

        console.log( 'POST /payment initiated' )

        return fetch( '/gateway/open-banking/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'bankid' : bank.BankID,
                'x-fapi-financial-id': bank[ 'x-fapi-financial-id' ]
                // TODO get the xfapifinancial id from the bank - no longer need bankid
            },
            body: JSON.stringify( {
                amount,
                currency: 'EUR'
            } )
        } )
            .then( response =>
            {
                if ( response.status !== 200 )
                {
                    throw "bad status: " + response.status
                }

                return response.json()
            } )
            .then( json =>
            {
                console.log( 'POST /payments completed: ' + JSON.stringify( json ) )

                let paymentId = json.paymentId

                // TODO save to local storage
                localStorage.setItem( paymentId, JSON.stringify( {
                    total: amount,
                    purchasedItems
                } ) )

                console.log( 'BANK LOGIN URL: ' + json.redirect_url )

                window.location.href = json.redirect_url
            } );
    }
}

export function postPayment( query )
{
    return dispatch =>
    {
        console.log( 'POST /payment-submissions initiated' )

        // TODO rename from oauth/callback
        fetch( '/gateway/open-banking/payment-submissions' + query )
            .then( response => response.json() )
            .then( json =>
            {
                console.log( 'POST /payment-submissions completed: ' + JSON.stringify( json ) )

                let purchase = JSON.parse( localStorage.getItem( json.Data.PaymentId ) )

                //history.push('/paymentcomplete')

                window.location = '?paymentId=' + json.Data.PaymentId
                dispatch( paymentCompleted( purchase ) )
            } )
    }
}
