const express = require("express");
const routes = require("./src/routes/routes");
const db=require("./src/config/config")
const app = express();
const cors=require("cors")
const bodyParser = require('body-parser');

// app.use(cors({
//     origin: 'http://localhost:3000', // Allow only requests from your React app
//     methods: ['GET', 'POST','PUT','DELETE'],        // Allow specific methods
//     credentials: true                // Allow credentials if needed
    
//   }));

  app.use(cors('*'))


  // app.use(bodyParser.json())
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
db()
// 
app.use('/app', routes);

  
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log('server start PORT- ', PORT);
}
);


// {
//     "name":"sabaii",
//      "email":"sabriswaran@2003",
//      "mobile":"7873922312",
//      "designation":"hr",
//      "gender":"male",
//      "course":"bsc",
//      "image":"imege"

//      http://localhost:5000/app/insertUser

    
// }
