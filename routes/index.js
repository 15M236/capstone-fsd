var express = require('express');
var router = express.Router();

const {mongodb,dbName,dbUrl} = require('../config/dbConfig')
const {mongoose,usersModel,productModel,billModel,customerModel} = require('../config/dbSchema')
const {hashPassword,hashCompare,createToken,decodeToken,validateToken,adminGaurd} = require('../config/auth')
mongoose.connect(dbUrl)


module.exports = router;
