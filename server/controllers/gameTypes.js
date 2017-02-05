var keystone = require('keystone');
var mongoose = require('mongoose');
var GameType = keystone.list('GameType').model;

exports.byType = function(req, res) {
  
  var type = req.params.type;
  
  GameType.findOne({typeId: type})
    .exec(function(err, gameType) {
      if(!err) {
        res.json(gameType);
      } else {
        console.log('Error in first query');
      }
  });

};