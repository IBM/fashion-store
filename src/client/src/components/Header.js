import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Row, Col, Image } from 'react-bootstrap';


const Header = ( { numItems } ) => (
    <div style={{ marginTop: 10, marginLeft: 40, marginRight: 40, marginBottom: 50 }}>

        <Row >
            <Col xs={2} md={2} className="text-left "  >
            <Image src={require( '../images/herenow.png' )} style={{ height: 15, marginBottom: 5 }} />
            </Col>
            <Col xs={10} md={10}/>
        </Row>

        <Row>
            <Col xs={2} md={2} className="text-left ">
                <Link to='/'>Collection</Link>&nbsp;
                <Link to='/'>Women</Link>&nbsp;
                <Link to='/'>Men</Link>&nbsp;
                <Link to='/'>Store</Link>&nbsp;
            </Col>
            <Col xs={8} md={8}/>
            <Col xs={2} md={2} className="text-right">
                <Link to='/cart'>Cart({numItems})</Link>
            </Col>
        </Row>
    </div>
)

export default connect( state =>
{
    return {numItems: state.store.numItems}
} )( Header )
