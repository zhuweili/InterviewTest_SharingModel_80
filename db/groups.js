'use strict';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

function Group(){

    /* --- ORG SCHEMA --*/
    var groupFields = {
        orgId: {type: Schema.Types.ObjectId, ref: 'org', required: true},
        name : { type: String}
    };

    var GroupSchema = new Schema(groupFields, { timestamps: true,  collection: 'groups' });

    this.groupModel = mongoose.model('group', GroupSchema);
}

module.exports = exports = new Group();

