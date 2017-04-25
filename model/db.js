/**
 * Created by Epica on 2016/12/29.
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true})