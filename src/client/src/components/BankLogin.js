import React from 'react';

import { connect } from 'react-redux'
import _ from 'lodash'
import { Media, Row, Col, Button, Image, Modal, OverlayTrigger } from 'react-bootstrap';
import Iframe from 'react-iframe'
import { fetchBanks, bankSelected, sendPayment } from '../actions/store.actions'

const BankLogin = ( { show, paymentMethodLoginUrl } ) => (
    <Modal show={show>
        <Modal.Body>

            <Iframe url={paymentMethodLoginUrl}
                    width="450px"
                    height="450px"
            />

        </Modal.Body>
    </Modal>
)

export default connect( state =>
{
    return {
        paymentMethodLoginUrl: state.store.paymentMethodLoginUrl,
    }
} )( BankLogin )
