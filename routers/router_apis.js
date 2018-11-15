const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.end('1111')
});



module.exports = router

