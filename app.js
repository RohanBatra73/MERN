const express = require("express")
const app = express()

const mongoose = require('mongoose')
const path = require("path")

const Listing = require ('./models/listings')
const methodOverride = require('method-override')


main()
.then(()=>{ console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.listen(4000 ,()=>{
  console.log("server is working on port :4000");
  
})

app.get("/",(req,res)=>{
  res.send("root is working");
  
})

// Index Route
app.get("/listings",async (req,res)=>{

  const allistngs = await Listing.find({});
  res.render("listings/index.ejs",{allistngs})
})
//Create Route - second functionality

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})


// Show route second click - first functionality

app.get("/listings/:id",async (req,res)=>{
  let {id} = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/show.ejs",{listing})


})

app.post("/listings",async(req,res)=>{
  const newlisting = await new Listing(req.body.listing)
  newlisting.save();
  res.redirect("/listings")

})


app.get("/listings/:id/edit",async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing})

})

app.put("/listings/:id",async(req,res)=>{
  let { id } = req.params;
 await Listing.findByIdAndUpdate(id, {...req.body.listing}) 
  res.redirect(`/listings/${id}`)

})

app.delete("/listings/:id",async(req,res)=>{
  let { id } = req.params;
 let deletedlisting = await Listing.findByIdAndDelete(id);
 console.log(deletedlisting);
 res.redirect("/listings");
 
  
})