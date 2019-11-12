const DepartmentService = require('../services/DepartmentService');
const Util = require('../util/Utils');
const logger = require('../util/logger');

const util = new Util();

class DepartmentController {
  static async getAllDepartments(req, res) {
    try {
      const allDepartments = await DepartmentService.getAllDepartments();
      if (allDepartments.length > 0) {
        util.setSuccess(200, 'Departments retrieved', allDepartments);
      } else {
        util.setSuccess(200, 'No department found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addDepartment(req, res) {
    logger.debug('add request');

    if (!req.body.name  ) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newDepartment = req.body;
    logger.debug('add');
    try {
      const createdDepartment = await DepartmentService.addDepartment(newDepartment);
      logger.debug('add success');

      util.setSuccess(201, 'Department Added!', createdDepartment);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      console.log(400, 'add Departments error', error);

      return util.send(res);
    }
  }

  static async updatedDepartment(req, res) {
    const alteredDepartment = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateDepartment = await DepartmentService.updateDepartment(id, alteredDepartment);
      if (!updateDepartment) {
        util.setError(404, `Cannot find department with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Department updated', updateDepartment);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getADepartment(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theDepartment = await DepartmentService.getADepartment(id);

      if (!theDepartment) {
        util.setError(404, `Cannot find department with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Department', theDepartment);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteDepartment(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const departmentToDelete = await DepartmentService.deleteDepartment(id);

      if (departmentToDelete) {
        util.setSuccess(200, 'Department deleted');
      } else {
        util.setError(404, `Department with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = DepartmentController;
