import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
  });

  const [errors, setErrors] = useState({});

  

  useEffect(() => {
  setForm({
    name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    ...initialData
  });
}, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.position.trim()) errs.position = 'Position is required';
    if (!form.salary || isNaN(form.salary)) errs.salary = 'Salary must be a number';
    if (!form.date_of_joining) errs.date_of_joining = 'Joining date is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sending data to backend');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto' }}>
      {['name', 'email', 'position', 'salary', 'date_of_joining'].map(field => (
        <div key={field} style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
          </label>
          <input
            type={field === 'salary' ? 'number' : field === 'date_of_joining' ? 'date' : 'text'}
            name={field}
            value={form[field] || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          {errors[field] && <div style={{ color: 'red', marginTop: 5 }}>{errors[field]}</div>}
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          border: 'none',
          color: 'white',
          borderRadius: 5,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
