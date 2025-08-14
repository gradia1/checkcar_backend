// userModel.js
const db = require('../db');
// Fetch all users
const getAllCustomer = async () => {
  try {
    const [rows] = await db.execute('SELECT * from customer');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching Customer');
  }
};

// Fetch a single user by ID
const getCustomerById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM customer WHERE cusid = ?', [id]);
    return rows[0];  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    throw new Error('Error fetching pro by ID');
  }
};
const getRunning = async (conn) => {
  try {
    sql = "select (runningid+1) as runningid from running where runningno=4";
    const [result] = await conn.execute(sql)
    return { runningid: result[0].runningid }
  }
  catch {
    throw new Error("can't get runnig");
  }
};

const addRunning = async (conn) => {
  try {
    sql = "update running set runningid = runningid + 1  where runningno=4";
    const [result] = await conn.execute(sql)
    return { status: 200, message: 'ok' }
  }
  catch (err) {
    throw new Error("can't get runnig");
  }
};
// Create a new user
const createCustomer = async (conn, customerObj) => {
  console.log("im in model")
  try {
    const sql = "INSERT INTO customer(cusid,cusname,email,telnumber,address,provinceid,provincename,amphureid,amphurename,"
    + " tombonid,tombonname,zipcode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
    const [result] = await conn.execute(sql,
      [
      customerObj.cusid,
      customerObj.cusname,
      customerObj.email,
      customerObj.telnumber,
      customerObj.address,
      customerObj.provinceid,
      customerObj.provincename,
      customerObj.amphureid,
      customerObj.amphurename,
      customerObj.tambonid,
      customerObj.tambonname,
      customerObj.zipcode
    ]);

    return { id: result.insertId };
  } catch (err) {
    console.log(err.message);
    throw new Error("can't add new product");
  }
};

// Update a user
const updateCustomer = async (customerid, customerObj) => {
  console.log("see customerobj")
  console.log(customerObj);
  console.log(customerid);
  let sql = "UPDATE customer SET cusname=?,email=?,telnumber=?,address=?,provinceid=?,"
  + "provincename=?,amphureid=?,amphurename=?,tambonid=?,tambonname=?,zipcode=? "
  + " Where cusid=?";
  try {
    const [result] = await db.execute(sql
      , [
        customerObj.cusname,
        customerObj.email,
        customerObj.telnumber,
        customerObj.address,
        customerObj.provinceid,
        customerObj.provincename,
        customerObj.amphureid,
        customerObj.amphurename,
        customerObj.tambonid,
        customerObj.tambonname,
        customerObj.zipcode,
        customerid
    ])
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  } catch (err) {
    console.log(err.message);
    throw new Error('ไม่สามาถแก้ไขสินค้าได้');
  }
};

// Delete a product
const deleteCustomer = async (customerid) => {
  console.log("เข้ามาใน model");
  try {
    const [result] = await db.execute('DELETE FROM customer WHERE cusid = ?', [customerid]);
    return result.affectedRows > 0;
  } catch (err) {
    console.log(err.message)
    throw new Error('ไม่สามารถลบข้อมูลได้');
  }
};

module.exports = { getAllCustomer, getCustomerById, createCustomer, updateCustomer, deleteCustomer, getRunning, addRunning };
