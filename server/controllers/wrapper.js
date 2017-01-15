var keystone = require('keystone');
var mongoose = require('mongoose');
var Wrapper = keystone.list('Wrapper').model;

/**
 * List
 */
exports.all = function(req, res) {

	Wrapper.findOne({}).sort({'_id': -1}).populate('header.links.list footer.col1.list footer.col2.list footer.col3.list').exec(function(err, wrapper) {
		if(!err) {
			res.json(wrapper);
		} else {
		  console.log('Error in wrapper query');
		}
	});

};
