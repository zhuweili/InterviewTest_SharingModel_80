var express = require('express');
var router = express.Router();

var dbUsers = require('../db/users').userModel;

/* GET users listing. */
router.get('/:orgId', function(req, res, next) {

    dbUsers.find({orgId: req.params.orgId}).lean().exec(function(err, orgs) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(orgs);
        }
    });
});





router.put('/', function(req, res, next) {

    var newUser = new dbUsers(req.body);
    newUser.save((err, result)=>{

        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
}
});
});



router.patch('/', function(req, res, next) {

    var newUser = req.body;
    var query = { _id: newUser._id};

    dbUsers.findOneAndUpdate(query, { groupAdmin: newUser.groupAdmin,  orgAdmin: newUser.orgAdmin}, function (err, doc){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(req.params);
        }
    });

});


module.exports = router;
