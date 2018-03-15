import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Row, Col, Image } from 'react-bootstrap';


const Header = ( { numItems } ) => (
    <div style={{ width: "100%", marginTop: 10, marginBottom: 50 }}>

        <Row>
            <Col xs={1} md={1}/>
            <Col xs={2} md={2} >
            <Image src={require( '../images/herenow.png' )} style={{ height: 30 }} />
            </Col>
            <Col xs={9} md={9}/>
        </Row>

        <Row>
            <Col xs={1} md={1}/>
            <Col xs={2} md={2}>
                <Link to='/'>Store</Link>
            </Col>
            <Col xs={6} md={6}/>
            <Col xs={2} md={2}>
                <Link to='/cart'>Cart({numItems})</Link>
            </Col>
            <Col xs={1} md={1}/>
        </Row>
    </div>
)

export default connect( state =>
{
    return {numItems: state.store.numItems}
} )( Header )
