
import React from 'react';
import Header from './Header'
import { Media, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import _ from 'lodash'


import { connect } from 'react-redux'
import {addItemToCart} from '../actions/store.actions'

let Masonry = require('react-masonry-component')
var masonryOptions = {
    transitionDuration: 0
};


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

const StoreRow = ( { item, dispatch } ) =>
    (
        <Thumbnail src={item.url} responsive style={{margin: 20, width:220}}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>£{item.price}</p>
            <p>
                <Button bsStyle="primary" onClick={()=>dispatch(addItemToCart(item))}>add to cart</Button>
            </p>
        </Thumbnail>
    )

const Store = ({dispatch}) => (
    <div>
        <Header/>

    <div style={{ width: "100%", margin: 50, alignItems: 'center', alignContent: 'center', alignSelf:'center' }}>
        <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
            {storeItems.map( (item, index) => <StoreRow key={index} item={item} dispatch={dispatch}/>)}
        </Masonry>
    </div>

    </div>
)

export default connect()(Store)
