const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

//route requests from server to userAPI
userApp = express.Router()

//parsing body to be accessed by request object
userApp.use(express.json())

//login handler
userApp.post('/login',expressAsyncHandler(async (request,response)=>{

    //retrieving user collection obj from app.js
    let userCollectionObj = request.app.get("userCollectionObj")
    //get userObjName
    let userCredObj = request.body
    //search user with username in DB
    let userDBObj = await userCollectionObj.findOne({username : {$eq : userCredObj.username}})
    //if user not found
    if(userDBObj==null)
        response.send({message:`Invalid user`});
    else{
        //comparing plain pw with hashed pw by converting plain pw to hashed->returns bool
        let status = await bcryptjs.compare(userCredObj.password,userDBObj.password)
        //if password doesn't match
        if(status==false)
            response.send({message:`Invalid password`})
        //password match
        else{
            //creating a token for authenticating login-->uses encryption as this token has to be verified in future
            //user credentials,encryption key,expiry time must be given as args 
            let token = jsonwebtoken.sign({username : userDBObj.username},'abcdef',{expiresIn:60})
            //send token to user,allow user access
            response.send({message:`Login successful`,payload:token,userObj:userDBObj});
        }
    }

}))

//register handler
userApp.post("/registeruser",expressAsyncHandler(async (request,response)=>{

    //retrieving user collection obj from app.js
    let userCollectionObj = request.app.get("userCollectionObj")
    //get newUser obj
    let newUserObj = request.body
    //search user in DB
    let userinDB = await userCollectionObj.findOne({username : {$eq : newUserObj.username}})
    //if user exists
    if(userinDB !== null)
        response.send({message:`Username already exists`})
    else{
        //hashing pw
        let hashedPassword = await bcryptjs.hash(newUserObj.password,6)
        //replacing pw with hashedpw
        newUserObj.password = hashedPassword
        //inserting user into DB
        await userCollectionObj.insertOne(newUserObj)
        //send response
        response.send({message:`User with username:${newUserObj.username} created`});
    }

}))

//exporting userApi
module.exports=userApp