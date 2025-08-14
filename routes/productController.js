// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const productservice = require("../services/productService.js");

router.get("/getAll",async (req,res)=>{
    try {
      const products = await productservice.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products'+err });
    }
  });

  router.get("/getProductById/:id",async (req,res)=>{
    try {
      const id = req.params.id;
      const products = await productservice.getById(id);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products'+err });
    }
  });

  router.post("/create", async (req,res)=>{
    try {
      console.log("am here")
        const products = await productservice.create(req);
        res.json(products);
      } catch (err) {
        res.json({status:500,error:"can't add products"});
      }

  });

  router.put("/updateProduct/:productid", async (req,res)=>{
    var productid = req.params.productid;
    try {
        const prducts = await productservice.updateProduct(productid,req);
        res.json(prducts);
      } catch (err) {
        res.json({status:500,error:err.message});
      }
  });

  router.put("/updateStatus/:productid", async (req,res)=>{
    var productid = req.params.productid;
    try {
        const prducts = await productservice.updateStatus(productid,req);
        res.json(prducts);
      } catch (err) {
        res.json({status:500,error:err.message});
      }
  });

  router.delete("/deleteProduct/:productid", async (req,res)=>{
    var productid = req.params.productid;
    try {
        const products = await productservice.deleteProduct(productid);
        res.json(products);
      } catch (err) {
        res.json({status:500,error:err.message});
      }

  });

  router.get("/getRunning", async (req,res)=>{
    try {
        const running = await productservice.getRunning();
        res.json(running);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products'+err });
      }

  });

//connect to database
// var con = mysql.createConnection({
//     host: external.GET_MYSQL_DETAIL.HOST,
//     user: external.GET_MYSQL_DETAIL.LOGIN,
//     port: 3306,
//     password: external.GET_MYSQL_DETAIL.PASSWORD,
//     database: external.GET_MYSQL_DETAIL.DATABASE
// })

// var con = mysql.createPool({
//     host: external.GET_MYSQL_DETAIL.HOST,
//     user: external.GET_MYSQL_DETAIL.LOGIN,
//     password: external.GET_MYSQL_DETAIL.PASSWORD,
//     database: external.GET_MYSQL_DETAIL.DATABASE,
//     port: 3306

module.exports = router;