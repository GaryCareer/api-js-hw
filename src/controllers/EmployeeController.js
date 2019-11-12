const EmployeeService = require('../services/EmployeeService');
const Util = require('../util/Utils');
const logger = require('../util/logger');

const util = new Util();

class EmployeeController {
  static async getAllEmployees(req, res) {
    try {
      const allEmployees = await EmployeeService.getAllEmployees(req.query);
      logger.debug('first');
      if (allEmployees.length > 0) {
        util.setSuccess(200, 'Employees retrieved', allEmployees);
      } else {
        util.setSuccess(200, 'No employee found');
      }
      console.log(200, 'Employees retrieved', allEmployees);
      return util.send(res);
    } catch (error) {
      console.log(200, 'Employees error', error);
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addEmployee(req, res) {
    logger.debug('add request');

    if (!req.body.name  ) {
      logger.debug('add failure without detail');
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newEmployee = req.body;
    logger.debug('add');
    try {
      const createdEmployee = await EmployeeService.addEmployee(newEmployee);
      logger.debug('add success');

      util.setSuccess(201, 'Employee Added!', createdEmployee);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      console.log(400, 'add Employees error', error);

      return util.send(res);
    }
  }

  static async updatedEmployee(req, res) {
    const alteredEmployee = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateEmployee = await EmployeeService.updateEmployee(id, alteredEmployee);
      if (!updateEmployee) {
        util.setError(404, `Cannot find employee with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Employee updated', updateEmployee);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAEmployee(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theEmployee = await EmployeeService.getAEmployee(id);
      if (!theEmployee) {
        util.setError(404, `Cannot find employee with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Employee', theEmployee);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteEmployee(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const employeeToDelete = await EmployeeService.deleteEmployee(id);

      if (employeeToDelete) {
        util.setSuccess(200, 'Employee deleted');
      } else {
        util.setError(404, `Employee with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = EmployeeController;
