// src/pages/AssignmentView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CodeCompiler from '../components/CodeCompiler';

const AssignmentView = () => {
  const { id } = useParams();
  
  return (
    <div>
      <CodeCompiler assignmentId={id} />
    </div>
  );
};

export default AssignmentView;