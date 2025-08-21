// userModel.js
const db = require('../db');


// Fetch a single user by ID
const login = async (req) => {
  var rtValue;
  try {
    console.log("login model-params: " + JSON.stringify(req.body));
    params = [req.body.car_regis, req.body.otp_pin];
    let sql = "SELECT cd.car_regis,cd.id,cd.status FROM car_detail cd INNER JOIN login lo on cd.car_regis = lo.car_regis where lo.car_regis = ? AND lo.otp_pin = ?";
    const [rows] = await db.execute(sql, params);
    const id = rows.length < 1 ? "0" : rows[0]["id"]
    const have = rows.length < 1 ? 0 : 1
    const status = rows.length < 1 ? 0 : rows[0]["status"]
    
    //console.log("login model: "  + JSON.stringify(rows));
    rtValue = { folder_name: id  ,have : have,stauts:status};
    console.log("login model: " + JSON.stringify(rtValue));
    return rtValue;  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    throw new Error('Error fetching pro by ID');
  }
};


module.exports = { login };
