const mongoose = require('mongoose');
const dbConnect = ()=>{
    const DB_uri = process.env.MONGODB_URI
    mongoose.connect(DB_uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
        
        console.log("Connected to MongoDB");
    }).catch((error)=>{
        console.error(error);
    })
}
module.exports={dbConnect}