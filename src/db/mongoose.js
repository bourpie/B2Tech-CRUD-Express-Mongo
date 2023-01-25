const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/plumitifs').then(() => {
    console.log("Connection to BD successfull")
}).catch((error) => {
    console.log("Something went wrong", error)
});