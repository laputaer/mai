
/**
 * test.js
 *
 * A simple collection of test cases
 */

// test tools
var chai = require('chai');
var cm = require('co-mocha');
var expect = chai.expect;
var TestServer = require('./server');

// test subjects
var embed = require('../domains/oembed');

var url, local, base;

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
			expect(embed).to.have.all.keys('getImageProfile', 'getContentProfile', 'getOpenGraphProfile');
		});
	});
});