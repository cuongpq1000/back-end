const express = require('express');
const app = express();
const port = process.env.port || 3030;


app.listen(port, () =>{
    console.log("listen to " + port);
})