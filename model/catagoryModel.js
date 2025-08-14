// userModel.js
const db = require('../db');
// Fetch all users
const getAllCats = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM catagory');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching f');
  }
};

// Fetch a single user by ID
const getCatById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM catagory WHERE catid = ?', [id]);
    return rows[0];  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching cat by ID');
  }
};
const getRunning = async (conn) => {
  try {
    sql = "select (runningid+1) as runningid from running where runningno=2";
    const [result] = await conn.execute(sql)
    console.log("test");
    console.log(result[0].runningid)
    return {runningid:result[0].runningid}
  }
  catch {
    throw new Error("can't get runnig");
  }
};

const addRunning = async (conn) => {
  try {
    sql = "update running set runningid = runningid + 1  where runningno=2";
    const [result] = await conn.execute(sql)
    console.log(result);
    //console.log(result[0].runningid)
    return {status:200,message:'ok'}
  }
  catch(err) {
    console.log(err)
    throw new Error("can't get runnig");
  }
};
// Create a new user
const createCatagory = async (conn, catObj) => {
  try {
    const [result] = await conn.execute('INSERT INTO catagory(catid, catname,status) VALUES (?,?,?)',
      [catObj.body.catid,catObj.body.catname,catObj.body.status]);
    return { id: result.insertId };
  } catch (err) {
    console.log(err.message)
    throw new Error("can't add new catagory");
  }
};

// Update a user
const updateCatagory = async (catid, catObj) => {
  try {
    const [result] = await db.execute('UPDATE catagory SET catname = ?  WHERE catid = ?', [catObj.catname,catid]);
    console.log(result);
    let ret = result.affectedRows > 0;
    if (ret)
      return {status:200,message : "แก้ไขเรียบร้อยแล้ว"}
    else
      return {status:300,message:"ไม่มีการแก้ข้อมูล"}
  } catch (err) {
    console.log(err);
    throw new Error('ไม่สามารถแก้ไขหมวดหมู่ได้');
  }
};

const updateStatus = async (catid, catObj) => {
  try {
    //console.log("เข้ามาถูก")
    const [result] = await db.execute('UPDATE catagory SET status = ? where catid=?', [ catObj.status,catid]);
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  } catch (err) {
    console.log(err.message)
    throw new Error('ไม่สามารถแก้ไขผู้ดูแลได้');
  }
};

// Delete a user
const deleteCatagory = async (catid) => {
  try {
    const [result] = await db.execute('DELETE FROM catagory WHERE catid = ?', [catid]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถลบข้อมูลได้');
  }
};

module.exports = { getAllCats, getCatById, createCatagory, updateCatagory,updateStatus ,deleteCatagory,getRunning,addRunning };
