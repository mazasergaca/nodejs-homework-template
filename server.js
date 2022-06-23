const app = require("./app");
const { connectMongo } = require("./db/connection");

const start = async () => {
  try {
    await connectMongo();
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.error("Server startup error", err);
      }
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Filed to launch application with error:", err.message);
  }
};

start();
