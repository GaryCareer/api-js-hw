const path  = require('path')
module.exports = {
    "config": path.resolve('./api/server/src/config', 'config.json'),
    "models-path": path.resolve('./api/server/src/models'),
    "seeders-path": path.resolve('./api/server/src/seeders'),
    "migrations-path": path.resolve('./api/server/src/migrations')
};
