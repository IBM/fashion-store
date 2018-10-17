import React from 'react';
import Header from './Header'
import { Route, Redirect } from 'react-router'
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'
import _ from 'lodash'

class Callback extends React.Component
{
    constructor( props )
    {
        super( props )
    }

    render()
    {
        //let {  } = { ...this.props }


        return (
            <div>
            </div>
        )
    }
}


export default connect( state =>
{
    return {
    }
} )( Callback )
