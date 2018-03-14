import React from 'react';
import Header from './Header'
import { Media, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import _ from 'lodash'

import { connect } from 'react-redux'

import {addItemToCart} from '../actions/store.actions'
const storeItems = [
    {
        title: 'Cobalt Blue Blazer',
        description: 'Super 110s wool two piece suit',
        url: require( '../images/cobalt01.png' ),
        price: '850',
        id: 0,
    },
    {
        title: 'Pink Rose Sweater',
        description: 'Pink rose pull over sweater',
        url: require( '../images/rosepinksweater01.jpeg' ),
        price: '95',
        id: 1,
    },
    {
        title: 'Brown Leather Oxford Laceups',
        description: 'A classic derby style with open laces. Constructed of fine italian leather and accentuated by rubber lug soles',
        url: require( '../images/brownleatheroxfords01.jpg' ),
        price: '120',
        id: 2,
    },
    {
        title: 'Light Blue Linen Jacket',
        description: 'Light weight, soft & moveable linen jacket',
        url: require( '../images/lightbluelinen01.png' ),
        price: '90',
        id: 3,
    },
    {
        title: 'Red Turtle Neck Sweater',
        description: 'Cashmere red turtle neck sweater',
        url: require( '../images/redturtlenecksweater01.jpeg' ),
        price: '135',
        id: 4,
    },
    {
        title: 'Grey Slik Spotted Bow Tie',
        description: 'Slik grey, blue and black spotted bow tie',
        url: require( '../images/greyspottedbowtie01.jpeg' ),
        price: '65',
        id: 5,
    },
    {
        title: 'Classic Boyfriend Shirt',
        description: 'Classic boyfriend shirt with a loose fit',
        url: require( '../images/whiteshirt01.jpeg' ),
        price: '55',
        id: 6,
    },
    {
        title: 'Yellow Foral Jumpsuit',
        description: 'Bright, vibrant & color yellow foral jumpsuit',
        url: require( '../images/yellowjumpsuit01.jpeg' ),
        price: '110',
        id: 7,
    }
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
