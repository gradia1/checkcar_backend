const db = require('../db.js');
const orderModel = require("../model/orderModel.js");
const {getNewId} = require("../constant.js") 

const getAll = async () => {
  let retRes;
  try {
    retRes = await orderModel.getAllOrder();

  } catch (err) {
    retRes = { error: err };
  }
  finally {
    return retRes;
  }
};

const getAllStatus = async () => {
  let retRes;
  try {
    retRes = await orderModel.getOrderStatus();

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
    retRes = await orderModel.getOrderByCon(id);

  } catch (err) {
    retRes = { error: err.message };
  }
  finally {
    return retRes;
  }
};

const updateOrder = async (orderid, orderObj) => {
  let retRes;
  let value = orderObj.body;

  try {
    let row = await orderModel.updateOrder(orderid, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const deleteOrder = async (orderid) => {
  let retRes;
  try {
    let row = await orderModel.deleteOrder(orderid);
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
    value = await orderModel.getRunning(conn);
    let genId =  getNewId("PD",value.runningid,4)
    //await orderModel.addRunning(conn);
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

module.exports = { getAll,getById,getAllStatus,getRunning, updateOrder,deleteOrder };
