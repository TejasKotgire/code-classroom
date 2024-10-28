import React, { useState } from 'react';
import { Play, Terminal, Code2, FileInput, Send, Cookie } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie'

const Alert = ({ status, message, onClose }) => (
  <div
    className={`p-4 rounded-md ${
      status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    } flex justify-between items-center`}
  >
    <p>{message}</p>
    <button
      onClick={onClose}
      className="text-sm font-medium"
    >
      ×
    </button>
  </div>
);

const CodeCompiler = ({ assignmentId, studentId }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [useInput, setUseInput] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [lineCount, setLineCount] = useState(1);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    const lines = newCode.split('\n').length;
    setLineCount(lines);
  };

  const handleCompile = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.post('http://localhost:3000/api/compile', {
      //   code,
      //   language,
      //   input: useInput ? input : false,
      //   inputRadio: useInput,
      //   assignmentId
      // });
      // const response = await fetch('http://localhost:3000/compilecode', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
          // code,
          // language,
          // input: useInput ? input : false,
          // inputRadio : useInput,
          // assignmentId
      //   })})
      //   console.log(response)

        let response = await axios.post('http://localhost:3000/compilecode', {
          code,
          language,
          input: useInput ? input : false,
          inputRadio : useInput,
          assignmentId
        }, {
          headers : {
            Authorization : Cookies.get('authToken')
          }
        })
      setOutput(response.data.data);
    } catch (error) {
      setOutput('Error: Failed to compile code');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/submit-code', {
        code,
        language,
        assignmentId,
        studentId,
        submittedAt: new Date().toISOString()
      });
      setAlert({
        status: 'success',
        message: 'Code submitted successfully!'
      });
    } catch (error) {
      setAlert({
        status: 'error',
        message: 'Failed to submit code. Please try again.'
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Code2 className="h-8 w-8 mr-2 text-blue-600" />
        CodeClassroom
      </h1>

      {/* Code Editor Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Terminal className="h-5 w-5 mr-2" />
          Code Editor
        </h2>
        <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 pt-4 text-right pr-2 select-none">
            {[...Array(lineCount)].map((_, i) => (
              <div key={i + 1} className="text-gray-400 text-sm">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-64 pl-14 pr-4 py-4 font-mono text-sm focus:outline-none resize-none"
            placeholder="Write your code here..."
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compile with input</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="input"
                value="yes"
                checked={useInput}
                onChange={() => setUseInput(true)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="input"
                value="no"
                checked={!useInput}
                onChange={() => setUseInput(false)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
      </div>

      {useInput && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FileInput className="h-5 w-5 mr-2" />
            Input
          </h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 font-mono text-sm border border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your input here..."
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="mb-8 flex space-x-4">
        <button
          onClick={handleCompile}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Play className="h-5 w-5 mr-2" />
          {isLoading ? 'Compiling...' : 'Compile & Run'}
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Code'}
        </button>
      </div>

      {/* Alert */}
      {alert && (
        <div className="mb-8">
          <Alert
            status={alert.status}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Output Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Terminal className="h-5 w-5 mr-2" />
          Output
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Compiling...</span>
            </div>
          ) : output ? (
            <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
          ) : (
            <p className="text-gray-500">Output will appear here after compilation</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;