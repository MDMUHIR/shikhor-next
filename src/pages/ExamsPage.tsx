import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ExamsSection from '../components/ExamsSection';

export default function ExamsPage() {
  const navigate = useNavigate();
  const { exams } = useApp();

  return (
    <ExamsSection
      exams={exams}
      onTakeExam={(exam) => {
        navigate(`/exams/${exam.id}`);
      }}
      onViewLeaderboard={(exam) => {
        navigate(`/exams/${exam.id}/leaderboard`);
      }}
      onViewResult={(exam) => {
        navigate(`/exams/${exam.id}/result`);
      }}
    />
  );
}
