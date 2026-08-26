import React from 'react';
import { useNavigate } from 'react-router-dom';
import LearningPaths from '../components/LearningPaths';

export default function LearningPathsPage() {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <LearningPaths
        onSelectCategory={(cat) => {
          navigate(`/courses?category=${encodeURIComponent(cat)}`);
        }}
      />
    </div>
  );
}
