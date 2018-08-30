const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', function (req, res, next) {
    // User.find({})
    User.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                // query: { type: "public" },
                // includeLocs: "dist.location",
                // num: 5,
                spherical: true
            }
        }
    ]).then((users) => res.send(users))
        .catch(next);
});

router.post('/users', function (req, res, next) {
    // var user = new User(req.body);
    // user.save();
    User.create(req.body)
        .then((user) => res.send(user))
        .catch(next); // return promise
});

router.put('/users/:id', function (req, res, next) {
    User.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {})
        .then(() => User.findOne({_id: req.params.id})
            .then((user) => res.send({user: user})))
        .catch(next);
});

router.delete('/users/:id', function (req, res, next) {
    User.findByIdAndRemove({_id: req.params.id})
        .then((user) => {
            res.send(
                {
                    type: 'DELETE',
                    deleted_user: user
                });
            })
        .catch(next);
});

module.exports = router;