module.exports = {
  development: {
    username: "root",
    password: "admin",
    database: "guest_manager",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "admin",
    database: "guest_manager",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect:  "mysql",
    port: process.env.DB_PORT
  }
}
