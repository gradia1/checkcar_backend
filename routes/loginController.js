// Requiring module
const app = require('express')
//mysql
var mysql = require('mysql2/promise')
// Initiate router
const router = app.Router();
// Handling GET Request
const external = require('../constant.js');
const loginService = require("../services/loginService.js");

/**
 * @swagger
 * 
 * /login/login:
 *   post:
 *     summary: Login System
 *     tags:
 *       - Login
 *     description: Login into sytem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               car_regis:
 *                 type: string
 *                 example: "7กร89911"
 *               otp_pin:
 *                 type: string
 *                 defalut: "1234"
 *                 example: "1234"
 *             required:
 *               - car_regis
 *               - otp_pin     
 *     responses:
 *       200:
 *         description: Lgin successfully but have must 1
 *       404:
 *         description: not found user
 *       500:
 *         description: System Error
 * 
 */

router.post("/login", async (req, res) => {
  console.log("login route: " + JSON.stringify(req.body))
  try {
    const login = await loginService.login(req);
    if (login.have == 0)
      res.status(404).json({ error: "ไม่พบข้อมูลทะเบียนหรือ otp หมดเวลา" })
    else
      res.json(login);
  } catch (err) {
    res.json({ status: 500, error: "can't login" });
  }

});


module.exports = router;