import { createAction } from 'redux-actions'

export const addItemToCart = createAction( 'ADD_ITEM_TO_CART' )
export const exampleAction2 = createAction( 'EXAMPLE_ACTION2' )
export const receiveBanks = createAction( 'RECEIVE_BANKS' )
export const bankSelected = createAction( 'BANK_SELECTED' )

export const bankLoginCompleted = createAction( 'BANK_LOGIN_COMPLETED' )

export const paymentInitiationSent = createAction( 'PAYMENT_INITIATED_SENT' )
export const paymentInitiatedReceived = createAction( 'PAYMENT_INITIATED_RECEIVED' )

function url()
{
    return 'www.url.com';
}

// export function fetchStuff()
// {
//     return dispatch =>
//     {
//         return fetch( url(), {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//             headers: {
//                 'x-api-key': apiKey,
//                 'Accept': 'application/json'
//             }
//         } )
//             .then( response => response.json() )
//             .then( json => dispatch( receiveBanks( json ) ) );
//     };
// }

export function fetchBanks()
{
    return dispatch =>
    {
        return fetch( '/gateway/open-banking/banks' )
            .then( response => response.json() )
            .then( json =>
            {
                dispatch( receiveBanks( json.Banks ) )
            } );

        // TODO handle error case
    };
}

export function sendPayment( bank, amount )
{
    return dispatch =>
    {

        dispatch(paymentInitiationSent())

        return fetch( '/gateway/open-banking/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'bankid' : bank.BankID,
            },
            body: JSON.stringify({
                amount,
                currency: 'GBP'
            })
        } )
            .then( response =>
            {
                if(response.status !== 200)
                {
                    throw "bad status: " + response.status
                }

                return response.json()
            } )
            .then( json =>
            {
                dispatch( paymentInitiatedReceived( json.redirect_url ) )

                //TODO THIS IS TEST CODE REMOVE THIS CRAP
                setTimeout(()=>{
                    fetch('/oauth/callback?code=98702319847@accountno=asdfasdf23')
                }, 2000)
            } );
    }
}

export function fetchBanksResponse( banks )
{
    return receiveBanks( banks )
    //return { type: types.RECEIVE_BANKS, banks: json };
}
