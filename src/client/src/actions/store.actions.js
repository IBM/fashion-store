import { createAction } from 'redux-actions'

export const addItemToCart = createAction( 'ADD_ITEM_TO_CART' )
export const exampleAction2 = createAction( 'EXAMPLE_ACTION2' )
export const receiveBanks = createAction( 'RECEIVE_BANKS' )
export const bankSelected = createAction( 'BANK_SELECTED' )
export const paymentInitiated = createAction( 'PAYMENT_INITIATED' )
export const paymentLoginCompleted = createAction( 'PAYMENT_LOGIN_COMPLETED' )

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
            .then( response => {
                if(response.status !== 302)
                {
                    throw "Server errror: " + response.status
                }

                return response.json()
            } )
            .then( json =>
            {
                dispatch( paymentInitiated( json.redirect_url ) )
            } );
    }
}

export function fetchBanksResponse( banks )
{
    return receiveBanks( banks )
    //return { type: types.RECEIVE_BANKS, banks: json };
}
