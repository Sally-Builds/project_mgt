const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


router.use(authController.protect)

router.post('/assign/:id', userController.assignStudentsToSupervisor);
router.get('/sup', userController.getSupervisor);
router.get('/allsups', userController.getAllSupervisors);
router.get('/unassigned', userController.getUnassignedStudents);

router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateMe
);

router.get('/me', userController.getMe, userController.getUser);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'))

router
  .route('/')
  .get(
    userController.getAllUsers)
  .delete( 
    userController.getAllUsers);


router
  .route('/:id')
  .delete(
    userController.deleteUser)
  .get(
    userController.getUser)

module.exports = router;
