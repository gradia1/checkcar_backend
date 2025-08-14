// userModel.js
const db = require('../db');

// Fetch all users
const getAllAdmins = async () => {
  try {
    const [rows] = await db.execute('SELECT * FROM admins');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching users');
  }
};

// Fetch a single user by ID
const getAdminById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM admins WHERE adminid = ?', [id]);
    return rows[0];  // Return the first row (should be only 1 user if ID is unique)
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching user by ID');
  }
};
const getRunning = async (conn) => {
  try {
    sql = "select (runningid+1) as runningid from running where runningno=1";
    const [result] = await conn.execute(sql)
    console.log("test");
    console.log(result[0].runningid)
    return { runningid: result[0].runningid }
  }
  catch {
    throw new Error("can't get runnig");
  }
};

const addRunning = async (conn) => {
  try {
    sql = "update running set runningid = runningid + 1  where runningno=1";
    const [result] = await conn.execute(sql)
    console.log(result);
    //console.log(result[0].runningid)
    return { status: 200, message: 'ok' }
  }
  catch (err) {
    console.log(err)
    throw new Error("can't get runnig");
  }
};
// Create a new user
const createAdmin = async (conn, adminObj) => {
  try {
    const [result] = await conn.execute('INSERT INTO admins(adminid, adminname,email,status,password) VALUES (?,?,?,?,?)',
      [adminObj.body.adminid, adminObj.body.adminname, adminObj.body.email, adminObj.body.status, adminObj.body.password]);
    return { id: result.insertId };
  } catch (err) {
    console.log(err.message)
    throw new Error("can't add new admin");
  }
};

// Update a user
const updateAdmin = async (adminid, adminObj) => {
  console.log(adminObj);
  try {
    const [result] = await db.execute('UPDATE admins SET adminname = ?, email = ?, password=? WHERE adminid = ?', [adminObj.adminname, adminObj.email, adminObj.password, adminid]);
    console.log(result);
    let ret = result.affectedRows > 0;
    if (ret)
      return { status: 200, message: "แก้ไขเรียบร้อยแล้ว" }
    else
      return { status: 300, message: "ไม่มีการแก้ข้อมูล" }
  } catch (err) {
    throw new Error('ไม่สามารถแก้ไขผู้ดูแลได้');
  }
};

const updateStatus = async (adminid, adminObj) => {
  try {
    //console.log("เข้ามาถูก")
    const [result] = await db.execute('UPDATE admins SET status = ? where adminid=?', [adminObj.status, adminid]);
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
const deleteAdmin = async (adminid) => {
  try {
    const [result] = await db.execute('DELETE FROM admins WHERE adminid = ?', [adminid]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถลบข้อมูลได้');
  }
};

const getLogin = async (loginObj) => {
  try {
    console.log(loginObj);
    const [result] = await db.execute('select adminname from admins where email = ? and password = ? and status= 1', [loginObj.email, loginObj.password]);
    console.log(result);
    if (result.length == 0){
      throw new Error("ไม่มีข้อมูล")
    }
    return result[0];
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถดึงข้อมูล login ได้');
  }

}



module.exports = {getLogin, getAllAdmins, getAdminById, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRunning, addRunning };
