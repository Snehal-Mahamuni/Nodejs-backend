const express=require('express');
const router=express.Router();
const Product=require('../models/Product');


router.post('/add',async(req,res)=>{
    try{
        const{productName,productPrice,productUnit,productDescription}=req.body
        const productExist=await Product.findOne({productName})
        if(productExist){
            res.json({
                status:false,
                message:'product is already exist'
            })
        }
        
        const productObj=new Product({productName,productPrice,productUnit,productDescription})
        await productObj.save()
        res.json({
            status:true,
            message:'product added succesfully'
        })
        
    }
    catch(err){
        res.json({
            status:false,
            message:`${err}`
        })
    }
})

router.get('/get',async(req,res)=>{
    try{
        const results=await Product.find()
        res.json({
            status:true,
            message:results
        })
        
    }
    catch(err){
        res.json({
            status:false,
            message:err
        })
    }
})

module.exports = router;