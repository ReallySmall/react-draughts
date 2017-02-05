var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Game Type Model
 * ==========
 */

var GameType = new keystone.List('GameType', {
	map: { name: 'title' }
});

GameType.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },
	typeId: { type: Types.Number, required: true, initial: true },
    gridSize: { type: Types.Number, required: true, initial: true },
    initialPieces: { type: Types.Number, required: true, initial: true },
	rules: { type: Types.Html, wysiwyg: true, height: 150 }
});

GameType.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
GameType.register();
