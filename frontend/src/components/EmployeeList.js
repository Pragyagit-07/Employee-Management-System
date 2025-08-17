import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
      setEmployees(res.data);
    } catch (error) {
      alert('Failed to fetch employees');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      fetchEmployees();
    } catch {
      alert('Failed to delete employee');
    }
  };

  // Filter and search logic
  const filtered = employees
    .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
    .filter(emp => emp.position.toLowerCase().includes(filterPosition.toLowerCase()));

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Employee List</h2>

      <div style={{ marginBottom: 20, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, width: 200, borderRadius: 5, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Filter by position"
          value={filterPosition}
          onChange={e => setFilterPosition(e.target.value)}
          style={{ padding: 8, width: 200, borderRadius: 5, border: '1px solid #ccc' }}
        />
        <Link to="/add">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add Employee
          </button>
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
          <tr>
            {['Name', 'Email', 'Position', 'Salary', 'Date of Joining', 'Actions'].map(th => (
              <th key={th} style={{ padding: 10, border: '1px solid #ddd' }}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayed.map(emp => (
            <tr key={emp.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 10 }}>{emp.name}</td>
              <td style={{ padding: 10 }}>{emp.email}</td>
              <td style={{ padding: 10 }}>{emp.position}</td>
              <td style={{ padding: 10 }}>{emp.salary}</td>
              <td style={{ padding: 10 }}>{emp.date_of_joining}</td>
              <td style={{ padding: 10 }}>
                <Link to={`/edit/${emp.id}`}>
                  <button style={{ marginRight: 8, padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(emp.id)}
                  style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 3 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {displayed.length === 0 && (
            <tr>
              <td colSpan="6" style={{ padding: 10, textAlign: 'center' }}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        {[...Array(totalPages).keys()].map(i => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: '6px 12px',
              margin: '0 5px',
              borderRadius: 5,
              border: '1px solid #007bff',
              backgroundColor: page === i + 1 ? '#007bff' : 'white',
              color: page === i + 1 ? 'white' : '#007bff',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
