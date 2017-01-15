var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Board Model
 * ==========
 */

var Board = new keystone.List('Board', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'path', unique: true }
});

Board.add({
	title: { type: String, required: true },
    path: { type: String, required: true, initial: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true },
    metaDescription: { type: String },
	developedDate: { type: Types.Date, index: true },
	version: { type: Types.Number },
	boardStatus: { type: Types.Select, numeric: true, options: [
    	{ 	
    		value: 0, 
    		label: 'Code in development',
    		status: 'Code in development',
    		description: 'Hardware complete, code implementation ongoing (help welcome with a pull request!)',
    		htmlClass: 'board-active-dev' 
    	},
    	{ 	
    		value: 1, 
    		label: 'Complete',
    		status: 'Code in development',
    		description: 'Hardware and code complete. No new development planned, however issues raised will be looked at',
    		htmlClass: 'board-supported' 
    	},
    	{ 	
    		value: 2, 
    		label: 'Closed prototype',
    		status: 'Code in development',
    		description: 'Hardware issues or limitations identified. Unsupported and superceded by a more recent version',
    		htmlClass: 'board-closed-proto' 
    	}
	]},
    images: {
        slot1: { type: Types.Relationship, ref: 'Image', many: true },
        slot2: { type: Types.Relationship, ref: 'Image', many: true }
    },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	repoUrl: { type: Types.Url },
    repoUserName: { type: String },
    repoName: { type: String },
    specification: { type: Types.Html, wysiwyg: true, height: 400 }
});

Board.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Board.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Board.register();
