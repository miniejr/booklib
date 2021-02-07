if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});


const db = mongoose.connection
db.on('error',error => console.log(error))
db.once('open',()=>{
    console.log('connected to mongoose');
})

const indexRouter = require('./routers/index');

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));



app.use('/',indexRouter);


app.listen(process.env.PORT || 3000);