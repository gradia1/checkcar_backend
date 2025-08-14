// userModel.js
const db = require('../db');
const { GET_ALL_ORDER_DETAIL, GET_ORDER_BY_ORDER,UPDATE_ORDER_STATUS,GET_ORDER_STATUS } = require("../constant.js")

// Fetch all users
const getAllOrder = async () => {
  try {
    const sql = GET_ALL_ORDER_DETAIL;
    const [rows] = await db.execute(sql);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching order');
  }
};

const getOrderStatus = async () =>{
  try {
    const sql = GET_ORDER_STATUS;
    const [rows] = await db.execute(sql);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching order status');
  }
};

// Fetch a single user by ID
const getOrderByCon = async (id) => {
  try {
    sql = GET_ORDER_BY_ORDER;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    console.log(err.message);
    throw new Error('Error fetching order by ID');
  }
};

// Update a user
const updateOrder = async (orderid,orderObj) => {
  let sql = UPDATE_ORDER_STATUS;
  console.log("see all data");
  console.log(orderObj)
  console.log("id");
  console.log(orderid)
  console.log(sql);
  try {
    const [result] = await db.execute(sql,[
      orderObj.trackingid,
      orderObj.issendemail,
      orderObj.status,
      orderObj.detail,
      orderid,
    ])
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  } catch (err) {
    console.log(err.message)
    throw new Error('ไม่สามาถแก้ไขสินค้าได้');
  }
};

// Delete a product
const deleteOrder = async (productid) => {
  try {
    const [result] = await db.execute('DELETE FROM product WHERE productid = ?', [productid]);
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('ไม่สามารถลบข้อมูลได้');
  }
};

module.exports = { getAllOrder, getOrderByCon,getOrderStatus ,updateOrder, deleteOrder };
