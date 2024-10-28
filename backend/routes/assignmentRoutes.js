const express = require('express');
// const { authMiddleware } = require('../middlewares/authMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js')
const { createAssignment, submitCode, getAssignment } = require('../controllers/assignmentController.js');
const router =  express.Router();

router.post('/new/:classroomId', authMiddleware, createAssignment);
router.post('/:assignmentId/submit', authMiddleware, submitCode);
router.get('/:classroomId', authMiddleware, getAssignment);

module.exports = router;