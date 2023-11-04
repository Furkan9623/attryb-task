const mongoose = require("mongoose")
require("dotenv").config()
// const connection = mongoose.connect(process.env.mongoURL)

// module.exports = {rs
//     connection
// }

const DB_CONNECT = async ()=>{
    const URL = process.env.mongoURL;
    return mongoose.connect(URL,{useNewUrlParser:true}).then((res)=>console.log(res.connection.db.databaseName)).catch((er)=>console.log(er))
    
}
   
module.exports = DB_CONNECT