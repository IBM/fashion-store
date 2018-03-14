import express from 'express';
import request from 'request';

import React from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

import routes from '../client/src/routes';

const router = express.Router();

router.get('*', (req, res) => {
    let context = {};
    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
        </StaticRouter>
);
    res.render('index', {title: 'Express', data: false, content });
});

module.exports = router;
