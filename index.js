const config = require('./common/config/env.config.js');

const http = require('http');
const express = require('express');
const { createTerminus } = require('@godaddy/terminus');

const app = express();

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const ProductsRouter = require('./products/routes.config');
const OrdersRouter = require('./orders/routes.config');
const DiscoveryRouter = require('./discovery/routes.config');
const server = http.createServer(app);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

AuthorizationRouter
    .routesConfig(app);
UsersRouter
    .routesConfig(app);
ProductsRouter
    .routesConfig(app);
OrdersRouter
    .routesConfig(app);
DiscoveryRouter
    .routesConfig(app);

app.get('/', (req, res) => {
    setTimeout(() => {
      res.send('Server is healthy')
    }, 100)
  })

app.get('/ping', (req, res) => {
    setTimeout(() => {
      res.send('PONG')
    }, 100)
  })

function onSignal() {
    console.log('Server is starting cleanup');
}

async function onHealthCheck () {
    console.log('Server is healthy');
}

createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: {'/healthcheck': onHealthCheck },
    onSignal
 })

server.listen(3000);
app.listen(config.port, function () {
    console.log('Server has started at port %s', config.port);
});

module.exports = app;