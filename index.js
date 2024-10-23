const express = require("express");
const { connectToMongoose } = require("./connection");
const urlRouter = require("./routes/url.router");
const app = express();
const PORT = 8000;

// Connection extablished with database
connectToMongoose("mongodb://localhost:27017/demo");

// middleware to parse json data
app.use(express.json());

// accces route to verify if server is running properly
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from server" });
});

// use urlRouter to access url table
app.use("/url", urlRouter);

// listen app on port 8000
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
