const mongoose = require('mongoose')
const schema = mongoose.Schema

const data = new schema({
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    start_time: {type: Date, require: true},
    end_time: {type: Date, required: true}
})

data.set('toJSON', { virtuals: true})
module.exports = mongoose.model('food_truck', data);