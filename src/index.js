const express = require("express")
const mongoose = require("mongoose")
const route = require('./routes/route');

const app = express()
app.use(express.json());
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://aparna21:tpzmDVkZSc3mpMTf@cluster21.u69lmjr.mongodb.net/test",
{useNewUrlParser:true})
.then(() => console.log("MongoDb is Connected"))
.catch((err) => console.log(err)) 

 app.use = ('/',route)
 app.listen(3000, () => console.log("Express app running on Port 3000"))