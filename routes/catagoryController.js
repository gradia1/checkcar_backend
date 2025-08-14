// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const catservice = require("../services/catagoryService.js");

router.get("/getAll",async (req,res)=>{
    try {
      const cats = await catservice.getAll();
      res.json(cats);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cats'+err });
    }
  });

  router.get("/getCatById/:id",async (req,res)=>{
    try {
      const id = req.params.id;
      const cats = await catservice.getById(id);
      res.json(cats);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cats'+err });
    }
  });

  router.post("/create", async (req,res)=>{
    try {
        const cats = await catservice.create(req);
        res.json(cats);
      } catch (err) {
        console.log("get error");
        res.json({status:500,error:"can't add admin"});
      }

  });

  router.put("/updateCat/:catid", async (req,res)=>{
    var catid = req.params.catid;
    //console.log(adminid);
    //console.log(req);
    try {
        const cats = await catservice.updateCatagory(catid,req);
        res.json(cats);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }
  });

  router.put("/updateStatus/:catid", async (req,res)=>{
    var catid = req.params.catid;
    try {
        const cats = await catservice.updateStatus(catid,req);
        res.json(cats);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }
  });

  router.delete("/deleteCat/:catid", async (req,res)=>{
    var catid = req.params.catid;
    //console.log(adminid);
    //console.log(req);
    try {
        const cats = await catservice.deleteCatagory(catid);
        res.json(cats);
      } catch (err) {
        console.log("get error");
        console.log(err.message);
        res.json({status:500,error:err.message});
      }

  });

  router.get("/getRunning", async (req,res)=>{
    try {
        const running = await catservice.getRunning();
        res.json(running);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cats'+err });
      }

  });

module.exports = router;