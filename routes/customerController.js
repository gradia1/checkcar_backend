// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const customerService = require("../services/customerService.js");

router.get("/getAll",async (req,res)=>{
    try {
      const customers = await customerService.getAll();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch customers'+err });
    }
  });

  router.get("/getCustomerById/:id",async (req,res)=>{
    try {
      const id = req.params.id;
      const customers = await customerService.getById(id);
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch customers'+err });
    }
  });

  router.post("/create", async (req,res)=>{
    try {
        const customers = await customerService.create(req);
        res.json(customers);
      } catch (err) {
        res.json({status:500,error:"can't add customers"});
      }

  });

  router.put("/updateCustomer/:customerid", async (req,res)=>{
    var customerid = req.params.customerid;
    try {
        const prducts = await customerService.updateCustomer(customerid,req);
        res.json(prducts);
      } catch (err) {
        res.json({status:500,error:err.message});
      }
  });

  router.delete("/deleteCustomer/:customerid", async (req,res)=>{
    var customerid = req.params.customerid;
    try {
        const customers = await customerService.deleteCustomer(customerid);
        res.json(customers);
      } catch (err) {
        res.json({status:500,error:err.message});
      }

  });

  router.get("/getRunning", async (req,res)=>{
    try {
        const running = await customerService.getRunning();
        res.json(running);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers'+err });
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