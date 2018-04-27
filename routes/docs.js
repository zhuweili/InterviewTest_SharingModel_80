var express = require('express');
var router = express.Router();

var dbDocs = require('../db/docs').docModel;
var dbUsers = require('../db/users').userModel;

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
        console.log(req.params.userId)



        dbUsers.findOne({_id: req.params.userId}).lean().exec(function(err, user_info) {
            if(err){
                res.status(500).send(err);
            }
            else{
                console.log(user_info);
                if (user_info.orgAdmin) {
                    dbDocs.find({orgId: user_info.orgId}).lean().exec(function(err, orgs) {
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            res.send(orgs);
                        }
                    });
                } else {
                    if (user_info.groupAdmin) {
                        dbDocs.find({groupId:user_info.groupId}).lean().exec(function(err, docs) {
                            if(err){
                                res.status(500).send(err);
                            }
                            else{
                                res.send(docs);
                            }
                        });
                    } else {
                        dbDocs.find({$or:[{groupId:user_info.groupId, group_shared:true}, {userId:user_info._id }]}).lean().exec(function(err, docs) {
                            if(err){
                                res.status(500).send(err);
                            }
                            else{
                                res.send(docs);
                            }
                        });
                    }
                }



            }
        });
});


router.put('/delete', function(req, res, next) {
    dbDocs.remove({_id: req.body._id}, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
});


router.put('/', function(req, res, next) {

    var newDoc = new dbDocs(req.body);
    newDoc.save((err, result)=>{

        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });
});





module.exports = router;
