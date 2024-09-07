const express = require('express')
const app = express()
require("./connection/connection")
const auth = require("./routes/auth")
const cors = require('cors');
// const list = require("./routes/lists")

app.use(express.json())
app.use(cors())

app.use("/api/v1", auth);

// app.use("api/v2", list);



app.listen(1000, ()=>{
    console.log("server started on port 1000")
})