const express = require('express');
const projectAssignController = require('../controller/projectAssignmentController');
const authController = require('../controller/authController');

const router = express.Router();


router.use(authController.protect)



router
  .route('/')
  .post(
    authController.restrictTo('admin'), 
    projectAssignController.assignSupervision)
  .get(
    projectAssignController.getProjectAssignment)


// router
//   .route('/:id')
//   .delete(projectController.deleteProject)
//   .get(projectController.getBlog)
//   .patch(projectController.updateProject)

module.exports = router;
