const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

const projectAssignmentSchema = new mongoose.Schema({
    supervisor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a supervisor'],
        unique: true
    },
    supervisee : {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: [true, "please provide at least on student"]
    },
    notes: [String]
})

projectAssignmentSchema.plugin(arrayUniquePlugin);

projectAssignmentSchema.pre(/^find/, async function (next) {
    this.populate({ 
        path: 'supervisee',
        populate: {
          path: 'projects',
          model: 'Project'
        } 
     })
    next();
  });
const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema)
module.exports = ProjectAssignment