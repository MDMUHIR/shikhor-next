import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LearnDashboard from '../components/LearnDashboard';

export default function LearnPage() {
  const navigate = useNavigate();
  const { user, courses, setActiveLiveClassCourse } = useApp();

  const enrolledCourses = courses.filter((c) =>
    user?.enrolledCourseIds.includes(c.id)
  );

  return (
    <LearnDashboard
      user={user}
      enrolledCourses={enrolledCourses}
      onNavigateCourses={() => navigate('/courses')}
      onNavigateExams={() => navigate('/exams')}
      onNavigateProfile={() => navigate('/profile')}
      onSelectCourse={(courseId) => {
        const found = courses.find((c) => c.id === courseId);
        navigate(`/learn/${found?.slug || courseId}`);
      }}
      onOpenLiveClass={(course) => {
        navigate(`/learn/${course.slug || course.id}`);
      }}
    />
  );
}
