const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project topic is required']
    },
    description: String,
    projectFile: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project