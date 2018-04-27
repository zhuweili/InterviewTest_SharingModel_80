var express = require('express');
var router = express.Router();

var dbDocs = require('../db/docs').docModel;

/* GET users listing. */

router.put('/', function(req, res, next) {


    var query = { _id: req.body._id};
    var options = {upsert: true};
    console.log(req.body);

    dbDocs.findOneAndUpdate(query, { group_shared: req.body.group_shared }, function (err, doc){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(req.params);
        }
    });
});


module.exports = router;