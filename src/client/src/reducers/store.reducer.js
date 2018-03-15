import { handleActions } from 'redux-actions'

import { paymentCompleted, addItemToCart, receiveBanks, bankSelected, paymentInitiatedReceived, bankLoginCompleted, paymentInitiationSent } from '../actions/store.actions'

import _ from 'lodash'

const initialState = { cartItems: [], numItems: 0, banks: [], paymentLoginInitiated: false, bankLoginCompleted: false, purchasedItems:[] }

export default handleActions(
    {
        [ addItemToCart ]: ( state, action ) =>
        {
            let cartItems = { ...state }.cartItems

            let index = _.findIndex( cartItems, item => item.id === action.payload.id )

            if ( index === -1 )
            {
                action.payload.qty = 1
                cartItems.push( action.payload )
            }
            else
            {
                cartItems[ index ].qty++
            }

            let numItems = cartItems.reduce( ( v, item ) => v + item.qty, 0 )
            return {
                ...state,
                cartItems,
                numItems: numItems,
                total: cartItems.reduce( ( v, item ) => (parseInt( item.price ) * item.qty) + v, 0 )
            }
        },

        [ receiveBanks ]: ( state, action ) =>
        {
            //banks = action.payload

            return {
                ...state,
                banks: action.payload,
            }
        },

        [bankSelected]: (state, action) => ({
            ...state,
            selectedBank: action.payload
        }),

        [paymentInitiatedReceived]: (state, action) => ({
            ...state,
            paymentMethodLoginUrl: action.payload,
            paymentLoginInitiated: false,
        }),

        [bankLoginCompleted]: ( state, action) => {
            let cartItems = { ...state }.cartItems
            let purchaseTotal = { ...state }.total
            return {
                ...state,
                paymentMethodLoginUrl: null,
                bankLoginCompleted: action.payload,
            }
        },

        [paymentCompleted]: ( state, action) => {
            let cartItems = { ...state }.cartItems
            let purchaseTotal = { ...state }.total
            return {
                ...state,
                paymentMethodLoginUrl: null,
                purchasedItems: cartItems,
                purchaseTotal: purchaseTotal,
                cartItems: [],
                numItems: 0,
                total: 0,
            }
        },

        [paymentInitiationSent]: (state, action) => {
            return {
                ...state,
                paymentLoginInitiated: true,
                bankLoginCompleted: false,
            }
        },



    },
    initialState,
)
