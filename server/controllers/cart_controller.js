const swag = require('../models/swag')

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        const {cart} = req.session.user;

        var index = cart.findIndex(item => item.id == id)
        if(index === -1){
            var item = swag.find(item => item.id == id)
            cart.push(item)
            req.session.user.total += item.price;
            res.status(200).send(req.session.user)
        }
        else{
            res.status(200).send(req.session.user)
        }
    },
    delete: (req, res, next) => {
        const {id} =req.query;
        const {cart} = req.session.user;
        var item = swag.find(item => item.id == id);
        if(item){
            var index = cart.findIndex(item => item.id == id);
            cart.splice(index, 1);
            req.session.user.total -= item.price;
        }

        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        const {user} = req.session
        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user)
    }
}