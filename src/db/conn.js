const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/User",{
  useCreateIndex:true,
  useFindAndModify:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("Connection Established!");
}).catch((err)=>{
  console.log("Connection Failed!");
})

