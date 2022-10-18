//express module returns a function(not object)
const express = require('express')
//express function returns express object that contains http server (app is a conventional name used)
const app = express()

//import mongodb and retrieve MongoClient
const mongoClient = require('mongodb').MongoClient

//mongoDB connection url
const DBurl = "mongodb+srv://sujith:sujith123@cluster0.vceyf.mongodb.net/?retryWrites=true&w=majority"

//connect with MongoDB server-->returns a promise
mongoClient.connect(DBurl)
.then((client)=>{

    //get dbObj from client
    let dbObj = client.db("Railway_Reservation")

    //create collection objs from dbObj
    let userCollectionObj = dbObj.collection("usercollection");

    //share collection objects to APIS
    app.set("userCollectionObj",userCollectionObj);

    console.log("DB Connection is success");
})
.catch(err=>console.log("Error in DB connection",err));

//importing userApi,productApi objects 
const userApp = require('./dbshackapp/APIS/userApi')

//using middleware mechanism, requests are transferred to the APIS using 
//imported userApi objects 
app.use("/user-api",userApp)

//invalid path handling middleware
app.use((request,response,next)=>{
    response.send({message:`path ${request.url} is invalid`})
})

//error handling middleware
app.use((error,request,response,next)=>{
    response.send({message:"Error occured",reason:`${error.message}`})
})

//assigning port number to the server obj
app.listen(4200,()=>{
    console.log(`server listening on port 4200..`)
})