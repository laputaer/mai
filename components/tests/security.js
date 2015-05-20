
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
	});
});

