const db = require('../db.js');
const loginModel = require("../model/loginModel.js");
const {getNewId} = require("../constant.js") 


const login = async (req) => {
  let retRes;

  try {
    let row = await loginModel.login(req);
    retRes = {status:200,have:row.have}
    return retRes;
  }
  catch(err) {
    console.error("Error in login service:", err);
    throw new Error(err.message);
  }
}


module.exports = { login };
