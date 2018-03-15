import React from 'react';
import Header from './Header'

import { Link, Route } from 'react-router-dom'
import { Row, Col, Button, Image, Label } from 'react-bootstrap';

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
            margin: 25,

        }}>
            <div style={{ marginTop: 200, marginLeft: 0, float: "left" }}>
                <Image src={require( '../images/herenow.png' )} style={{ height: 35, margin: 10 }} responsive/>
                <Route path="/" render={( props ) => (
                    <Button
                        onClick={() => props.history.push( '/shop' )}

                        style={{ width: 100, backgroundColor: 'transparent' }}>
                        Shop
                    </Button>)}/>
            </div>

        </div>
    </div>
)
