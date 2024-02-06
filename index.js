require("dotenv").config()
const cors=require("cors")
const express=require("express")
const mongoose=require("mongoose")
const app=express()
const port=process.env.PORT || 8000
const Email=require("./models/Email.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.MONGO_URL,console.log("db connected"))

app.post("/wait:email",async(req,res)=>{
try{await Email.create({
	email:req.params.email
})
res.status(200).json({"msg":"you will be mailed"})
}catch(err){
res.status(400)
}
})

app.get("/email",async(req,res)=>{
try{email=await Email.find()
res.json(email)
}
catch(err){
res.sendStatus(400)
}
})


app.listen(port,console.log("server is runing"))
