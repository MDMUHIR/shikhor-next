import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CoursesCatalog from '../components/CoursesCatalog';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const { courses, handleEnrollClick } = useApp();

  return (
    <CoursesCatalog
      courses={courses}
      initialCategory={categoryParam}
      onSelectCourse={(courseId) => {
        const found = courses.find((c) => c.id === courseId);
        navigate(`/courses/${found?.slug || courseId}`);
      }}
      onEnrollCourse={handleEnrollClick}
    />
  );
}
