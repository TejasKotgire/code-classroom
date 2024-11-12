const Assignment = require('../models/Assignment.model');
const Classroom = require('../models/Classroom.model');
const User = require('../models/User.model')

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

exports.submitCode = async(req, res) => {
    const {code, assignmentId, studentId, submittedAt} = req.body;
    try {
        const assignment = await Assignment.findById(assignmentId);

        let resend = assignment.submissions.find(s => s.student.equals(studentId));
        // console.log(resend)
        if(resend){
            resend.code = code;
            assignment.save();
            res.status(200).json({
                msg : "code updated successfully"
            })
        }
        else{
            assignment.submissions.push({
                student : studentId,
                code,
                submittedAt
            })
            assignment.save();
            res.status(200).json({
                mag : "code submitted successfully"
            });
        }

    } catch (error) {
        res.status(400).json({
            msg : "error in assignment submit code controller"
        });
        console.log("error in assignment submit code controller" + error)
    }
};

exports.getAssignment = async (req, res)=>{
    const classId = req.params.classroomId;
    try {
        const classname = await Classroom.findById(classId).populate({
            path : 'assignments',
            select : 'title description status score submissions _id'
        })
        let id = 0;
        const assignments = classname.assignments.map(assignment => {
            // id++;
            return {
                id : assignment._id,
                title: assignment.title,
                description: assignment.description,
                status: assignment.status,
                score: assignment.score,
                submissions : assignment.submissions
            };
        });
        // console.log(assignments)
        res.status(200).json({assignments})
    } catch (error) {
        console.log("error getting assignment in assignment controller", error);
    }
}

exports.getSubmissions = async (req, res)=> {
    const assignmentId = req.params.assignmentId;
    // console.log(assignmentId)
    try {
        const assignment = await Assignment.findById(assignmentId).populate('submissions.student', 'name');
        const AllSubmissions = assignment.submissions.map(submission=> {
            return{
                submittedAt : submission.submittedAt,
                code : submission.code,
                student : submission.student._id,
                studentName : submission.student.name,
                id : submission.student._id,
                grade : submission.grade
            }
        })
        res.send(AllSubmissions);
    } catch (error) {
        console.log("error at getsubmissions" + error);
        res.status(400).json({
            msg : "error at getSubmissions"
        })
    }
}

exports.updateGrade = async (req, res) => {
    const { assignmentId, studentId } = req.params;
    const { grade } = req.body;
  
    try {
      const assignment = await Assignment.findById(assignmentId);
      const submissionIndex = assignment.submissions.findIndex(sub => sub.student.toString() === studentId);
  
      if (submissionIndex === -1) {
        return res.status(404).json({ msg: "Submission not found" });
      }
  
      assignment.submissions[submissionIndex].grade = grade;
      await assignment.save();
  
      res.json(assignment.submissions[submissionIndex]);
    } catch (error) {
      console.error("Error updating grade:", error);
      res.status(400).json({
        msg: "Error updating grade"
      });
    }
}