// userModel.js
const db = require('../db');
// Fetch all users
const getAllProduct = async () => {
  try {
    const [rows] = await db.execute('select * from car_detail');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching product');
  }
};

// Fetch a single user by ID
const getProductById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM product WHERE productid = ?', [id]);
    return rows[0];  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    throw new Error('Error fetching pro by ID');
  }
};
const getRunning = async (conn) => {
  try {
    sql = "select (runningid+1) as runningid from running where runningno=3";
    const [result] = await conn.execute(sql)
    return { runningid: result[0].runningid }
  }
  catch {
    throw new Error("can't get runnig");
  }
};

const addRunning = async (conn) => {
  try {
    sql = "update running set runningid = runningid + 1  where runningno=3";
    const [result] = await conn.execute(sql)
    return { status: 200, message: 'ok' }
  }
  catch (err) {
    throw new Error("can't get runnig");
  }
};
// Create a new user
const createProduct = async (conn, productObj) => {
  try {
    const [result] = await conn.execute('INSERT INTO product(productid, productname,catid,productprice,discount,stock,status,linkurl,detail,tags) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [productObj.body.productid,
      productObj.body.productname,
      productObj.body.catid,
      productObj.body.productprice,
      productObj.body.discount,
      productObj.body.stock,
      productObj.body.status,
      productObj.body.linkurl,
      productObj.body.detail,
      productObj.body.tags
    ]);

    return { id: result.insertId };
  } catch (err) {
    console.log(err.message)
    throw new Error("can't add new product");
  }
};

// Update a user
const updateProduct = async (productid, productObj) => {
  console.log("productobject")
  console.log(productObj)
  let sql = "";
  //console.log(productObj);
  try {
    const [result] = await db.execute('UPDATE product SET productname=?,catid=?,productprice=?,discount=?,stock=?,status=?'
      + ",imgcover=?,imgproduct1 = ?,imgproduct2=?,imgproduct3=?,detail=?,linkurl=?,tags=?"
      + ' WHERE productid = ?', [
      productObj.productname,
      productObj.catid,
      productObj.productprice,
      productObj.discount,
      productObj.stock,
      productObj.status,
      productObj.imgcover,
      productObj.imgproduct1,
      productObj.imgproduct2,
      productObj.imgproduct3,
      productObj.detail,
      productObj.linkurl,
      productObj.tags,
      productid])
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

const updateStatus = async (productid, productObj) => {
  try {

    const [result] = await db.execute('UPDATE product SET status = ? where productid=?', [ productObj.status,productid]);
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  } catch (err) {
    throw new Error('ไม่สามารถแก้ไขผู้ดูแลได้');
  }
};

// Delete a product
const deleteProduct = async (productid) => {
  try {
    const [result] = await db.execute('DELETE FROM product WHERE productid = ?', [productid]);
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('ไม่สามารถลบข้อมูลได้');
  }
};

module.exports = { getAllProduct, getProductById, createProduct, updateProduct,updateStatus,deleteProduct, getRunning, addRunning };
