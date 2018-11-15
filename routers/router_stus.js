const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('stus/index.html')
});



module.exports = router

