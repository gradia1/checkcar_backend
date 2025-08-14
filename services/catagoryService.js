const db = require('../db.js');
const catModel = require("../model/catagoryModel.js");

const getAll = async () => {
  let retRes;
  try {
    retRes = await catModel.getAllCats();

  } catch (err) {
    retRes = { error: err };
  }
  finally {
    return retRes;
  }
};

const getById = async (id) => {
  let retRes;
  try {
    retRes = await catModel.getCatById(id);

  } catch (err) {
    retRes = { error: err };
  }
  finally {
    return retRes;
  }
};

const create = async (req) => {
  const conn = await db.getConnection();
  let retRes;
  try {

    conn.beginTransaction();
    value = await catModel.getRunning(conn);
    console.log(value);
    let genId = getCatId(value.runningid);
    req.body.catid = genId;
    retRes = await catModel.createCatagory(conn, req);
    await catModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, message: 'add new cat' }
  }
  catch (err) {
    console.log(req.body);
    console.log(err.message);
    retRes = { status: 500, error: "ไม่สามารถเพิ่มหมวดหมู่" }
    conn.rollback();
  }
  finally {
    conn.release();
    return retRes;
  }

}
const getCatId = (running) => {
  const len4 = running.toString().length;
  const maxs = 4;
  let genId = "";
  let prefix = "CT"
  var zero = "";
  console.log(maxs - len4);
  for (let i = 0; i < maxs - len4; i++) {
    zero += "0";
    //console.log(zero);
  }
  return prefix + zero + running;
}

const updateCatagory = async (catid, catObj) => {
  let retRes;
  let value = catObj.body;
  try {
    let row = await catModel.updateCatagory(catid, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const updateStatus = async (catid, catObj) => {
  let retRes;
  let value = catObj.body;
  try {
    let row = await catModel.updateStatus(catid, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const deleteCatagory = async (catid) => {
  let retRes;
  try {
    let row = await catModel.deleteCatagory(catid);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const getRunning = async () => {
  const conn = await db.getConnection();
  let retRes;
  try {
    //conn.beginTransaction();
    value = await catModel.getRunning(conn);
    console.log(value);
    let genId = getCatId(value.runningid)
    //await adminModel.addRunning(conn);
    retRes = { status: 200, genId: genId }

    conn.commit();
  }
  catch (err) {
    console.log(err);
    //conn.rollback();
    retRes = { error: err };
  }
  finally {
    //conn.release();
    return retRes;
  }

}



module.exports = { getAll,getById, create, getRunning, updateCatagory,updateStatus,deleteCatagory };
