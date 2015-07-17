
/**
 * output-post.js
 *
 * Post output object transform function
 */

module.exports = tranform;

/**
 * Transform input object
 *
 * @param   Object  input  Input object
 * @return  Object         Transformed input object
 */
function tranform(input) {
	var output = {
		pid: input.pid
		, title: input.title
		, summary: input.summary
		, user: input.user
		, user_name: input.user_name
		, user_login: input.user_login
		, user_avatar: input.user_avatar
		, club: input.club
		, club_name: input.club_name
		, club_image: input.club_image
		, domain: input.domain
		, url: input.url
		, image: input.image
		, doc_title: input.doc_title
	};

	return output;
};
