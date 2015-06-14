
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
		, club: input.club
		, club_name: input.club_name
		, embed: {
			url: input.embed.url
			, domain: input.embed.domain
			, title: input.embed.title
			, image: input.embed.image
		}
	};

	return output;
};
