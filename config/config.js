require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "admin", 
    database: process.env.DB_NAME || ":memory:",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "sqlite",
    port: process.env.DB_PORT || 3306,
    storage: process.env.DB_DIALECT === "mysql" ? undefined : ":memory:"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "admin",
    database: process.env.DB_NAME || ":memory:",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "sqlite",
    port: process.env.DB_PORT || 3306,
    storage: process.env.DB_DIALECT === "mysql" ? undefined : ":memory:"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT
  }
}
