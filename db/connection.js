const mongoose = require("mongoose");

const db = `mongodb+srv://${process.env.NAME_USER}:${process.env.PASSWORD_USER}@cluster0.jysjo.mongodb.net/${process.env.NAME_BASE}?retryWrites=true&w=majority`;

const connectMongo = async () => {
  return mongoose
    .connect(db)
    .then(() => console.log("Connected to DB"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = {
  connectMongo,
};
