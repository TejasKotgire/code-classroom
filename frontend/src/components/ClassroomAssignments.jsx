import React, { useEffect, useState } from 'react';
import { Book, Calendar, Clock, ChevronRight, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'

const ClassroomAssignments = () => {
  const navigate = useNavigate()
  const id = useParams();
  console.log(id.classId)
    const [assignments, setAssignments] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        fetchAssignments();
      }, []);
    
      const fetchAssignments = async () => {
        try {
          // 671804df82dcbd92d02345a9
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/assignments/${id.classId}`, {
            headers : {
              'Authorization' : Cookies.get('authToken')
            }
          });
          console.log(response.data.assignments)
    
          if (response.status != 200) {
            throw new Error('Failed to fetch assignments');
          }
    
          // const data = await response.json();
          // console.log(response.data.assignments)
          setAssignments(response.data.assignments);
          // console.log(assignments)
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
    
      const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
          case 'pending':
            return 'bg-yellow-100 text-yellow-800';
          case 'submitted':
            return 'bg-green-100 text-green-800';
          case 'overdue':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };
    
      const isOverdue = (deadline) => {
        return new Date(deadline) < new Date();
      };
    
      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        );
      }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
            onClick={()=>{navigate(-1)}}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Classrooms
          </button>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Book className="mr-2 h-8 w-8 text-blue-600" />
          Assignments
        </h1>
        <p className="mt-2 text-gray-600">
          View and submit your programming assignments
        </p>
      </div>

      {/* Assignments List */}
      {assignments.length === 0 ? (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Assignments</h3>
          <p className="mt-1 text-gray-500">There are no assignments available yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      {/* <span
                        className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span> */}
                    </div>
                    
                    <p className="mt-2 text-gray-600">
                      {assignment.description}
                    </p>
                    
                    <div className="mt-4 flex items-center space-x-6">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-5 w-5 mr-1" />
                        <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-5 w-5 mr-1" />
                        <span>Time: {assignment.timeLimit} minutes</span>
                      </div>
                      {assignment.score !== undefined && (
                        <div className="flex items-center">
                          {assignment.score >= assignment.passingScore ? (
                            <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 mr-1 text-red-500" />
                          )}
                          <span>Score: {assignment.score}/{assignment.totalScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => window.location.href = `/assignment/${assignment.id}`}
                    className="ml-4 flex items-center text-blue-600 hover:text-blue-700"
                  >
                    {assignment.status.toLowerCase() === 'pending' ? 'Start' : 'View'} 
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClassroomAssignments