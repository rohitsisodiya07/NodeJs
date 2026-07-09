const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const os = require("os");
const cron = require("node-cron");

// cron.schedule("* * * * * *", () => {
//   console.log(
//     "This message prints every Second:",
//     new Date().toLocaleTimeString(),
//   );
// });

// console.log(os.platform()); // win32
// console.log(os.arch()); // x64
// console.log(os.hostname()); // Computer name
// console.log(os.release()); // Version Information
// console.log(os.freemem()); // Free memory in bytes
// console.log(os.totalmem()); // Total memory in bytes
// console.log(os.cpus()); // CPU information
// console.log(os.homedir()); //
// console.log(os.uptime()); //
// console.log(os.userInfo()); //User Information

require("dotenv").config();
// console.log(process.env.EMAIL);
// console.log(process.env.APP_PASSWORD);

const app = express();
const port = 4000;

app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const studentRoute = require("./Route/studentRoute");

const signupRoute = require("./Route/signupRoute");

// const roleWiseRoute = require("./Route/roleWiseRoute");

const postRoute = require("./Route/studentroleRoute");

app.use("/student", studentRoute);

app.use("/userSignup", signupRoute);

// app.use("/role", roleWiseRoute);

app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.send("Server is Running.......");
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
