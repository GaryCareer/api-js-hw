const EmployeeController = require('../controllers/EmployeeController') ;
const express = require('express');
const router = express.Router();

router.get('/', EmployeeController.getAllEmployees);
router.post('/', EmployeeController.addEmployee);
router.get('/:id', EmployeeController.getAEmployee);
router.put('/:id', EmployeeController.updatedEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;