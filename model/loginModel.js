// userModel.js
const db = require('../db');


// Fetch a single user by ID
const login = async (req) => {
  var rtValue;
  try {
    console.log("login model-params: " + JSON.stringify(req.body));
    params = [req.body.car_regis, req.body.otp_pin];
    const [rows] = await db.execute('SELECT count(*) value FROM login WHERE car_regis = ? and otp_pin = ?  ', params);
    //console.log("login model: " + JSON.stringify(rows));
    rtValue = { have : rows[0]["value"]};
    console.log("login model: " + JSON.stringify(rtValue));
    return rtValue;  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    throw new Error('Error fetching pro by ID');
  }
};


module.exports = {  login };
