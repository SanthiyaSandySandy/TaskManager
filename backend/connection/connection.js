const mongoose = require('mongoose');

const connection = async(req, res) => {
   try {
    await mongoose.connect("mongodb+srv://Sandhiyammvk:Sa8838597615dy@cluster0.icksue7.mongodb.net/e-commerce")
    .then(()=>{
        console.log("Connected")
    });
   } catch (err) {
    console.log(err)
   }
}
connection()