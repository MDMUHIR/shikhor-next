import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorsSection from '../components/InstructorsSection';

export default function InstructorsPage() {
  const navigate = useNavigate();

  return (
    <InstructorsSection
      onSelectInstructorCourses={(instName) => {
        navigate(`/courses?category=${encodeURIComponent(instName)}`);
      }}
    />
  );
}
