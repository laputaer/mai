
/**
 * domains.js
 *
 * A collection of test cases for domains
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

// test api
var TestServer = require('./api/domains-server');

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
				'getOpenGraphProfile'
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

			it('should extract opengraph from ogp.me', function *() {
				input = config.request;
				input.url = base + '/basic';

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

			it('should extract opengraph from humblebundle.com', function *() {
				input = config.request;
				input.url = base + '/case-1';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
					, 'site_name'
				);
				expect(result.url).to.equal('https://www.humblebundle.com/?paradox_bundle');
				expect(result.title).to.equal('Humble Paradox Bundle');
				expect(result.type).to.equal('website');
				expect(result.site_name).to.equal('Humble Bundle');
				expect(result.description).to.equal('Pay what you want and support the AbleGamers and Extra Life charities!');
				expect(result.image).to.eql([
					{
						url: 'https://humblebundle-a.akamaihd.net/misc/files/hashed/db4626cbf68e3247f8f5c20b583267d4d5d38e97.png'
					}
				]);
			});

			it('should extract opengraph from youtube.com', function *() {
				input = config.request;
				input.url = base + '/case-2';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
					, 'video'
					, 'site_name'
				);
				expect(result.url).to.equal('http://www.youtube.com/watch?v=3exsRhw3xt8');
				expect(result.title).to.equal('UNISON SQUARE GARDEN「シュガーソングとビターステップ」ショートVer.');
				expect(result.type).to.equal('video');
				expect(result.site_name).to.equal('YouTube');
				expect(result.description).to.equal('UNISON SQUARE GARDEN 10thシングル「シュガーソングとビターステップ」http://amzn.to/1CCll22 2015年5月20日（水）リリース 初回限定盤［2CD］TFCC-89547 / ¥1,800＋税 通常盤［CD］TFCC-89548 / ¥1,200＋税 ＜収録曲＞ 01....');
				expect(result.image).to.eql([
					{
						url: 'https://i.ytimg.com/vi/3exsRhw3xt8/maxresdefault.jpg'
					}
				]);
				expect(result.video).to.eql([
					{
						url: 'https://www.youtube.com/embed/3exsRhw3xt8'
						, secure_url: 'https://www.youtube.com/embed/3exsRhw3xt8'
						, type: 'text/html'
						, width: '1280'
						, height: '720'
					}
					, {
						url: 'http://www.youtube.com/v/3exsRhw3xt8?version=3&amp;autohide=1'
						, secure_url: 'https://www.youtube.com/v/3exsRhw3xt8?version=3&amp;autohide=1'
						, type: 'application/x-shockwave-flash'
						, width: '1280'
						, height: '720'
					}
				]);
			});

			it('should extract opengraph from pixiv.net', function *() {
				input = config.request;
				input.url = base + '/case-3';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
					, 'site_name'
				);
				expect(result.url).to.equal('http://www.pixiv.net/member_illust.php?mode=medium&amp;illust_id=49555871');
				expect(result.title).to.equal('song for you! | 刃天 [pixiv]');
				expect(result.type).to.equal('article');
				expect(result.site_name).to.equal('pixiv');
				expect(result.description).to.equal('■先日ＰＶ２を観て我慢できずに描いてみました～放送超楽しみですo(≧v≦)o！結衣ちゃんと雪乃ちゃん本当に大好きです～にしでもＰＶの結衣ちゃんの泣くシーンは何度見でもやはり辛いです（Ｔ^Ｔ）、やはり二期だと結衣ちゃんも本格的に攻めにきましたね、ヒッキーはなかなかの強敵ですが、結衣ちゃんに是非頑張ってほしいです！いつも健気に頑張る姿がとても可愛い上に本当に感動してます！そして、わたしも全力で応援するつもりです！(｀・ω・´)　 ■それで雪乃ちゃんの方ですが、実はわたし個人の感想としては恋愛感情と言うより、お互いディスりあいつつもお互いをどこかで理解して認めて尊敬してる良き悪友？みたいな感じでした、２期はどうなるかはまた全然予想できませんが、これに関しても要注意だね～放送まであと３日！楽しみすぎて辛いです！！！(｡´≧Д≦｀｡)　');
				expect(result.image).to.eql([
					{
						url: 'http://i4.pixiv.net/c/150x150/img-master/img/2015/03/30/13/40/02/49555871_p0_master1200.jpg'
					}
				]);
			});

			it('should extract opengraph from flickr.com', function *() {
				input = config.request;
				input.url = base + '/case-4';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
					, 'site_name'
				);
				expect(result.url).to.equal('https://www.flickr.com/photos/91077297@N08/13942598938/');
				expect(result.title).to.equal('Ranko Kanzaki (The Idolmaster Cinderella Girls) Car - Nipponbashi Street Festa 2014, Osaka');
				expect(result.type).to.equal('flickr_photos:photo');
				expect(result.site_name).to.equal('Flickr - Photo Sharing!');
				expect(result.description).to.equal('ﾌﾟｩ');
				expect(result.image).to.eql([
					{
						url: 'http://farm8.staticflickr.com/7350/13942598938_2e3f59a4cc_z.jpg'
						, width: '640'
						, height: '480'
					}
				]);
			});

			it('should extract opengraph from twitter.com', function *() {
				input = config.request;
				input.url = base + '/case-5';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
					, 'site_name'
				);
				expect(result.url).to.equal('https://twitter.com/TKWcos/status/599616295529623554');
				expect(result.title).to.equal('トキワ on Twitter');
				expect(result.type).to.equal('article');
				expect(result.site_name).to.equal('Twitter');
				expect(result.description).to.equal('“ラルフさんのブログの方からいただきました、殿！！”');
				expect(result.image).to.eql([
					{
						url: 'https://pbs.twimg.com/media/CFJDurxUIAAGdev.jpg:large'
					}
					, {
						url: 'https://pbs.twimg.com/media/CFJDwS5UkAAiTyB.jpg:large'
					}
					, {
						url: 'https://pbs.twimg.com/media/CFJDyIdUMAEZrnu.jpg:large'
					}
					, {
						url: 'https://pbs.twimg.com/media/CFJD0ECUEAIWS3-.jpg:large'
					}
				]);
			});

			it('should discard structured property without root', function *() {
				input = config.request;
				input.url = base + '/edge-1';

				result = yield embed.getOpenGraphProfile(input);

				// note that we normalize url, title, type when they are missing or invalid
				expect(result).to.have.all.keys(
					'image'
					, 'url'
					, 'title'
					, 'type'
				);
				expect(result.title).to.equal('Document');
				expect(result.url).to.equal(input.url);
				expect(result.type).to.equal('website');
				expect(result.image).to.eql([
					{
						url: 'http://ogp.me/logo.png'
					}
				]);
			});

			it('should fallback to full content extraction, bitinn.net', function *() {
				input = config.request;
				input.url = base + '/case-6';

				result = yield embed.getOpenGraphProfile(input);

				expect(result).to.have.all.keys(
					'url'
					, 'title'
					, 'type'
					, 'description'
					, 'image'
				);
				expect(result.url).to.equal(input.url);
				expect(result.title).to.equal('OSX compress, zip64 and large file madness | 比特客栈的文艺复兴');
				expect(result.type).to.equal('fallback');
				expect(result.description).to.equal('  (since we are talking about zipping and unzipping&#8230; image credit: 119) Just a quick note to s...')
				expect(result.image).to.eql([
					{
						url: 'http://bitinn.net/wp-images/blogimage/2014/01/zipper-354x500.jpg'
					}
				]);
			});
		});
	});
});