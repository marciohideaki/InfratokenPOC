const DiscoveryController = require('./controllers/discovery.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/discovery', [
        DiscoveryController.insert
    ]);
    app.get('/discovery', [
        ValidationMiddleware.validJWTNeeded,
        DiscoveryController.list
    ]);
    app.get('/discovery/:serviceName', [
        ValidationMiddleware.validJWTNeeded,
        DiscoveryController.getByName
    ]);
    app.delete('/discovery/:serviceId', [
        ValidationMiddleware.validJWTNeeded,
        DiscoveryController.removeById
    ]);
};
