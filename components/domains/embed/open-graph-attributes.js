
/**
 * open-graph-attributes.js
 *
 * List of known open graph attributes
 *
 * ref: https://github.com/senorcris/opengraphjs/blob/master/lib/fields.js
 * ref: http://ogp.me/
 */

module.exports = {
	title: {
		field: 'title'
	} 
	, type: {
		field: 'type'
	}
	, url: {
		field: 'url'
	}
	, description: {
		field: 'description'
	}
	, site_name: {
		field: 'site_name'
	}
	, image: {
		field: 'url'
		, group: 'image'
		, root: true
	}
	, 'image:url': {
		field: 'url'
		, group: 'image'
		, root: true
	}
	, 'image:secure_url': {
		field: 'secure_url'
		, group: 'image'
	}
	, 'image:width': {
		field: 'width'
		, group: 'image'
	}
	, 'image:height': {
		field: 'height'
		, group: 'image'
	}
	, 'image:type': {
		field: 'type'
		, group: 'image'
	}
	, video: {
		field: 'url'
		, group: 'video'
		, root: true
	}
	, 'video:url': {
		field: 'url'
		, group: 'video'
		, root: true
	}
	, 'video:secure_url': {
		field: 'secure_url'
		, group: 'video'
	}
	, 'video:width': {
		field: 'width'
		, group: 'video'
	}
	, 'video:height': {
		field: 'height'
		, group: 'video'
	}
	, 'video:type': {
		field: 'type'
		, group: 'video'
	}
	, audio: {
		field: 'url'
		, group: 'audio'
		, root: true
	}
	, 'audio:url': {
		field: 'url'
		, group: 'audio'
		, root: true
	}
	, 'audio:secure_url': {
		field: 'secure_url'
		, group: 'audio'
	}
	, 'audio:type': {
		field: 'type'
		, group: 'audio'
	}
};
