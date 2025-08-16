const Employee = require('../models/Employee');

// POST /api/employees
exports.createEmployee = async (req, res) => {
  try {
      console.log('Request body:', req.body);
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
      console.error('Create employee error:', err);
    res.status(400).json({ error: err.message });
  }
};

// GET /api/employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/employees/:id
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/employees/:id
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    await employee.update(req.body);
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const rowsDeleted = await Employee.destroy({ where: { id: req.params.id } });
    if (!rowsDeleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
