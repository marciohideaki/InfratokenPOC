const DiscoveryModel = require('../models/discovery.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    DiscoveryModel.createService(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    DiscoveryModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    DiscoveryModel.findById(req.params.serviceId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByName = (req, res, next) => {
    DiscoveryModel.findByName(req.params.serviceName)
        .then((services) => {
            if(!services[0]){
                res.status(404).send({});
            }else{
                res.status(200).send(services);
            }
        });
};

exports.removeById = (req, res) => {
    DiscoveryModel.removeById(req.params.serviceId)
        .then((result)=>{
            res.status(204).send({});
        });
};