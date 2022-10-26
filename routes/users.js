var express = require('express');
var router = express.Router();

const {mongodb,dbName,dbUrl} = require('../config/dbConfig')
const {mongoose,usersModel,productModel,billModel,customerModel} = require('../config/dbSchema')
const {hashPassword,hashCompare,createToken,decodeToken,validateToken,adminGaurd} = require('../config/auth')
mongoose.connect(dbUrl)

router.get('/' ,validateToken ,adminGaurd, async (req, res) => {
  res.send({
    statusCode : 200,
    message : "Valid Token"
  })
})

router.post('/signup', async(req, res)=> {
  try {
    let users = await usersModel.find({email:req.body.email})
    console.log(users)
    if(users.length > 0)
    {
      res.send({
        statusCode:400,
        message:"User Already Exists"
      })
    }
    else
    {
      let hashedPassword = await hashPassword(req.body.password)
      req.body.password = hashedPassword
      let user = await usersModel.create(req.body)
      res.send({
        statusCode:200,
        message:"User Creation Successfull!",
      })
    }

  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
});

router.post('/login', async(req,res)=>{
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if(user){
      let validatePwd = await hashCompare(req.body.password,user.password)
      if(validatePwd) {
        let token = await createToken({email:user.email,role:user.role})
        res.send({
          statusCode : 200 ,
          message : "Login successful",
          role : user.role ,
          email : user.email ,
          token
        })
      }
      else {
        res.send({
          statusCode : 401,
          message : "Invalid password"  
        })
      }
    }
    else {
      res.send({
        statusCode : 400 ,
        message : "user not found"
      })
    }
  } catch(error){

  }
})

router.delete('/delete/:id' ,validateToken,adminGaurd , async(req,res) => {
  console.log(req.params.id)
  try {
    let result = await productModel.deleteOne({_id:mongodb.ObjectId(req.params.id)},{
      headers : {

      }
    })
    if(result) {
      res.send({
        statusCode : 200 ,
        message : "Deleted successfully",
        result
      })
    }else {
      res.send({
        statusCode : 404,
        message : "Product not found"
      })
    }
    
  }catch(err){
    console.log(err)
    res.send({
      statusCode : 500 ,
      message : "Internal Server Error",
    })
  }
})

router.post('/add-products', validateToken ,adminGaurd, async(req,res) => {
  console.log(req.body)
  try {
    let product = await productModel.find({productId:req.body.productId})
    if(product.length > 0) {
      res.send({
        statusCode : 200 ,
        message : "Product already exists"
      })
    }else{
      let addProduct = await productModel.create(req.body)   
      res.send({
        statusCode:200,
        message:"Product added Successfull!",
      })
      
    }
  }catch(error){
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

router.post('/add-bill/' , async(req,res) => {
  console.log(req.body)
  try {
    let addBill = await billModel.create(req.body)
    res.send({
      statusCode:200,
      message:"Bill added Successfull!",
    })
  }
  catch(error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

router.get('/products', async(req, res) => {
  try {
    let products = await productModel.find()
    if(products) {
      res.send({
        statusCode : 200 ,
        message : "listed successfully" ,
        products
      })
    }else {
      res.send({
        statusCode : 404 ,
        message : "No products found" 
      })
    }
  }catch(error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

router.get('/get-bills',  validateToken,adminGaurd , async(req, res) => {
  try {
    let bills = await billModel.find()
    if(bills) {
      res.send({
        statusCode : 200 ,
        message : "listed successfully" ,
        bills ,

      })
    }else {
      res.send({
        statusCode : 404 ,
        message : "No Bills found" 
      })
    }
  }catch(error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

router.get('/get-bill/:email', async(req, res) => {
  try {
    let result = await billModel.find({email:req.params.email})
    if(result) {
      res.send({
        statusCode : 200 ,
        message : "listed successfully" ,
        result ,
      })
    }else {
      res.send({
        statusCode : 404 ,
        message : "No Bills found" 
      })
    }
  }catch(error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  }
})

module.exports = router;
