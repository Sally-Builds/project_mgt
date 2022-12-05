const ProjectAssignment = require('../models/projectAssignmentModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');



//create Blog
exports.assignSupervision = catchAsync(async(req, res, next) => {

    //check if project is more than 3

    const projectAssignment = await ProjectAssignment.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          projectAssignment,
        }
    })
});


//get Blog
exports.getProjectAssignment = catchAsync(async(req, res, next) => {
    console.log(req.user.id)
    const projectAssignment = await ProjectAssignment.findOne({supervisor: req.user.id}).populate('supervisee.projects')

    if(!projectAssignment){
        return next(new AppError('No blog found with that slug', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
          projectAssignment
        }
    })

});

//Get all Blog
exports.getAllProjects = catchAsync(async(req, res, next) => {

  const projectAssignments = await ProjectAssignment.find();
  res.status(200).json({
    status: 'success',
    results: projectAssignments.length,
    data: {
      projectAssignments
    }
  });

})

//Update blog
exports.updateProject = catchAsync(async(req, res, next) => {
    const projectAssignment = await  ProjectAssignment.findOneAndUpdate({id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    })
    if (!projectAssignment) {
        return next(new AppError('No blog found with that slug', 404));
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          projectAssignment
        }
      });
})

//
exports.deleteProject = catchAsync(async(req, res, next) => {
   const projectAssignment = await  ProjectAssignment.findOneAndDelete({id:req.params.id})
    if (!projectAssignment) {
        return next(new AppError('No blog found with that slug', 404));
      }
    
      res.status(204).json({
        status: 'success',
        data: null
      });
})


