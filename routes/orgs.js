var express = require('express');
var router = express.Router();

var dbOrgs = require('../db/orgs').orgModel;

router.get('/', function(req, res, next) {

    dbOrgs.find({}).lean().exec(function(err, orgs) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(orgs);
        }
    });
});

router.put('/', function(req, res, next) {

    var newOrg = new dbOrgs(req.body);
    newOrg.save((err, result)=>{

        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });
});

module.exports = router;
