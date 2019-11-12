const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});


const creatEmployee = (request,response) => {
  const {name,employeeId,depId,gender,phone,address,age} = request.body;
  // const updateAt = Date.now()
  pool.query('INSERT INTO employee (name,employeeId,depId,gender,phone,address,age) VALUES ($1,$2,$3,$4,$5,$6,$7)',[name,employeeId,depId,gender,phone,address,age],
    (error,results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Employee added with ID: ${results.insertId}`);
    });
};

const updateEmployee = (request,response) => {
  const id  = parseInt(request.params.id);
  const {name,employeeId,depId,gender,phone,address,age} = request.body;

  pool.query('UPDATE employee SET name = $1,employeeId = $2 WHERE id = $8',[name,employeeId,depId,gender,phone,address,age,id],
    (error,results) => {
      if (error) {
        throw error;
      }
      response.status(201).send('Employee added with ID: ${results.insertId}');
    });
}

module.exports = {creatEmployee,updateEmployee};