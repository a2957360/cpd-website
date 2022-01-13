import React from 'react';
//components
import InstructorForm from '../../components/Form/InstructorForm';
import PageHeader from '../../components/PageHeader';

const breadCrumb = [
  {
    title: 'Become An Intructor',
    path: '/resource/become-instructor/application',
  },
];

const InstructorApplication = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='content-container'>
        <PageHeader data={breadCrumb} />
        <div className='w-70 m-auto'>
          <InstructorForm />
        </div>
      </div>
    </div>
  );
};

export default InstructorApplication;
