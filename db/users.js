'use strict';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

function User(){

    /* --- ORG SCHEMA --*/
    var userFields = {
        username : { type: String, required: true, unique: true },
        orgId: {type: Schema.Types.ObjectId, ref: 'org', required: true},
        groupId: {type:String, required: true},
        orgAdmin: {type:Boolean, required: true},
        groupAdmin: {type:Boolean, required: true},
        firstName : { type: String},
        lastName : { type: String},
        dob: {type: Date},
        phone:{type: String}
    };

    var UserSchema = new Schema(userFields, { timestamps: true,  collection: 'users' });

    this.userModel = mongoose.model('user', UserSchema);
}

module.exports = exports = new User();

