const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    userId: Object,
    productId: Object,
    quantity: Number
});



ordersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ordersSchema.set('toJSON', {
    virtuals: true
});

ordersSchema.findById = function (cb) {
    return this.model('Orders').find({id: this.id}, cb);
};

const Order = mongoose.model('Orders', ordersSchema);

exports.findById = (id) => {
    return Order.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createOrder = (orderData) => {
    const order = new Order(orderData);
    return order.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Order.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, orders) {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            })
    });
};

exports.patchOrder = (id, orderData) => {
    return Order.findOneAndUpdate({
        _id: id
    }, orderData);
};

exports.removeById = (orderId) => {
    return new Promise((resolve, reject) => {
        Order.deleteMany({_id: orderId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

