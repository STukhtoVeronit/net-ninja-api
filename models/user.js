const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "public"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const  UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: Number,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const User = mongoose.model('user', UserSchema);

module.exports = User;