const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, 'Please provide a Project title'],
        unique: true
    },
    student: {
        type:  mongoose.Types.ObjectId,
        ref: 'User'
    },
    projectFile: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'decline'],
        default: 'pending'
    },
    projectAssign: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a Project assignment'],
        ref: 'ProjectAssignment'
    }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project