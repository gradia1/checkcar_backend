const express = require('express');
const app = express();
const cors = require('cors');
const adminRouter = require("./routes/adminController");
const catRouter = require("./routes/catagoryController");
const carDetailRouter = require("./routes/carDetailController");
const loginRouter = require("./routes/loginController");
const orderRouter = require("./routes/orderController");
const uploadFileRouter = require("./routes/uploadContronller")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/restaurant', userRouter);
app.use("/admin",adminRouter);
app.use("/cat",catRouter);
app.use("/carDetail",carDetailRouter)
app.use("/login",loginRouter)
app.use("/order",orderRouter);
app.use("/upload",uploadFileRouter);
/*
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// ตั้งค่า swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation using Swagger in Node.js',
  },
  servers: [
    {
      url: 'http://localhost:3005',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // ไฟล์ที่มีการเขียน Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route ทดสอบ
app.get('/hello', (req, res) => {
  res.send('Hello Swagger!');
});
*/
app.get("/", (req, res) => {
    res.send("port is " + process.env.DB_PORT);
})

app.listen(3005, () => {
  console.log('Server is running on http://localhost:3005');
  //console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3005/api-docs');
});
