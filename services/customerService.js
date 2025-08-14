const db = require('../db.js');
const customerModel = require("../model/customerModel.js");
const {getNewId} = require("../constant.js") 

const getAll = async () => {
  let retRes;
  try {
    retRes = await customerModel.getAllCustomer();

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
    retRes = await customerModel.getCustomerById(id);

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
    value = await customerModel.getRunning(conn);
    //let genId = getCustomerId(value.runningid);
    let genId = getNewId("CM",value.runningid,4);
  
    req.body.cusid = genId;
    retRes = await customerModel.createCustomer(conn, req);
    await customerModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, message: 'add new Customer' }
  }
  catch (err) {
    console.log(err.message);
    retRes = { status: 500, error: "ไม่สามารถเพิ่มลูกค้า" }
    conn.rollback();
  }
  finally {
    conn.release();
    return retRes;
  }

}


const updateCustomer = async (customerId, customerObj) => {
  let retRes;
  let value = customerObj.body;

  try {
    let row = await customerModel.updateCustomer(customerId, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const deleteCustomer = async (customerId) => {
  let retRes;
  try {
    let row = await customerModel.deleteCustomer(customerId);
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
    value = await customerModel.getRunning(conn);
    //let genId = getCustomerId(value.runningid)
    let genId = getNewId("CM",value.runningid,4);
    //await customerModel.addRunning(conn);
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

module.exports = { getAll,getById, create, getRunning, updateCustomer,deleteCustomer };
