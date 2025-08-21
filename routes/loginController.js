// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const loginService = require("../services/loginService.js");

  router.post("/login", async (req,res)=>{
    console.log("login route: " + JSON.stringify(req.body))
    try {
        const login = await loginService.login(req);
        res.json(login);
      } catch (err) {
        res.json({status:500,error:"can't login"});
      }

  });


module.exports = router;