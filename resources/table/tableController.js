const db = require("../../data/dbConfig");

exports.createTable = async (req, res) => {
  try {
    const data = await db("table")
      .returning("*")
      .insert(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

exports.getTable = async (req, res) => {
  try {
    //const data = await db("table").select("*");
    res.json({ data: "hey" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Not found" });
  }
};
