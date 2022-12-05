const express = require('express');
const projectController = require('../controller/projectController');
const authController = require('../controller/authController');

const router = express.Router();


router.use(authController.protect)



router
  .route('/')
  .post(authController.restrictTo('student'), projectController.createProject)
  .get(
    projectController.getAllProjects)


router
  .route('/:id')
  .delete(projectController.deleteProject)
  .get(projectController.getProject)
  .patch(projectController.updateProject)

module.exports = router;
