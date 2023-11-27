const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const discoverySchema = new Schema({
    name: String,
    uri: String,
    port: Number,
});

discoverySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
discoverySchema.set('toJSON', {
    virtuals: true
});

discoverySchema.findById = function (cb) {
    return this.model('Services').find({id: this.id}, cb);
};

const Service = mongoose.model('Services', discoverySchema);


exports.findByName = (name) => {
    return Service.find({name: name});
};

exports.findById = (id) => {
    return Service.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createService = (serviceData) => {
    const service = new Service(serviceData);
    return service.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Service.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, services) {
                if (err) {
                    reject(err);
                } else {
                    resolve(services);
                }
            })
    });
};

exports.patchUser = (id, serviceData) => {
    return Service.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (serviceId) => {
    return new Promise((resolve, reject) => {
        Service.deleteMany({_id: serviceId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

