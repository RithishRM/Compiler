const express = require("express");
const cors = require("cors");


const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp');
const { executePy } = require("./executePy");



const app = express();

app.get('/',(req,res)=>{
 return res.json({hello:"world!"});
});

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/run',async (req,res)=>{
  const { language = "cpp" , code } = req.body;
  
  if(code === undefined){
    return res.status(400).json({success: false,error:"Empty code body!"})
    console.log("Empty code error!")
  }

  try{
  const filepath = await generateFile(language,code);
  
  let output;

  if(language === "cpp"){ 
   output = await executeCpp(filepath);
   return res.json({ filepath , output});}
  else{
    output = await executePy(filepath);
    return res.json({ filepath , output});
  }
  
  }
  catch(err){
    res.status(500).json({err})
  }
});

app.listen(8081,()=>{
    console.log("listening to 8081");
});