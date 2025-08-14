const db = require('../db.js');
const productModel = require("../model/productModel.js");
const {getNewId} = require("../constant.js") 

const getAll = async () => {
  let retRes;
  try {
    retRes = await productModel.getAllProduct();

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
    retRes = await productModel.getProductById(id);

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
console.log("เข้า service")
    conn.beginTransaction();
    value = await productModel.getRunning(conn);
    //let genId = getProductId(value.runningid);
    let genId = getNewId("PD",value.runningid,4);
    req.body.productid = genId;
    retRes = await productModel.createProduct(conn, req);
    await productModel.addRunning(conn);
    conn.commit();
    retRes = { status: 200, message: 'add new product' }
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

const updateProduct = async (productId, productObj) => {
  let retRes;
  let value = productObj.body;

  try {
    let row = await productModel.updateProduct(productId, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const updateStatus = async (productId, productObj) => {
  let retRes;
  let value = productObj.body;

  try {
    let row = await productModel.updateStatus(productId, value);
    retRes = {status:200,message:row.message}
    return retRes;
  }
  catch(err) {
    throw new Error(err.message);
  }
}

const deleteProduct = async (productId) => {
  let retRes;
  try {
    let row = await productModel.deleteProduct(productId);
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
    value = await productModel.getRunning(conn);
    let genId =  getNewId("PD",value.runningid,4)
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

module.exports = { getAll,getById, create, getRunning, updateProduct,updateStatus,deleteProduct };
