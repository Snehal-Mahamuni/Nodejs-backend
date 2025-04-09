const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')

const User=require('./models/User')

const server=express();
server.use(cors());
server.use(bodyparser.json());


mongoose.connect('mongodb+srv://snehal:snehal%40123@snehal.eodlqm7.mongodb.net/').
then(()=>console.log("connect to database")).
catch(()=>console.log(err))


server.post('/register',async(req,res)=>{
    try{
        const{fullName,userName,age,password}=req.body
        
        const userObj=new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,
            message:'user successfully added'
        })
        
    }
    catch(err){
        res.json({
            status:false,
            message:`${err}`
        })
    }
})


server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})

        if(!userExist){
            return res.json({
                status:false,
                message:'user not found'
            })

        }
        if(password!==userExist.password){
            return res.json({
                status:false,
                message:"wrong password"
            })
            
        }

        res.json({
            status:false,
            message:"login successful"
        })
    }catch(err){
        res.json({
            status:false,
            message:(err)
        })
    }
})


server.listen(8055,()=>{
    console.log('server startd')
})

