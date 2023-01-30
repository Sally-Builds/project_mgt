const path = require('path')
const multer = require('multer');
const Project = require('../models/projectModel')
const User = require('../models/userModel');
const ProjectAssign = require('../models/projectAssignmentModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    req.body.projectFile = 'user' + '-' + req.user.id + '-file-' + uniqueSuffix + '.pdf'
    cb(null, 'user' + '-' + req.user.id + '-file-' + uniqueSuffix + '.pdf')
  }
})

exports.uploadProjectFile = multer({
  storage,
}).single('projectFile');


//create Blog
exports.createProject = catchAsync(async(req, res, next) => {
    req.body.student = req.user.id
    const project = await Project.create(req.body);
    

    res.status(201).json({
        status: 'success',
        data: {
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

//Get all Blog
exports.getAllProjectsAdmin = catchAsync(async(req, res, next) => {

  const projects = await Project.find({status: "approved"});
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });

})

exports.uploadFile = catchAsync(async(req, res, next) => {
  console.log(req.body)
    const project = await  Project.findOneAndUpdate({student: req.user.id, _id: req.params.id}, req.body, {
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

//Update blog
exports.updateProject = catchAsync(async(req, res, next) => {
  console.log(req.params.id)
    const project = await  Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    console.log(project)
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


