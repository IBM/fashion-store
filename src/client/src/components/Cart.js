import React from 'react';
import Header from './Header'

import { connect } from 'react-redux'
import _ from 'lodash'
import { Media, Row, Col, Button, Image, Modal, OverlayTrigger } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Iframe from 'react-iframe'
import { fetchBanks, bankSelected, sendPayment } from '../actions/store.actions'

import Checkout from './Checkout'

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

const PaymentLogin = ( { show, paymentMethodLoginUrl } ) => (
    <Modal show={show}>
        <Modal.Body>

            <Iframe url={paymentMethodLoginUrl}
                    width="450px"
                    height="450px"
            />

        </Modal.Body>
    </Modal>
)

class Cart extends React.Component
{
    constructor( props )
    {
        super( props )

        this.state = { checkout: false }
    }

    render()
    {
        let { cartItems, dispatch, total, paymentMethodLoginUrl } = { ...this.props }
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
                {cartItems.map( (item, i) => <ItemRow key={i} item={item} dispatch={dispatch}/> )}

                <Row>
                    <Col md={8}/>
                    <Col md={4}>
                        SUBTOTAL ${total}
                    </Col>
                </Row>
                <hr/>

                <div style={{ margin: 50 }}>

                    <Checkout
                        onHide={() => this.setState( { checkout: false } )}
                        show={this.state.checkout}
                    />

                    <Button onClick={() =>
                    {
                        dispatch( fetchBanks() )
                        this.setState( { checkout: true } )
                    }}
                            disabled={!total || total <= 0}
                    >CHECKOUT</Button>

                </div>

                <div>
                    <PaymentLogin show={!!paymentMethodLoginUrl} paymentMethodLoginUrl={paymentMethodLoginUrl}/>
                </div>
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
    }
} )( Cart )
