const db = require('../db.js');
const productModel = require("../model/carDetailModel.js");
const {getNewId} = require("../constant.js") 



const create = async (req) => {
  const conn = await db.getConnection();
  let retRes;
  try {
console.log("เข้า service")
    conn.beginTransaction();
    value = await carDetailModel.getRunning(conn);
    //let genId = getProductId(value.runningid);
    let genId = getNewId("PD",value.runningid,7);
    // req.body.productid = genId;
    // retRes = await productModel.createProduct(conn, req);
    //create new cardetail

    await carDetailModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, running_id: genId , message: 'add new product' }
  }
  catch (err) {
    retRes = { status: 500, error: "ไม่สามารถเพิ่มสินค้า" }
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
    value = await productModel.getRunning(conn);
    let genId =  getNewId("CHC",value.runningid,7)

    console.log("get running id: " + genId)
    //await productModel.addRunning(conn);
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

module.exports = { create, getRunning };
