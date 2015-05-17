
/**
 * test.js
 *
 * A simple collection of test cases
 */

// test tools
var chai = require('chai');
var coMocha = require('co-mocha');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var TestServer = require('./server');

// test subjects
var embed = require('../domains/embed');
var configFactory = require('../config/config');
var config = configFactory();

var input, target, result, local, base;

describe('domains', function() {
	describe('embed', function() {
		before(function(done) {
			local = new TestServer();
			base = 'http://' + local.hostname + ':' + local.port;
			local.start(done);
		});

		after(function(done) {
			local.stop(done);
		});

		it('should expose these public api', function() {
			expect(embed).to.have.all.keys(
				'getImageProfile'
				, 'getContentProfile'
				, 'getOpenGraphProfile'
			);
		});

		describe('getOpenGraphProfile', function() {
			it('should reject non-2xx response', function *() {
				input = config.request;
				input.url = base + '/error';
				target = sinon.spy(embed, 'getOpenGraphProfile');

				try {
					result = yield embed.getOpenGraphProfile(input);
				} catch(err) {
					expect(err).to.be.an.instanceof(Error);
				}

				expect(target).to.have.been.calledOnce;
				expect(result).to.be.undefined;
				embed.getOpenGraphProfile.restore();
			});

			it('should reject empty body', function *() {
				input = config.request;
				input.url = base + '/empty';
				target = sinon.spy(embed, 'getOpenGraphProfile');

				try {
					result = yield embed.getOpenGraphProfile(input);
				} catch(err) {
					expect(err).to.be.an.instanceof(Error);
				}

				expect(target).to.have.been.calledOnce;
				expect(result).to.be.undefined;
				embed.getOpenGraphProfile.restore();
			});

			it('should extract simple opengraph meta', function *() {
				input = config.request;
				input.url = base + '/simple';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
				);
				expect(result.url).to.equal('http://ogp.me/');
				expect(result.title).to.equal('Open Graph protocol');
				expect(result.type).to.equal('website');
				expect(result.description).to.equal('The Open Graph protocol enables any web page to become a rich object in a social graph.');
				expect(result.image).to.eql([
					{
						url: 'http://ogp.me/logo.png'
						, type: 'image/png'
						, width: '300'
						, height: '300'
					}
				]);
			});
		});
	});
});