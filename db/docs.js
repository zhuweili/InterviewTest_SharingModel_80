'use strict';

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

function Doc(){

    /* --- ORG SCHEMA --*/
    var docFields = {
        orgId: {type: Schema.Types.ObjectId, ref: 'org', required: true},
        groupId: {type: String},
        group_shared: {type: Boolean},
        userId: {type: String, required: true},
        name : {type: String,required: true},
        size: {type: String,required: true},
        description: {type: String}
    };

    var DocSchema = new Schema(docFields, { timestamps: true,  collection: 'docs' });

    this.docModel = mongoose.model('doc', DocSchema);
}

module.exports = exports = new Doc();

