const Assignment = require('../models/Assignment.model');
const Classroom = require('../models/Classroom.model')

exports.createAssignment = async(req, res) =>{
    let classroomId = req.params.classroomId;
    // console.log(classroomId)
    let { title, description } = req.body;
    // console.log(title, description, status, score, classroomId);
    try {

        let assignment = await Assignment.create({
            classroom : classroomId,
            title,
            description,
        })
        assignment.save();
        // console.log(assignment);
        let classroom = await Classroom.findById(classroomId);

        classroom.assignments.push(assignment._id)
        classroom.save();
        res.status(200).json({
            msg : "new assignment created in the classroom"
        })
    } catch (error) {
        res.status(400).json({
            msg : "error in assignment controller"
        })
        console.log("error in assignment controller, create assignment")
    }
};

exports.submitCode = async(req, res) => {};

exports.getAssignment = async (req, res)=>{
    const classId = req.params.classroomId;
    try {
        const classname = await Classroom.findById(classId).populate({
            path : 'assignments',
            select : 'title description status score submissions'
        })
        let id = 0;
        const assignments = classname.assignments.map(assignment => {
            id++;
            return {
                id : id,
                title: assignment.title,
                description: assignment.description,
                status: assignment.status,
                score: assignment.score,
                submissions : assignment.submissions
            };
        });
        console.log(assignments)
        res.status(200).json({assignments})
    } catch (error) {
        console.log("error getting assignment in assignment controller", error);
    }
}