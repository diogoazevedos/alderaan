module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'alderaan',
    password: 'secret',
    database: 'alderaan',
  },
  migrations: {
    directory: './test/fixtures/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: './test/fixtures/seeds',
  },
};
