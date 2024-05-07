const mongoose = require('mongoose');
require('dotenv').config();

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a valid reminder"],
        trim: true,
        maxlength: [35, "reminder cannot be longer than 35 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    howto: {
        type: String
    }
});



module.exports = mongoose.model('Task', TaskSchema);
