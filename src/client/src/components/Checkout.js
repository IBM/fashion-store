import React from 'react';
import Header from './Header'

import _ from 'lodash'
import { Media, Row, Col, Button, Image, Modal, OverlayTrigger } from 'react-bootstrap';

import { connect } from 'react-redux'
import { fetchBanks, bankSelected, sendPayment, paymentCompleted } from '../actions/store.actions'

const BankSelector = ( { bank, selectedBank, dispatch } ) =>
{

    if ( !bank )
    {
        return null
    }

    let isSelected = selectedBank && selectedBank.BankID === bank.BankID

    return (
        <div style={{ textAlign: 'center', border: isSelected ? '1px solid green': null }} onClick={() => dispatch( bankSelected( bank ) )}>
            {bank.BankName}
            <Image responsive src={bank.bankimageURL}/>
        </div>
    )
}


const Banks = ( { banks, selectedBank, dispatch } ) => (

    <div>
        Select your bank
        <hr/>
        <div style={{ margin: 20 }}>
            {_.chunk( banks, 2 ).map( bankChunk => (
                <Row style={{ marginBottom: 20 }}>
                    <Col xs={4} md={4}>
                        <BankSelector selectedBank={selectedBank} bank={bankChunk[ 0 ]} dispatch={dispatch}/>
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                    <Col xs={4} md={4}>
                        <BankSelector selectedBank={selectedBank} bank={bankChunk[ 1 ]} dispatch={dispatch}/>
                    </Col>
                </Row>
            ) )}
        </div>
    </div>
)

const PaymentMethod = ( { paymentMethod, banks, selectedBank, dispatch } ) => (
    <div>
        {paymentMethod === 'bank' ? <Banks selectedBank={selectedBank} banks={banks} dispatch={dispatch}/> : null}
    </div>
)

class Checkout extends React.Component
{
    constructor( props )
    {
        super( props )

        this.state = { paymentMethod: null }
    }


    //TODO fetch bank on component load
    render()
    {
        let { show, onHide, banks, dispatch, selectedBank, total } = { ...this.props }

        return (
            <Modal show={show} onHide={onHide} >
                <Modal.Header closeButton>
                    <Modal.Title>Select Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col xs={6} md={6}>
                            <Image style={{height: 150}} responsive src={require( '../images/bank_icon.jpg' )} rounded
                                   onClick={() => this.setState( { paymentMethod: 'bank' } )}/>
                        </Col>
                        <Col xs={6} md={6}>
                            <Image style={{height: 150}} responsive src={require( '../images/visa-and-mastercard.gif' )} rounded
                                   onClick={() => this.setState( { paymentMethod: 'creditcard' } )}/>
                        </Col>
                    </Row>


                    <hr/>

                    <PaymentMethod banks={banks} paymentMethod={this.state.paymentMethod} selectedBank={selectedBank} dispatch={dispatch}/>

                </Modal.Body>
                <Modal.Footer>
                    {selectedBank ?
                        <Button bsStyle="primary" style={{width:'100%'}}
                                onClick={()=>{
                                    dispatch(sendPayment(selectedBank, total))
                                    onHide()
                                }}
                        >Pay Now</Button>
                        : null}
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect( state =>
{
    return {
        cartItems: state.store.cartItems,
        banks: state.store.banks,
        selectedBank: state.store.selectedBank,
        total: state.store.total,
        bankLoginCompleted: state.store.bankLoginCompleted,
    }
} )( Checkout )
