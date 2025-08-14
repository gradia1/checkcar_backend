const db = require('../db.js');
const adminModel = require("../model/adminModel.js");

const getAll = async () => {
  let retRes;
  try {
    retRes = await adminModel.getAllAdmins();

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
    retRes = await adminModel.getAdminById(id);

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
    value = await adminModel.getRunning(conn);
    console.log(value);
    let genId = getAdminId(value.runningid);
    req.body.adminid = genId;
    retRes = await adminModel.createAdmin(conn, req);
    await adminModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, message: 'add new admin' }
  }
  catch (err) {
    console.log(req.body);
    console.log(err.message);
    retRes = { status: 500, error: "ไม่สามารถเพิ่มผู้ดูแล" }
    conn.rollback();
  }
  finally {
    conn.release();
    return retRes;
  }

}
const getAdminId = (running) => {
  const len4 = running.toString().length;
  const maxs = 4;
  let genId = "";
  let prefix = "AD"
  var zero = "";
  console.log(maxs - len4);
  for (let i = 0; i < maxs - len4; i++) {
    zero += "0";
    console.log(zero);
  }
  return prefix + zero + running;
}

const updateAdmin = async (adminid, adminObj) => {
  let retRes;
  console.log("test");
  let value = adminObj.body;
  console.log(value);
  try {
    let row = await adminModel.updateAdmin(adminid, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const updateStatus = async (adminid, adminObj) => {
  let retRes;
  let value = adminObj.body;
  console.log(value);
  try {
    let row = await adminModel.updateStatus(adminid, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const deleteAdmin = async (adminid) => {
  let retRes;
  try {
    let row = await adminModel.deleteAdmin(adminid);
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
    conn.beginTransaction();
    value = await adminModel.getRunning(conn);
    console.log(value);
    let genId = getAdminId(value.runningid)
    //await adminModel.addRunning(conn);
    retRes = { status: 200, genId: genId }

    conn.commit();
  }
  catch (err) {
    console.log(err);
    conn.rollback();
    retRes = { error: err };
  }
  finally {
    conn.release();
    return retRes;
  }

}

const getLogin = async (loginObj) => {
  let value = loginObj.body;
  //console.log(value);
  let retRes;
  try {
    retRes =  await adminModel.getLogin(value)
    return(retRes);

  } catch (err) {
    throw new Error(err.message);
  }

};



module.exports = {getLogin, getAll,getById, create, getRunning, updateAdmin,updateStatus,deleteAdmin };
