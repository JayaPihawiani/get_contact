const express = require("express");
const dotenv = require("dotenv").config();
const contactRouter = require("./router/contactRouter");
const errorHandler = require("./middleware/errorHandler");
const connectionDB = require("./config/dbConnection");
const userRouter = require("./router/userRouter");

connectionDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contact", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);
app.get("/", (req, res) => res.send("Welcome to the Get-Contact API!"));
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
