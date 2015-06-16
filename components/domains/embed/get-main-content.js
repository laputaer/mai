
/**
 * get-main-content.js
 *
 * Takes a cheerio object and find the node most likely containing the main content
 */

var he = require('he');

module.exports = getMainContent;

/**
 * Find the main content from document
 *
 * @param   Object  $  Cheerio dom object
 * @return  Object     Cheerio node object
 */
function getMainContent($) {
	// STEP 1: prepare targets
	var targets = $('body').find('div, article, section');

	// STEP 2: filters for minimum text length, linked text ratio
	targets = targets.filter(function(i, el) {
		el = $(el);

		// at least 100 bytes to be a valid candidate
		var textLength = countText(el.text());
		if (textLength < 100) {
			return false;
		}

		var links = el.find('a');

		// no links, skip rest of tests
		if (links.length === 0) {
			return true;
		}

		// at most 1 link every 30 bytes
		if (textLength / links.length < 30) {
			return false;
		}

		// at most 50% text can be wrapped in link
		var linkedLength = countText(links.text());
		if (linkedLength / textLength > 0.5) {
			return false;
		}

		return true;
	});

	// STEP 3: find candidate with high score, take source order into account
	var top_score = 0;
	var current_offset = 0;
	var main_node = null;
	targets.each(function(i, el) {
		var target = $(el);
		var score = 0;

		// compute container score using direct text node length
		score += countText(textNode(target)) / 10;

		// compute direct child node score, build descendant list
		var direct = target.children().filter(function(_i, _el) {
			_el = $(_el);
			score += countScore(_el);

			// node with further descendants
			if (_el.is('div')
				|| _el.is('article')
				|| _el.is('section') 
				|| _el.is('ul')
				|| _el.is('ol')
				|| _el.is('p')
				|| _el.is('blockquote')) 
			{
				return true;
			}

			return false;
		});

		// compute descendant score
		direct.each(function(_i, _el) {
			_el = $(_el);
			var descendant = _el.children();
			var temp = 0;

			descendant.each(function(__i, __el) {
				__el = $(__el);
				temp += countScore(__el, 0.75);
			});

			// ignore minor descendant
			if (temp >= 100) {
				score += temp;
			}
		});

		// ignore low score container
		if (score < 50) {
			return;
		}

		// select better candidate
		if (score - 50 * current_offset > top_score) {
			top_score = Math.floor(score - 50 * current_offset);
			current_offset++;
			main_node = $(el);
		}
	});

	return main_node;
};

/**
 * Calculate node score
 *
 * @param   Object  el   Cheerio dom object
 * @param   Number  mod  Score modifier
 * @return  Number
 */
function countScore(el, mod) {
	var mul = 0;
	mod = mod || 1;

	if (el.is('p') || el.is('blockquote') || el.is('h2') || el.is('h3') || el.is('h4')) {
		mul = countText(textNode(el)) / 5 || 10;

	} else if (el.is('font') || el.is('span') || el.is('i') || el.is('b')) {
		mul = countText(textNode(el)) / 10 || 5;

	} else if (el.is('div') || el.is('li')) {
		mul = countText(textNode(el)) / 15 || 2;

	} else if (el.is('img')) {
		var width = el.attr('width');
		if (typeof width === 'string') {
			mul = width.replace('%', '') / 100;
		} else {
			mul = 2;
		}

	} else if (el.is('pre') || el.is('video') || el.is('audio') || el.is('iframe')) {
		mul = 5;

	} else if (el.is('code') || el.is('br')) {
		mul = 2;

	}

	// score = multiplier * modifier
	return mul * mod;
};

/**
 * Get direct text node
 *
 * @param   Object  el  Cheerio dom object
 * @return  String
 */
function textNode(el) {
	if (!el) {
		return '';
	}

	// count only text node
	return el.contents().filter(function(i, _el) {
		return _el.nodeType === 3;
	}).text();
};

/**
 * Calculate utf-8 string byte count, excluding whitespace
 *
 * @param   String  text  UTF-8 string
 * @return  Number
 */
function countText(text) {
	var l = 0;

	try {
		// decode entities so byte count is more accurate
		text = he.decode(text);
		// count byte instead of unicode length
		l = encodeURI(text).split(/%..|./).length - 1;
	} catch(err) {
		// invalid string, skip
	}

	return l;
};
