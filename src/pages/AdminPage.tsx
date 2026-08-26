import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AdminPanel from '../components/AdminPanel';

export default function AdminPage() {
  const navigate = useNavigate();
  const {
    courses,
    exams,
    products,
    instructors,
    notices,
    usersList,
    reviews,
    comments,
    setCourses,
    setExams,
    setProducts,
    setInstructors,
    setNotices,
    setUsersList,
    setReviews,
    setComments,
  } = useApp();

  return (
    <AdminPanel
      courses={courses}
      exams={exams}
      products={products}
      instructors={instructors}
      notices={notices}
      usersList={usersList}
      reviews={reviews}
      comments={comments}
      onUpdateCourses={setCourses}
      onUpdateExams={setExams}
      onUpdateProducts={setProducts}
      onUpdateInstructors={setInstructors}
      onUpdateNotices={setNotices}
      onUpdateUsers={setUsersList}
      onUpdateReviews={setReviews}
      onUpdateComments={setComments}
      onBackToApp={() => navigate('/')}
    />
  );
}
