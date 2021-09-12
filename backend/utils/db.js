const mysql = require("mysql2");
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

exports.getSuggestion = async (key) => {
  const query = `select cname from nse where lower(cname) like lower('${key}%');`;
  const res = con
    .promise()
    .query(query)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};

exports.getData = async (company) => {
  const query = `select * from nse where cname = '${company}'`;
  const res = con
    .promise()
    .query(query)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return res;
};
