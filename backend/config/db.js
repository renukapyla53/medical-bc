const mysql = require('mysql2');

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

if (process.env.DB_CA_CERT) {
  dbConfig.ssl = {
    ca: process.env.DB_CA_CERT
  };
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.log('DB connection failed:', err);
  } else {
    console.log('MySQL connected');
  }
});

module.exports = db;