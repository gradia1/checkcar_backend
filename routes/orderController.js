// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const orderservice = require("../services/orderService.js");

router.get("/getAll",async (req,res)=>{
    try {
      const orders = await orderservice.getAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders'+err });
    }
  });

  router.get("/getAllStatus",async (req,res)=>{
    try {
      const orders = await orderservice.getAllStatus();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders status'+err });
    }
  });

  router.get("/getOrderById/:id",async (req,res)=>{
    try {
      const id = req.params.id;
      const orders = await orderservice.getById(id);

      console.log(orders)
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders'+err });
    }
  });


  router.put("/updateOrder/:orderid", async (req,res)=>{
    var orderid = req.params.orderid;
    try {
        const orders = await orderservice.updateOrder(orderid,req);
        res.json(orders);
      } catch (err) {
        res.json({status:500,error:err.message});
      }
  });

  router.delete("/deleteOrder/:orderid", async (req,res)=>{
    var orderid = req.params.orderid;
    try {
        const orders = await orderservice.deleteOrder(orderid);
        res.json(orders);
      } catch (err) {
        res.json({status:500,error:err.message});
      }

  });

  router.get("/getRunning", async (req,res)=>{
    try {
        const running = await orderservice.getRunning();
        res.json(running);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders'+err });
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