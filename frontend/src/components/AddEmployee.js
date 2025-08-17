import React from 'react';
import EmployeeForm from './EmployeeForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
      console.log("sending data to backend");
      await axios.post(`${process.env.REACT_APP_API_URL}/employees`, data);
      navigate('/');
    } catch (error) {
      alert('Failed to add employee');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Add Employee</h2>
      <EmployeeForm 
       initialData={null}    
        onSubmit={handleAdd}
        />
    </div>
  );
};

export default AddEmployee;

