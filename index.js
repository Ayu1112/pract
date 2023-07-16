const express=require('express');
const {connection} = require('./db');
const { postRouter } = require('./routes/posts.route');
const { userRouter } = require('./routes/user.route');
const cors=require("cors")


const app = express();
app.use(cors())
app.use(express.json());
app.use('/users',userRouter);
app.use('/post',postRouter);
require("dotenv").config();



app.listen(process.env.port,async()=>{
try {
    await connection
    console.log(`listening on port ${process.env.port}`);
    console.log("connected to db");
} catch (err) {
    console.log(err);
    console.log("something went wrong");
}
})