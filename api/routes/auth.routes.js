const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");
const Employee = require("../models/employee.model");

const router = new Router();

router.post('/register', async (req, res) => {
  const { login, password } = req.body;
  
  const existed = await Employee.findOne({ login });
  if (existed) return res.status(401).json({ message: 'Employee with this login is yet exist' })

  const hashed_password = await bcrypt.hash(password, 12);

  const employee = new Employee({ login, password: hashed_password });
  await employee.save();

  return res.status(201).json({ message: 'New employee has been created' });
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  if(!login.trim()){
    return res.status(401).json({ error: 'empty_login' });
  }
  if(!password.trim()){
    return res.status(401).json({ error: 'empty_password' });
  }

  const employee = await Employee.findOne({ login });
  if (!employee) return res.status(401).json({ error: 'employee_not_found' });

  const password_match = await bcrypt.compare(password, employee.password);
  if (!password_match) return res.status(401).json({ error: 'incorrect_password' });

  const token = jwt.sign(
    { employee_id: employee._id },
    config.get('jwt_key'),
    { expiresIn: '1d' }
  );

  return res.status(200).json({ token, employee_id: employee._id });
});

module.exports = router;