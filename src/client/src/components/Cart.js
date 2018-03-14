import React from 'react';
import Header from './Header'

import { connect } from 'react-redux'
import _ from 'lodash'
import { Media, Row, Col, Button, Image, Modal, OverlayTrigger } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Iframe from 'react-iframe'
import { fetchBanks, bankSelected, sendPayment, bankLoginCompleted } from '../actions/store.actions'

import Checkout from './Checkout'
import Spinner from 'react-spinkit'

// TODO dispatch is so they can remove items from the cart.  Low priority
// TODO prob need row/col instead of media component so things line up better
const ItemRow = ( { item, dispatch } ) => (
    <Media>
        <Media.Left>
            <img width={64} height={64} src={item.url}/>
        </Media.Left>
        <Media.Body>
            <Row>
                <Col xs={4} md={4}>
                    {item.title}
                </Col>
                <Col xs={4} md={4}>
                    {item.qty}
                </Col>
                <Col xs={4} md={4}>
                    ${item.price}
                </Col>
            </Row>
        </Media.Body>
    </Media>
)

const BankLogin = ( { show, paymentMethodLoginUrl, paymentLoginInitiated, onHide } ) => (
    <Modal show={show}>
        <Modal.Body>

            <div style={{width:450, height:600}}>

                {paymentLoginInitiated ?
                    <div  style={{left: '57%', top: '50%', position: 'relative'}}>
                        <Spinner name='double-bounce'/>
                    </div> :
                    <div style={{position: 'absolute', left: 70, }}>
                        <Iframe url={paymentMethodLoginUrl}

                                width="450px"
                                height="550px"
                        />
                    </div>
                }


                <Button onClick={onHide}
                    style={{position: 'absolute', left: 250, bottom: 10}}>Cancel</Button>
            </div>
        </Modal.Body>
    </Modal>
)

class Cart extends React.Component
{
    constructor( props )
    {
        super( props )

        this.state = { showCheckout: false }
    }

    render()
    {
        let { cartItems, dispatch, total, paymentMethodLoginUrl, paymentLoginInitiated } = { ...this.props }
        return (
            <div style={{ margin: 50 }}>
                <Header/>

                <div style={{ margin: 20 }}>
                    SHOPPING CART
                </div>
                <Row>
                    <Col xs={4} md={4}>
                        ITEM
                    </Col>
                    <Col xs={4} md={4}>
                        QTY.
                    </Col>
                    <Col xs={4} md={4}>
                        PRICE
                    </Col>
                </Row>

                <hr/>
                {cartItems.map( ( item, i ) => <ItemRow key={i} item={item} dispatch={dispatch}/> )}

                <Row>
                    <Col md={8}/>
                    <Col md={4}>
                        SUBTOTAL ${total}
                    </Col>
                </Row>
                <hr/>

                <Button onClick={() =>
                {
                    dispatch( fetchBanks() )
                    this.setState( { showCheckout: true } )
                }}
                        disabled={!total || total <= 0}
                >CHECKOUT</Button>


                <Checkout
                    onHide={() => {
                        this.setState( { showCheckout: false } )
                    }}
                    show={this.state.showCheckout}
                />

                <BankLogin show={paymentLoginInitiated || !!paymentMethodLoginUrl} paymentLoginInitiated={paymentLoginInitiated} paymentMethodLoginUrl={paymentMethodLoginUrl}
                           onHide={()=>dispatch(bankLoginCompleted(null))}
                />
            </div>
        )
    }
}


export default connect( state =>
{
    return {
        cartItems: state.store.cartItems,
        banks: state.store.banks,
        total: state.store.total,
        paymentMethodLoginUrl: state.store.paymentMethodLoginUrl,
        paymentLoginInitiated: state.store.paymentLoginInitiated,
    }
} )( Cart )
