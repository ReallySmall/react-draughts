var keystone = require('keystone');
var mongoose = require('mongoose');
var Board = keystone.list('Board').model;

/**
 * List
 */
exports.all = function(req, res) {
  Board
    .find({})
    .sort({version: -1})
    .select({
      '_id' : 0,
      'slug' : 1,
      'title' : 1,
      'boardStatus' : 1,
      'developedDate' : 1,
      'version' : 1,
      'content.brief': 1,
      'images' : 1
    })
    .populate('images.slot1 images.slot2')
    .exec(function(err, boards) {
      if(!err) {
        res.json(boards);
      }else {
        console.log('Error in first query');
      }
  });
};

/**
 * By Id
 */
exports.byId = function(req, res) {
  var slug = req.params.slug;
  Board.findOne({slug: slug})
    .populate('images.slot1 images.slot2')
    .exec(function(err, board) {
    if(!err) {
      res.json(board);
    }else {
      console.log('Error in first query');
    }
  });
};