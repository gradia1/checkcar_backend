// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const adminservice = require("../services/adminService.js");

router.get("/getAll",async (req,res)=>{
    try {
      const admins = await adminservice.getAll();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch admins'+err });
    }
  });

  router.get("/getAdminById/:id",async (req,res)=>{
    try {
      const id = req.params.id;
      const admins = await adminservice.getById(id);
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch admins'+err });
    }
  });

  router.post("/create", async (req,res)=>{
    try {
        const admins = await adminservice.create(req);
        res.json(admins);
      } catch (err) {
        console.log("get error");
        res.json({status:500,error:"can't add admin"});
      }

  });

  router.put("/updateAdmin/:adminid", async (req,res)=>{
    var adminid = req.params.adminid;
    //console.log(adminid);
    //console.log(req);
    try {
        const admins = await adminservice.updateAdmin(adminid,req);
        res.json(admins);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }
  });

  router.put("/updateStatus/:adminid", async (req,res)=>{
    var adminid = req.params.adminid;
    //console.log(adminid);
    //console.log(req);
    try {
        const admins = await adminservice.updateStatus(adminid,req);
        res.json(admins);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }
  });

  router.delete("/deleteAdmin/:adminid", async (req,res)=>{
    var adminid = req.params.adminid;
    try {
        const admins = await adminservice.deleteAdmin(adminid);
        res.json(admins);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }

  });

  router.get("/getRunning", async (req,res)=>{
    try {
        const running = await adminservice.getRunning();
        res.json(running);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins'+err });
      }

  });

  router.patch("/getLogin", async (req,res)=>{
    try {
      console.log(req.body);
        const running = await adminservice.getLogin(req);
        res.send({status:200,message:running});
      } catch (err) {
        console.log(err.message)
        res.send({status:500, error: err.message });
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