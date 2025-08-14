const express = require('express');
const app = express();
const cors = require('cors');
const adminRouter = require("./routes/adminController");
const catRouter = require("./routes/catagoryController");
const productRouter = require("./routes/productController");
const customerRouter = require("./routes/customerController");
const orderRouter = require("./routes/orderController");
const uploadFileRouter = require("./routes/uploadContronller")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/restaurant', userRouter);
app.use("/admin",adminRouter);
app.use("/cat",catRouter);
app.use("/product",productRouter)
app.use("/customer",customerRouter)
app.use("/order",orderRouter);
app.use("/upload",uploadFileRouter);

app.get("/", (req, res) => {
  res.send("test");
})

app.listen(3005, () => {
  console.log('Server is running on http://localhost:3005');
});
