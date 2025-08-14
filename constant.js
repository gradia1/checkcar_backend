exports.PORT = '8082'
//detail value
exports.GET_MYSQL_DETAIL = { HOST: 'localhost', LOGIN: 'root', PASSWORD: '1234', DATABASE: 'checkcar ' }
//get message

//error

//get sql command
exports.GET_ALL_ORDER_DETAIL = "SELECT oh.orderid,cm.cusname,pd.productId,pd.productname,"
+ " oh.quantity,os.ordersname,os.ordersid, (oh.quantity * oh.price) as netorder,oh.trackingid, DATE(oh.date) as dateonly FROM"
+ " order_h oh inner join product pd on (oh.productid = pd.productId)"
+ " INNER JOIN orderstatus os on (oh.status = os.ordersid) INNER JOIN customer cm "
+ " on (oh.cusid = cm.cusid)";


exports.GET_ORDER_BY_ORDER = "SELECT oh.orderid,cm.cusname,pd.productId,pd.productname,oh.quantity,os.ordersname,"
+ " oh.status,oh.detail,oh.trackingid, (oh.quantity * pd.productprice) as netorder,oh.issendemail,cm.email FROM order_h oh"
+ " inner join product pd on (oh.productid = pd.productId)"
+ " INNER JOIN orderstatus os on (oh.status = os.ordersid) INNER JOIN customer cm"
+ " on (oh.cusid = cm.cusid) WHERE oh.orderid = ? ";

exports.UPDATE_ORDER_STATUS = "update order_h"
+ " set trackingid = ?,issendemail = ?,status = ? ,detail = ?"
+ " where orderid = ?"

exports.GET_ORDER_STATUS = "SELECT * FROM orderstatus"

exports.getNewId = function(pprefix,running,maxlenght) {
    const len4 = running.toString().length;
    const maxs = maxlenght;
    let genId = "";
    let prefix = pprefix
    var zero = "";
    for (let i = 0; i < maxs - len4; i++) {
        zero += "0";
    }
    return prefix + zero + running;
}

exports.addRunning = async function(conn,runningno) {
    var running = runningno;
    try {
      sql = `update running set runningid = runningid + 1  where runningno=${running}`;
      const [result] = await conn.execute(sql)
      return { status: 200, message: 'ok' }
    }
    catch (err) {
      throw new Error("can't get runnig");
    }
  };




