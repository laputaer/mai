
/**
 * security.js
 *
 * A collection of test cases for security
 */

// test tools
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

// test environment polyfills
require('co-mocha');
require('babel/polyfill');

// test subjects
var validate = require('../security/validation');
var normalize = require('../security/normalization');

var input, target, result, local, base;

describe('security', function() {
	describe('validation', function() {
		it('should validate a full opengraph object', function *() {
			input = {
				title: 'some title'
				, type: 'website'
				, url: 'http://example.com/'
				, description: 'this is a test example'
				, site_name: 'example'
				, image: [{
					url: 'http://example.com/image.jpg'
					, secure_url: 'https://example.com/image.jpg'
					, width: '400'
					, height: '300'
					, type: 'image/jpeg'
				}, {
					url: 'http://example.com/image.png'
					, secure_url: 'https://example.com/image.png'
					, width: '400'
					, height: '300'
					, type: 'image/png'
				}]
				, video: [{
					url: 'http://example.com/video.mp4'
					, secure_url: 'https://example.com/video.mp4'
					, width: '400'
					, height: '300'
					, type: 'video/mp4'
				}, {
					url: 'http://example.com/video.swf'
					, secure_url: 'https://example.com/video.swf'
					, width: '400'
					, height: '300'
					, type: 'application/x-shockwave-flash'
				}]
				, audio: [{
					url: 'http://example.com/audio.ogg'
					, secure_url: 'https://example.com/audio.ogg'
					, type: 'audio/ogg'
				}, {
					url: 'http://example.com/audio.mp3'
					, secure_url: 'https://example.com/audio.mp3'
					, type: 'audio/mpeg'
				}]
			};

			result = yield validate(input, 'opengraph');

			expect(result.errors).to.be.an('object');
			expect(result.errors.title).to.be.empty;
			expect(result.errors.type).to.be.empty;
			expect(result.errors.url).to.be.empty;
			expect(result.errors.site_name).to.be.empty;
			expect(result.errors.description).to.be.empty;
			expect(result.errors.image).to.be.empty;
			expect(result.errors.video).to.be.empty;
			expect(result.errors.audio).to.be.empty;
			expect(result.valid).to.be.true;
		});

		it('should validate opengraph from youtube.com', function *() {
			input = {
				title: 'UNISON SQUARE GARDEN「シュガーソングとビターステップ」ショートVer.'
				, type: 'video'
				, url: 'http://www.youtube.com/watch?v=3exsRhw3xt8'
				, description: 'UNISON SQUARE GARDEN 10thシングル「シュガーソングとビターステップ」http://amzn.to/1CCll22 2015年5月20日（水）リリース 初回限定盤［2CD］TFCC-89547 / ¥1,800＋税 通常盤［CD］TFCC-89548 / ¥1,200＋税 ＜収録曲＞ 01....'
				, site_name: 'YouTube'
				, image: [{
					url: 'https://i.ytimg.com/vi/3exsRhw3xt8/maxresdefault.jpg'
				}, {
					url: 'http://example.com/image.png'
					, secure_url: 'https://example.com/image.png'
					, width: '400'
					, height: '300'
					, type: 'image/png'
				}]
				, video: [{
					url: 'https://www.youtube.com/embed/3exsRhw3xt8'
					, secure_url: 'https://www.youtube.com/embed/3exsRhw3xt8'
					, type: 'text/html'
					, width: '1280'
					, height: '720'
				}, {
					url: 'http://www.youtube.com/v/3exsRhw3xt8?version=3&amp;autohide=1'
					, secure_url: 'https://www.youtube.com/v/3exsRhw3xt8?version=3&amp;autohide=1'
					, type: 'application/x-shockwave-flash'
					, width: '1280'
					, height: '720'
				}]
			};

			result = yield validate(input, 'opengraph');

			expect(result.errors).to.be.an('object');
			expect(result.errors.title).to.be.empty;
			expect(result.errors.type).to.be.empty;
			expect(result.errors.url).to.be.empty;
			expect(result.errors.site_name).to.be.empty;
			expect(result.errors.description).to.be.empty;
			expect(result.errors.image).to.be.empty;
			expect(result.errors.video).to.be.empty;
			expect(result.errors.audio).to.be.empty;
			expect(result.valid).to.be.true;
		});

		it('should reject opengraph without title', function *() {
			input = {
				url: 'http://example.com/'
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.include('title invalid');
			expect(result.errors.url).to.be.empty;
			expect(result.errors.type).to.be.empty;
		});

		it('should reject opengraph without url', function *() {
			input = {
				title: 'some title'
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.be.empty;
			expect(result.errors.url).to.include('url invalid');
			expect(result.errors.type).to.be.empty;
		});

		it('should reject opengraph with invalid url', function *() {
			input = {
				title: 'some title'
				, url: 'example.com'
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.be.empty;
			expect(result.errors.url).to.include('url invalid');
			expect(result.errors.type).to.be.empty;
		});

		it('should reject opengraph with invalid image url', function *() {
			input = {
				title: 'some title'
				, url: 'http://example.com'
				, image: [{
					url: '/image.jpg'
				}]
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.be.empty;
			expect(result.errors.url).to.be.empty;
			expect(result.errors.type).to.be.empty;
			expect(result.errors.image).to.include('image invalid');
		});

		it('should reject opengraph with invalid image width', function *() {
			input = {
				title: 'some title'
				, url: 'http://example.com'
				, image: [{
					url: 'http://example.com/image.jpg'
					, width: 'abc'
				}]
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.be.empty;
			expect(result.errors.url).to.be.empty;
			expect(result.errors.type).to.be.empty;
			expect(result.errors.image).to.include('image invalid');
		});

		it('should reject opengraph with invalid image type', function *() {
			input = {
				title: 'some title'
				, url: 'http://example.com'
				, image: [{
					url: 'http://example.com/image.jpg'
					, width: '400'
					, type: 'jpg'
				}]
			};

			result = yield validate(input, 'opengraph');

			expect(result.valid).to.be.false;
			expect(result.errors.title).to.be.empty;
			expect(result.errors.url).to.be.empty;
			expect(result.errors.type).to.be.empty;
			expect(result.errors.image).to.include('image invalid');
		});
	});

	describe('normalize', function() {
		it('should not change a valid opengraph object', function *() {
			input = {
				title: 'some title'
				, type: 'website'
				, url: 'http://example.com/'
				, description: 'this is a test example'
				, site_name: 'example'
				, image: [{
					url: 'http://example.com/image.jpg'
					, secure_url: 'https://example.com/image.jpg'
					, width: '400'
					, height: '300'
					, type: 'image/jpeg'
				}, {
					url: 'http://example.com/image.png'
					, secure_url: 'https://example.com/image.png'
					, width: '400'
					, height: '300'
					, type: 'image/png'
				}]
				, video: [{
					url: 'http://example.com/video.mp4'
					, secure_url: 'https://example.com/video.mp4'
					, width: '400'
					, height: '300'
					, type: 'video/mp4'
				}, {
					url: 'http://example.com/video.swf'
					, secure_url: 'https://example.com/video.swf'
					, width: '400'
					, height: '300'
					, type: 'application/x-shockwave-flash'
				}]
				, audio: [{
					url: 'http://example.com/audio.ogg'
					, secure_url: 'https://example.com/audio.ogg'
					, type: 'audio/ogg'
				}, {
					url: 'http://example.com/audio.mp3'
					, secure_url: 'https://example.com/audio.mp3'
					, type: 'audio/mpeg'
				}]
			};

			result = yield normalize(input, 'opengraph');

			expect(result).to.deep.equal(input);
		});

		it('should trim title', function *() {
			input = {
				title: ' some title '
			};

			result = yield normalize(input, 'opengraph');

			expect(result.title).to.equal('some title');
		});

		it('should decode title', function *() {
			input = {
				title: 'some &amp; title'
			};

			result = yield normalize(input, 'opengraph');

			expect(result.title).to.equal('some & title');
		});

		it('should cut off long title', function *() {
			input = {
				title: Array(130).join('a')
			};

			result = yield normalize(input, 'opengraph');

			expect(result.title).to.have.length.below(128);
		});

		it('should create a site_name if missing', function *() {
			input = {
				url: 'http://example.com/abc'
			};

			result = yield normalize(input, 'opengraph');

			expect(result.site_name).to.equal('example.com');
		});

		it('should trim image url', function *() {
			input = {
				image: [{
					url: ' http://example.com/image.jpg'
					, secure_url: ' https://example.com/image.jpg  '
				}]
			};

			result = yield normalize(input, 'opengraph');

			expect(result.image[0].url).to.equal('http://example.com/image.jpg');
			expect(result.image[0].secure_url).to.equal('https://example.com/image.jpg');
		});

		it('should decode image url', function *() {
			input = {
				image: [{
					url: 'http://example.com/image.jpg?a=1&amp;b=1'
					, secure_url: 'https://example.com/image.jpg?a=1&amp;b=1'
				}]
			};

			result = yield normalize(input, 'opengraph');

			expect(result.image[0].url).to.equal('http://example.com/image.jpg?a=1&b=1');
			expect(result.image[0].secure_url).to.equal('https://example.com/image.jpg?a=1&b=1');
		});
	});
});
