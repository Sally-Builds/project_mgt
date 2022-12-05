const mongoose = require('mongoose');

const projectAssignmentSchema = new mongoose.Schema({
    supervisor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a supervisor'],
        unique: true
    },
    supervisee : [
        {
            student: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: [true, "please provide at least on student"]
            },
            // projects: {
            //     type: mongoose.Types.ObjectId,
            //     ref: 'Project'
            // }
        }
    ],
    notes: [String]
})

projectAssignmentSchema.virtual('supervisee.projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'projectAssign',
  });

const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema)
module.exports = ProjectAssignment