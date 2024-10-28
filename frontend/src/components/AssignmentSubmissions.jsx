import React, { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';

const AssignmentSubmissions = ({ onBack }) => {
  // Mock data - in real app this would come from API
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      studentName: "Alice Johnson",
      studentId: "STU001",
      submittedAt: "2024-10-23T14:30:00",
      code: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Test the function
numbers = [1, 2, 3, 4, 5]
result = calculate_sum(numbers)
print(f"Sum of numbers: {result}")`,
      grade: null,
      feedback: ""
    },
    {
      id: 2,
      studentName: "Bob Smith",
      studentId: "STU002",
      submittedAt: "2024-10-23T15:45:00",
      code: `def calculate_sum(numbers):
    return sum(numbers)

# Test the function
test_numbers = [1, 2, 3, 4, 5]
print(f"Sum: {calculate_sum(test_numbers)}")`,
      grade: 85,
      feedback: "Good use of built-in sum function"
    }
  ]);

  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleGradeSubmit = (submissionId) => {
    const grade = parseInt(gradeInput);
    if (isNaN(grade) || grade < 0 || grade > 100) {
      alert("Please enter a valid grade between 0 and 100");
      return;
    }

    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, grade, feedback: feedbackInput }
        : sub
    ));
    setEditingGrade(null);
  };

  const startGrading = (submission) => {
    setEditingGrade(submission.id);
    setGradeInput(submission.grade?.toString() || "");
    setFeedbackInput(submission.feedback || "");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Assignments
        </button>
        <h1 className="text-2xl font-bold">Assignment Submissions</h1>
        <p className="text-gray-600">Review and grade student submissions</p>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div 
            key={submission.id}
            className="border rounded-lg bg-white overflow-hidden"
          >
            {/* Submission Header */}
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{submission.studentName}</h3>
                <p className="text-sm text-gray-600">
                  ID: {submission.studentId} | Submitted: {formatDate(submission.submittedAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {submission.grade !== null && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Grade: {submission.grade}/100
                  </span>
                )}
                <button
                  onClick={() => setExpandedSubmission(
                    expandedSubmission === submission.id ? null : submission.id
                  )}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {expandedSubmission === submission.id ? "Hide Code" : "View Code"}
                </button>
              </div>
            </div>

            {/* Expanded Code View */}
            {expandedSubmission === submission.id && (
              <div>
                {/* Code Display */}
                <div className="p-4 bg-gray-900 text-white overflow-x-auto">
                  <pre className="font-mono text-sm">
                    <code>{submission.code}</code>
                  </pre>
                </div>

                {/* Grading Section */}
                <div className="p-4 bg-gray-50 border-t">
                  {editingGrade === submission.id ? (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleGradeSubmit(submission.id);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Grade (0-100)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="px-3 py-2 border rounded-md w-32"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Feedback
                        </label>
                        <textarea
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          onClick={()=>setEditingGrade(null)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                        >
                          <Check size={16} />
                          Save Grade
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingGrade(null)}
                          className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {submission.grade !== null ? (
                        <>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Grade: {submission.grade}/100</p>
                              {submission.feedback && (
                                <p className="text-sm text-gray-600">
                                  Feedback: {submission.feedback}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => startGrading(submission)}
                              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                            >
                              Edit Grade
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => startGrading(submission)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Grade Submission
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {submissions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No submissions yet.</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmissions;