const db = require("../utils/db");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

exports.getSuggestion = async (req, res, next) => {
  try {
    const key = req.params.key;
    console.log(key);
    if (key) {
      const results = await db.getSuggestion(key);
      if (results.length > 0) {
        let data = [];
        for (let r of results) {
          data.push(r.cname);
        }
        res.status(200).json({
          sucess: "success",
          data: data,
        });
      } else {
        res.status(404).json({
          sucess: "false",
          data: [],
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.getData = async (req, res, next) => {
  try {
    const company = req.params.company;

    if (company) {
      const results = await db.getData(company);
      console.log(results);
      if (results.length > 0) {
        res.status(200).json({
          sucess: "success",
          data: results[0],
        });
      } else {
        res.status(404).json({
          sucess: "false",
          data: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
