// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const carcetailservice = require("../services/carDetailService.js");

router.put("/updatestatus/:id", async (req, res) => {
  try {
    console.log("updatestatus route: " + JSON.stringify(req.body))
    await carcetailservice.updatestatus(req);
    res.json({ status: 200, message: "แก้ไขเรียบร้อยแล้ว" });
  } catch (err) {
    console.error("Error in updatestatus route:", err);
    res.status(500).json({ error: 'ไม่สามารถแก้ไขสถานะรถได้' });
  }
});


router.post("/create", async (req, res) => {
  try {
    const cardetail = await carcetailservice.create(req);
    res.json(cardetail);
  } catch (err) {
    res.json({ status: 500, error: "can't add cardetail" });
  }

});

router.get("/getRunning", async (req, res) => {
  try {
    const running = await carcetailservice.getRunning();
    console.log(running)
    res.json(running);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch running' + err });
  }

});

module.exports = router;