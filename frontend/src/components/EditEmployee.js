import React, { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employees/${id}`)
      .then(res => setInitialData(res.data))
      .catch(err => alert('Failed to load employee'));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/employees/${id}`, data);
      navigate('/');
    } catch (error) {
      alert('Failed to update employee');
      console.error(error);
    }
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Edit Employee</h2>
      <EmployeeForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditEmployee;

