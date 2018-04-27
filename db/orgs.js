'use strict'

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

function Organization(){

    /* --- ORG SCHEMA --*/
    var orgFields = {
        name : { type: String, required: true, unique: true },
        description: {type: String}
    };

    var OrgSchema = new Schema(orgFields, { timestamps: true,  collection: 'organizations' });

    this.orgModel = mongoose.model('org', OrgSchema);
}

module.exports = exports = new Organization();

