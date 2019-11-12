const express = require('express');
const { SERVICE } = require('./constants');
const logger = require('./util/logger');
const bodyPaser = require('body-parser');
const db = require('./queries');
const employeeRoutes = require('./routes/EmployeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const config = require('dotenv');
const app = express();


config.config()
app.use(bodyPaser.json());
app.use(
  bodyPaser.urlencoded({
    extended : false,
  })
);

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/departments', departmentRoutes);

app.get('/', (req, res) => {
  res.json({
    result: 'Hi Team!',
  });
});

app.listen(SERVICE.PORT, () => {
  logger.debug(`Service listening at ${SERVICE.PORT}`);
});

module.exports = app;

