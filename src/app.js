const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 8000;

require("./db/conn");
const publicPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

app.use(express.json());

app.use(express.urlencoded({extended:false}))
console.log(templatePath);
app.set("view engine","hbs");


app.use(express.static(publicPath));

app.set("views",templatePath);

hbs.registerPartials(partialPath);

const router = require("./routers/router")

app.use(router);

app.listen(port,()=>{
    console.log(`App is listening at the port ${port}`);
})