import React from 'react';
import Header from './Header'

import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';

const imageUrl = require( '../images/store-main.jpg' )

export default () => (
    <div style={{
        margin:50,
        backgroundImage: `url(${imageUrl})`,
        "background-size": "cover",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }}>
        <Header/>



        Payment Complete
    </div>
)
