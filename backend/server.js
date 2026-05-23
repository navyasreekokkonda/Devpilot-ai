const express = require("express");
const cors = require("cors");

require("dotenv").config();

const githubRoutes =
require("./routes/githubRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("DevPilot AI Backend Running");
});

app.use("/api/github", githubRoutes);

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});