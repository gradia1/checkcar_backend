const db = require('../db.js');
const carDetailModel = require("../model/carDetailModel.js");
const { getNewId } = require("../constant.js")


const updatestatus = async (req) => {
  //console.log("updatestatus service")
  try {
    if (!req.body.status || !req.params.id) {
      throw new Error("Invalid request data");
    }

    await carDetailModel.updatestatus(req);

  }
  catch (err) {
    //console.error("Error in updatestatus service:", err);
    throw err;
  }
}

const create = async (req) => {
  const conn = await db.getConnection();
  let have_car_regis = 0;
  let retRes;
  try {
    //console.log("เข้า service")
    conn.beginTransaction();

    have_car_regis = await carDetailModel.getRedandenCarRegis(conn, req);

    if (have_car_regis.have_car_regis > 0) {
      throw new Error("you have car regis already");
    }

    value = await carDetailModel.getRunning(conn);
    let genId = getNewId("CHC", value.runningid, 7);

    retRes = await carDetailModel.createCarDetail(conn, req, genId);
    let retRes1 = await carDetailModel.createLogin(conn, req);

    console.log("retRes1: " + JSON.stringify(retRes1))

    await carDetailModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, running_id: genId, message: 'add new car detail' }
  }
  catch (err) {
    errmsg = have_car_regis.have_car_regis == 1 ? "คุณมีทะเบียนรถนี้แล้ว" : "ไม่สามารถเพิ่มข้อมูลรถได้ "
    retRes = { status: 500, err: errmsg };
    conn.rollback();
  }
  finally {
    conn.release();
    return retRes;
  }

}


const getRunning = async () => {
  const conn = await db.getConnection();
  console.log("get running service")
  let retRes;
  try {
    conn.beginTransaction();
    value = await carDetailModel.getRunning(conn);
    let genId = getNewId("CHC", value.runningid, 7)

    console.log("get running id: " + genId)
    //await carDetailModel.addRunning(conn);
    retRes = { status: 200, genId: genId }

    conn.commit();
  }
  catch (err) {
    conn.rollback();
    retRes = { error: err };
  }
  finally {
    conn.release();
    return retRes;
  }

}

module.exports = { create, getRunning,updatestatus };
