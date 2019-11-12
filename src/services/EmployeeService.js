const database = require('../models');
const logger = require('../util/logger');
var employee = database.Employee;
var department = database.Department;

class EmployeeService {
    static async getAllEmployees(params){
        console.log(params)
        var page = 1
        if (params.page){
            page = params.page
        }
        var where = {};
        if (params.name){
            where["name"] = params.name
        }
        if (params.number){
            where["number"] = params.number
        }
        if (params.age){
            where["age"] = params.age
        }
        try{
            return await employee.findAll({
                where,
                include:[
                    {
                        model: department
                    }
                ],
                limit: 10,
                offset: 10 * (page-1)
            });
        }catch (error) {
            throw error;
        }
    }

    static async addEmployee(newEmployee){
        logger.debug(`------${employee}`)

        try{
            return await employee.create(newEmployee)
        }catch (error) {
            throw error;
        }
    }

    static async updateEmployee(id, updateEmployee){
        try{
            const employeeToUpdate = await database.Employee.findOne({
                where: { id: Number(id) }
            });
            
            if (employeeToUpdate) {
                await database.Employee.update(updateEmployee, { where : { id: Number(id) }});
                return updateEmployee;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getAEmployee(id){
        try {
            const theEmployee = await database.Employee.findOne({
                where: { 
                    id: Number(id)
                 },
                include:[
                    {
                        model: department
                    }
                ]
            });

            return theEmployee;
        } catch (error) {
            throw error;
        }
    }

    static async deleteEmployee(id){
        try {
            const employeeToDelete = await database.Employee.findOne({
                where: { id: Number(id) }
            });

            if (employeeToDelete) {
                const deletedEmployee = await database.Employee.destroy({
                    where: { id: Number(id) }
                });
                return deleteEmployee;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmployeeService;