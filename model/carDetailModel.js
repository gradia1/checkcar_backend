// userModel.js
const db = require('../db');

const getRunning = async (conn) => {
  console.log("get running model")
  try {
    sql = "select (running_no+1) as running_no from running where running_id=1";
    const [result] = await conn.execute(sql)

    return { runningid: result[0].running_no }
  }
  catch {
    throw new Error("can't get runnig");
  }
};

const addRunning = async (conn) => {
  try {
    sql = "update running set running_no = running_no + 1  where running_id=1";
    const [result] = await conn.execute(sql)
    return { status: 200, message: 'ok' }
  }
  catch (err) {
    throw new Error("can't get runnig");
  }
};









module.exports = {getRunning, addRunning };
