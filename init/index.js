const intiData = require("./data.js")
const mongoose = require('mongoose')

const Listing = require("../models/listings.js")


main()
.then(()=>{ console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}
const initDB= async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(intiData.data)
    console.log("Data was intialized");
    
}

initDB();       