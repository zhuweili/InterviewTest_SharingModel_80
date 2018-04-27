var express = require('express');
var router = express.Router();

var dbGroups = require('../db/groups').groupModel;

/* GET users listing. */
router.get('/:orgId', function(req, res, next) {

    dbGroups.find({orgId: req.params.orgId}).lean().exec(function(err, orgs) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(orgs);
        }
    });
});


router.put('/', function(req, res, next) {

    var newGroup = new dbGroups(req.body);
    newGroup.save((err, result)=>{

        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });
});


module.exports = router;
