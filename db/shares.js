'use strict';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

function Share(){

    /* --- ORG SCHEMA --*/
    var shareFields = {
        sharedGroupId: {type: String},
        sharedUserId: {type: String},
        docId: {type: String, required: true},
        orgId: {type: String, required: true},
        authorId: {type: String, required: true}
    };

    var ShareSchema = new Schema(shareFields, { timestamps: true,  collection: 'shares' });

    this.shareModel = mongoose.model('share', ShareSchema);
}

module.exports = exports = new Share();