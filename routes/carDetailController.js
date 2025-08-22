// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const carcetailservice = require("../services/carDetailService.js");

/**
 * @swagger
 * /carDetail/getRunning:
 *   get:
 *     summary: Get car detail
 *     tags:
 *       - CarDetail
 *     description: Get current running id
 *     responses:
 *       200:
 *         description: A car detail
  * /carDetail/create:
 *   post:
 *     summary: Create new car detail
 *     tags:
 *       - CarDetail
 *     description: Create a new car detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ref_id:
 *                 type: string
 *               car_regis:
 *                 type: string
 *               tel_regis:
 *                 type: string       
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               from_type:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               brand:
 *                 type: string
 *               year: 
 *                 type: string
 *               car_model:
 *                 type: string
 *               body_number:
 *                 type: string
 *             required:
 *               - ref_id
 *               - car_regis
 *               - tel_regis
 *               - start_date
 *               - end_date
 *               - from_type
 *               - name
 *               - surname
 *               - brand
 *               - year  
 *               - car_model
 *               - body_number              
 *     responses:
 *       200:
 *         description: Detail Car created successfully
 *       500:
 *         description: System Error
 * 
 * /carDetail/updatestatus/{id}:
 *   put:
 *     summary: For updating car status
 *     tags:
 *       - CarDetail
 *     description: Update the status by SK Plus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: 1
 *     responses:
 *       200:
 *         description: Car status updated successfully
 *       500:
 *         description: System Error
 */

router.put("/updatestatus/:id", async (req, res) => {
  try {
    console.log("updatestatus route: " + JSON.stringify(req.body))
    await carcetailservice.updatestatus(req);
    res.json({ status: 200, message: "แก้ไขเรียบร้อยแล้ว" });
  } catch (err) {
    console.log('err message is ' + err.message)
    //console.error("Error in updatestatus route:", err);
    res.status(500).json({ error: err.message });
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