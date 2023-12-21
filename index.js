require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();

const port = process.env.PORT || 23234;
const dataBase = require('./mongodb')
const body_parser = require('body-parser');
const adminRoute = require('./Routers/admin.route')
const commentRoute = require('./Routers/comment.route')

app.listen(port, () => {
  console.log(`app running @ port ${port}`)
});
app.use(cors())
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
//connect to database
dataBase()
//Routes
app.use('/admin', adminRoute);
app.use('/comment', commentRoute);





