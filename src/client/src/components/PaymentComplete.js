import React from 'react';
import Header from './Header'

import { connect } from 'react-redux'
import { bankLoginCompleted, paymentCompleted } from '../actions/store.actions'
import { Media, Row, Col, Button, Image, Modal, OverlayTrigger } from 'react-bootstrap';

const ItemRow = ( { item } ) => (
    <div style={{margin:10, marginLeft: "20%", marginRight:"20%"}}>
    <Row>
        <Col xs={3} md={3}>
            <Image rounded responsive src={item.url} style={{height: 50}}/>
        </Col>
        <Col xs={3} md={3}>
            {item.title}
        </Col>
        <Col xs={3} md={3}>
            {item.qty}
        </Col>
        <Col xs={3} md={3}>
            £{item.price}
        </Col>
    </Row>
    </div>
)

class PaymentComplete extends React.Component {
    constructor(props)
    {
        super(props)
    }

    componentWillMount()
    {
        // TODO more hacky crap because I am out of time
        this.props.dispatch(bankLoginCompleted(false))
    }

    render()
    {
        let { purchasedItems, purchaseTotal, dispatch } = {...this.props}

        return (
            <div>
                <Header/>

                <div style={{
                    margin: 50,
                }}>
                    <h3>Your payment has been processed</h3>

                    <div style={{ marginTop: 50 }}>
                        {purchasedItems.map( ( item, i ) => <ItemRow key={i} item={item}/> )}
                    </div>
                    <div style={{ margin: 50 }}>
                        Total: £{purchaseTotal}
                    </div>
                </div>
            </div>
        )
    }
}
// let PaymentComplete = ( { purchasedItems, purchaseTotal, dispatch } ) => (
//     <div>
//         <Header/>
//
//         <div style={{
//             margin: 50,
//         }}>
//             <h3>Your payment has been processed</h3>
//
//             <div style={{ marginTop: 50 }}>
//                 {purchasedItems.map( ( item, i ) => <ItemRow key={i} item={item}/> )}
//             </div>
//             <div style={{ margin: 50 }}>
//                 Total: £{purchaseTotal}
//             </div>
//         </div>
//     </div>
// )

export default connect( state =>
{
    return {
        purchasedItems: state.store.purchasedItems,
        banks: state.store.banks,
        total: state.store.total,
        paymentMethodLoginUrl: state.store.paymentMethodLoginUrl,
        paymentLoginInitiated: state.store.paymentLoginInitiated,
        bankLoginCompleted: state.store.bankLoginCompleted,
        purchaseTotal: state.store.purchaseTotal,

    }
} )( PaymentComplete )
