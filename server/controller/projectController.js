const Project = require('../models/projectModel')
const ProjectAssign = require('../models/projectAssignmentModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');



//create Blog
exports.createProject = catchAsync(async(req, res, next) => {

    //check if project is more than 3
    const id = await ProjectAssign.findOne({'supervisee.student': req.user.id})
    req.body.projectAssign = id.id
    console.log(req.body)
    const project = await Project.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          // x: 'project,
          project,
        }
    })
});


//get Blog
exports.getProject = catchAsync(async(req, res, next) => {
    const project = await Project.findById(id)

    if(!project){
        return next(new AppError('No blog found with that slug', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
          project
        }
    })

});

//Get all Blog
exports.getAllProjects = catchAsync(async(req, res, next) => {

  const projects = await Project.find({student: req.user.id});
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });

})

//Update blog
exports.updateProject = catchAsync(async(req, res, next) => {
    const project = await  Project.findOneAndUpdate({student:req.user.id, id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    })
    if (!project) {
        return next(new AppError('No blog found with that slug', 404));
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          project
        }
      });
})

//
exports.deleteProject = catchAsync(async(req, res, next) => {
   const project = await  Project.findOneAndDelete({id:req.params.id})
    if (!project) {
        return next(new AppError('No blog found with that slug', 404));
      }
    
      res.status(204).json({
        status: 'success',
        data: null
      });
})


