import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { Row, Col, Image } from 'react-bootstrap';


const Header = ( { numItems } ) => (
    <div style={{marginBottom: 50}}>
        <Image src={require('../images/herenow.png')}/>

        <div style={{ marginTop: 20 }}>
            <Row className="show-grid" left>
                <Col xs={6} md={2}>
                    <div style={{align: 'left'}}>
                        <Link to='/'>Store</Link>
                    </div>

                </Col>
                <Col xs={4} md={8}>
                </Col>
                <Col xs={6} md={2}>
                    <Link to='/cart'>Cart({numItems})</Link>
                </Col>
            </Row>
        </div>
    </div>
)

export default connect( state =>
{
    return { numItems: state.store.numItems }
} )( Header )
