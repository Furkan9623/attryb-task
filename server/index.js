const express = require("express");

// dotenv to securely store values 
require("dotenv").config();
const cors = require("cors")
const app = express();
app.use(express.json());

app.use(cors())

// importing necessary things from other files
const { connection } = require("./config/db");
const { userRoute } = require("./route/userRoute");
const { inventoryRoute } = require("./route/inventoryRoute");
const { oemRoute } = require("./route/oemRoute");
const DB_CONNECT = require("./config/db");


// home route
app.get("/", async (req, res) => {
    res.status(200).send("Welcome toBackend Server");
})

// redirect routes
app.use("/users", userRoute)
app.use("/oemspecs", oemRoute)
app.use("/inventory", inventoryRoute)

DB_CONNECT();

app.listen(8000,()=>console.log("server run"));
