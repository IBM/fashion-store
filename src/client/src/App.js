import React, { Component } from 'react';
import './App.css';

import { hot } from 'react-hot-loader'
import Cart from './components/Cart'
import Main from './components/Main'
import Shop from './components/Shop'
import Callback from './components/Callback'
import PaymentComplete from './components/PaymentComplete'

import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history';
import store from './store'

import { postPayment } from './actions/store.actions'
class App extends Component
{
    render()
    {
        if ( window.location.hash !== "" )
        {
            store.dispatch( postPayment( window.location.hash.replace( '#', '?' ) ) )
            //store.history.push('/paymentcomplete')
        }

        return (
            <Provider store={store}>
                <div className="App">
                    <Switch history={history}>
                        <Route exact path='/' component={Main}/>
                        <Route path='/cart' component={Cart}/>
                        <Route path='/shop' component={Shop}/>
                        <Route path='/paymentcomplete' component={PaymentComplete}/>
                        <Route path='/callback' component={Callback}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default hot( module )( App );
