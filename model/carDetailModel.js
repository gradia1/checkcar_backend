// userModel.js
const db = require('../db');

const updatestatus = async (req) => {
sql = "UPDATE car_detail SET status = ?,updated=now() WHERE id = ?";

  try {
    const [result] = await db.execute(sql, [req.body.status, req.params.id]);
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  }
  catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถแก้ไขสถานะรถได้');
  }

}

const getRedandenCarRegis = async (conn,req) => {
  try {

    sql = "SELECT COUNT(*) value FROM `car_detail` cd WHERE cd.car_regis = ? and cd.end_date > now()"
    const params = [req.body.car_regis];
    const [result] = await conn.execute(sql, params);

    return {have_car_regis: result[0].value} 
  }
  catch (err) {
    console.error("Error in getRedandenCarRegis:", err);
    throw new Error("Failed to check car registration");
  }
}

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

const createCarDetail = async (conn,req,genId) => {

try {
    const sql = "INSERT INTO car_detail (id, ref_id, car_regis, tel_regis, created,updated,status,start_date,end_date,from_type,name,surname,brand,year,car_model,body_number)"
    + " VALUES (?, ?, ?, ?, now(),now(),?, ?, ?, ?,?,?,?,?,?,?)";
    const params = [genId, req.body.ref_id, req.body.car_regis, req.body.tel_regis,0,req.body.start_date,req.body.end_date,req.body.from_type,req.body.name,req.body.surname,req.body.brand,req.body.year,req.body.car_model,req.body.body_number];
    const [result] = await conn.execute(sql, params);
    return { status: 200, message: 'Car detail created successfully'};
  }
  catch (err) {
    console.error("Error creating car detail:", err);
    throw new Error("Failed to create car detail");
  }

}

const createLogin = async (conn, req) => {
  try {
    const sql = "INSERT INTO login(car_regis,otp_pin,expire)" 
    + " VALUES (?,'1234','2025-12-30')";
    const params = [req.body.car_regis];
    const [result] = await conn.execute(sql, params);
    return { status: 200, message: 'Login created successfully'};
  }
  catch (err) {
    console.error("Error creating car detail:", err);
    throw new Error("Failed to create car detail");
  }
}


module.exports = {getRunning, addRunning, createCarDetail, createLogin,getRedandenCarRegis,updatestatus};
