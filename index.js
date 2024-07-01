require("./model/DBconnect");
const express=require("express");
const DishRouter=require("./router/dishRouter");
const app=express();
const port=process.env.PORT||7700;
require("dotenv").config()

app.use(express.json());

// Route Apis

app.use("/api/v1/resturant/dish",DishRouter);

app.all("*", (req,res)=>{
    res.json({succses:false , mesaage:" That is Not Valid Route , Provide Valid Please"}) ;
});

app.listen(port,()=>{
    console.log(`listinig ${process.env.NODE_ENV} on port : ${port} ....`);
});