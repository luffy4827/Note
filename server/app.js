const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/connection");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserApi = require("./routes/user");
const NoteApi = require("./routes/note");

app.use("/api/v1", UserApi);
app.use("/api/v2", NoteApi);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
