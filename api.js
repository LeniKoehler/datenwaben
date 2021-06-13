// Relative dependencies --------------------------------------------------------------------------

const express = require("express")
const axios = require("axios")

// Absolute dependencies --------------------------------------------------------------------------

const pendler = require("./api/routes/pendler.route")

// Declarations -----------------------------------------------------------------------------------

const app = express()
app.use(express.static("app"));
app.use("/api/pendler", pendler)

app.listen(3000, () => console.log("Listening on 3000"))