const DepartmentController = require('../controllers/DepartmentController') ;
const express = require('express');
const router = express.Router();

// router.get('/', DepartmentController.getAllDepartments);
router.post('/', DepartmentController.addDepartment);
// router.get('/:id', DepartmentController.getADepartment);
router.put('/:id', DepartmentController.updatedDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);

module.exports = router;