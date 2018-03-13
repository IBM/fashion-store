import React from 'react';
import Header from './Header'
import { Media, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import _ from 'lodash'

import { connect } from 'react-redux'

import {addItemToCart} from '../actions/store.actions'
const storeItems = [
    {
        title: 'Some cool shoe',
        description: 'This shoe is amazingly coole',
        url: require( '../images/store-main2.jpg' ),
        price: '100',
        id: 0,
    },
    {
        title: 'Some cool shoe',
        description: 'This shoe is amazingly coole',
        url: require( '../images/store-main2.jpg' ),
        price: '100',
        id: 1,
    },
    {
        title: 'Some cool shoe',
        description: 'This shoe is amazingly coole',
        url: require( '../images/store-main2.jpg' ),
        price: '100',
        id: 2,
    },
    {
        title: 'Some cool shoe',
        description: 'This shoe is amazingly coole',
        url: require( '../images/store-main2.jpg' ),
        price: '100',
        id: 3,
    },
    {
        title: 'Some cool shoe',
        description: 'This shoe is amazingly coole',
        url: require( '../images/store-main2.jpg' ),
        price: '100',
        id: 4,
    },
]

const StoreRow = ( { items, dispatch } ) =>
    (
        <Row>
            <Col xs={2} md={2}/>
            {items.map( item =>
                (

                    <Col xs={4} md={4} >
                        <Thumbnail src={item.url} responsive>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <p>
                                <Button bsStyle="primary" onClick={()=>dispatch(addItemToCart(item))}>add to cart</Button>
                            </p>
                        </Thumbnail>
                    </Col>
                )
            )}
            <Col xs={2} md={2}/>
        </Row>
    )

const Store = ({dispatch}) => (
    <div style={{ margin: 50 }}>
        <Header/>

        {_.chunk(storeItems, 2).map( (items, index) => <StoreRow key={index} items={items} dispatch={dispatch}/>)}
    </div>
)

export default connect()(Store)
