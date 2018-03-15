import React from 'react';
import Header from './Header'

import { Link, Route } from 'react-router-dom'
import { Row, Col, Button, Image } from 'react-bootstrap';

const imageUrl = require( '../images/store-main.jpg' )

export default () => (

    <div style={{
        backgroundImage: `url(${imageUrl})`,
        "background-size": "contain",
        "background-repeat": "no-repeat",
        "background-position": "center",
        position: 'absolute',

        width: "100%",
        height: "100%"
    }}>
        <Header/>


        <div style={{
            margin: 50,

        }}>
            <div style={{ marginTop: 100, marginLeft: 50, float: "left" }}>
                <Image src={require( '../images/herenow.png' )} style={{ height: 50 }} responsive/>
                <Route path="/" render={( props ) => (
                    <Button
                        onClick={() => props.history.push( '/shop' )}
                        bsSize="lg"
                        style={{ width: 140, backgroundColor: 'transparent' }}>
                        Shop
                    </Button>)}/>
            </div>

        </div>
    </div>
)
