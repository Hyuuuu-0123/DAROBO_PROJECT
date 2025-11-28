const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MyPass123!",
  database: "robot_delivery"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("MySQL connected!");
});

module.exports = db;
