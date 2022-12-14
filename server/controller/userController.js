const path = require('path')
const multer = require('multer');
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

exports.uploadUserPhoto = multer({
  storage,
}).single('projectFile');


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.projectFile = req.body.projectFile;

  // // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});



//get All Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(201).json({
    status: 'successful',
    users,
  });
});




//delete current userPassword
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});


//delete user
exports.deleteUser = catchAsync(async(req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(204).json({
    status: 'success',
    data: null,
  });
})

exports.assignStudentsToSupervisor = catchAsync(async(req, res, next) => {
  const existingSupervises = await ProjectAssign.findOne({supervisee: {"$in": req.body.supervisee}}).populate('supervisee');
  
  if(existingSupervises) {
    existingSupervises.supervisee.forEach(e => {
      for(let i = 0; i<req.body.supervisee.length; i++) {
        if(req.body.supervisee[i] == e.id) {
          req.body.supervisee = req.body.supervisee.filter(el => el != e.id )
        }
      }
    })
  }

  const data = await ProjectAssign.findOneAndUpdate({supervisor: req.params.id}, {
    $push: { supervisee: { $each: req.body.supervisee } }
  }, {new: true})

  res.status(200).json({
    status: 'success',
    data,
  });
})

exports.getSupervisor = catchAsync(async(req, res, next) => {
  const data = await ProjectAssign.findOne({supervisee: {"$in": [req.user.id]}}).populate('supervisor');

  res.status(200).json({
    status: 'success',
    name: data.supervisor.fullName,
  })
})

exports.getAllSupervisors = catchAsync(async(req, res, next) => {
  let data = await ProjectAssign.find({}).populate('supervisor');


  if(data) {
    data = data.map((el) => ({name: el.supervisor.fullName, id: el.supervisor.id, numOfSup: el.supervisee.length}))
  }

  res.status(200).json({
    status: 'success',
    data,
  })
})

//get unassigned students
exports.getUnassignedStudents = catchAsync(async(req, res, next) => {
  const data = await ProjectAssign.find({})
  let users = await User.find({role: 'student'})
  let assigned = []
  let unassigned = []
  if(data) {
    data.forEach(el => {
      el.supervisee.forEach((e) => {
        assigned.push(e)
      })
    })

    users.forEach(e => {
      if(typeof (assigned.find(el => el._id == e._id.toString())) === 'undefined') {
        unassigned.push(e)
      }
    })
  }


  res.status(200).json({
    status: 'success',
    data: unassigned
  })
})

//get My Supervisee students

//delete all users
exports.deleteAllUsers = catchAsync(async(req, res, next) => {
  await User.findByIdAndDelete({})

  res.status(204).json({
    status: 'success',
    data: null,
  });
})



//Get current user route
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};



//get single user
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  res.status(201).json({
    status: 'successful',
    user,
  });
});

