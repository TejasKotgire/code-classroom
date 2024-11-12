const express = require('express');
// const { authMiddleware } = require('../middlewares/authMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js')
const { createAssignment, submitCode, getAssignment, getSubmissions } = require('../controllers/assignmentController.js');
const router =  express.Router();

router.post('/new/:classroomId', authMiddleware, createAssignment);
router.post('/:assignmentId/submit', authMiddleware, submitCode);
router.get('/:classroomId', authMiddleware, getAssignment);
router.get('/view/:assignmentId', authMiddleware, getSubmissions);

module.exports = router;