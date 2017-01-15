var keystone = require('keystone');
var Types = keystone.Field.Types;

var Wrapper = new keystone.List('Wrapper', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Wrapper.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	header: { 
		siteTitle:  { type: String, required: true, initial: true },
    	siteSubtitle:  { type: String, required: true, initial: true },
    	links: {
    		title: { type: String },
    		list: { type: Types.Relationship, ref: 'Link', many: true }
    	}
	},
	footer: {
		col1: {
			title: { type: String },
			list: { type: Types.Relationship, ref: 'Link', many: true }
		},
		col2: {
			title: { type: String },
			list: { type: Types.Relationship, ref: 'Link', many: true }
		},
		col3: {
			title: { type: String },
			list: { type: Types.Relationship, ref: 'Link', many: true }
		}
	},
	messages: {
		cookies: {
			bannerMessage: { type: String, required: false },
			bannerButtonMessage: { type: String, required: false },
			policyContent: { type: Types.Html, wysiwyg: true, height: 400 }
		},
		legacyBrowsers: {
			bannerMessage: { type: String, required: false }
		}
	}

});

Wrapper.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Wrapper.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Wrapper.register();
