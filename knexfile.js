module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'fiecdev_museu'
    }
  },
  staging: {
    client: 'mysql',
    connection: {
      host: 'mysql18-farm10.kinghost.net',
      user: 'fiecdev14',
      password: 'd3vcaf385',
      database: 'fiecdev_museu'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'fiecdev_museu'
    }
  }
};