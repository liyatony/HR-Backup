const express = require("express");
const app = new express();
require("dotenv").config();
const port = process.env.PORT;
require("./config/bd_employee");
const cors = require("cors");
app.use(cors());

app.use("/uploads", express.static("uploads"));

const employee_route = require("./routes/admin_act");
app.use("/emp", employee_route);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port,(req,res)=>{
  console.log(`server running on port ${port}`);
  

})

