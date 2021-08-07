const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.admin = require("../schemas/admin.schema");
db.user = require("../schemas/user.schema");

module.exports = db;