
/**
 * user-manual.js
 *
 * Template for user manual content
 */

var $ = require('../vdom');
var i18n = require('../i18n')();

var sectionTitleTemplate = require('../common/section-title');

module.exports = template;

/**
 * Template defines html structure
 *
 * @param   Object  data  From renderer
 * @return  VNode
 */
function template() {
	// common answer section
	var sectionOpts = {
		className: 'page-section-help'
	};

	// question
	var section_title_1 = sectionTitleTemplate({
		title: 'help.about-question'
		, key: 'about'
	});

	// answer
	var section_1 = $('div', sectionOpts, [
		$('p', i18n.t('help.about-answer-1'))
		, $('p', i18n.t('help.about-answer-2'))
		, $('p', [
			$('span', i18n.t('error.feedback-contact-1'))
			, $('a.m-link', {
				href: 'https://twitter.com/bitinn'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('error.feedback-contact-1-name'))
			])
			, $('span', i18n.t('error.feedback-contact-2'))
			, $('a.m-link', {
				href: 'https://github.com/maihq/feedbacks'
				, target: '_blank'
			}, [
				$('span.m-text', i18n.t('error.feedback-contact-2-name'))
			])
		])
	]);

	// ditto
	var section_title_2 = sectionTitleTemplate({
		title: 'help.about-us-question'
		, key: 'about-us'
	});

	var section_2 = $('div', sectionOpts, [
		$('p', i18n.t('help.about-us-answer-1'))
	]);

	var section_title_3 = sectionTitleTemplate({
		title: 'help.about-why-question'
		, key: 'about-why'
	});

	var section_3 = $('div', sectionOpts, [
		$('p', i18n.t('help.about-why-answer-1'))
		, $('p', i18n.t('help.about-why-answer-2'))
		, $('p', i18n.t('help.about-why-answer-3'))
	]);

	var section_title_4 = sectionTitleTemplate({
		title: 'help.about-club-question'
		, key: 'about-club'
	});

	var section_4 = $('div', sectionOpts, [
		$('p', i18n.t('help.about-club-answer-1'))
		, $('p', i18n.t('help.about-club-answer-2'))
	]);

	var section_title_5 = sectionTitleTemplate({
		title: 'help.about-tagline-question'
		, key: 'about-tagline'
	});

	var section_5 = $('div', sectionOpts, [
		$('p', i18n.t('help.about-tagline-answer-1'))
		, $('p', i18n.t('help.about-tagline-answer-2'))
	]);

	var section_title_6 = sectionTitleTemplate({
		title: 'help.club-guideline-question'
		, key: 'club-guideline'
	});

	var section_6 = $('div', sectionOpts, [
		$('p', i18n.t('help.club-guideline-answer-1'))
	]);

	var section_title_7 = sectionTitleTemplate({
		title: 'help.club-guideline-naming-question'
		, key: 'club-guideline-naming'
	});

	var section_7 = $('div', sectionOpts, [
		$('p', i18n.t('help.club-guideline-naming-answer-1'))
		, $('p', i18n.t('help.club-guideline-naming-answer-2'))
		, $('p', i18n.t('help.club-guideline-naming-answer-3'))
		, $('p', i18n.t('help.club-guideline-naming-answer-4'))
		, $('p', i18n.t('help.club-guideline-naming-answer-5'))
		, $('p', i18n.t('help.club-guideline-naming-answer-6'))
		, $('p', i18n.t('help.club-guideline-naming-answer-7'))
		, $('p', i18n.t('help.club-guideline-naming-answer-8'))
		, $('p', i18n.t('help.club-guideline-naming-answer-9'))
	]);

	var section_title_8 = sectionTitleTemplate({
		title: 'help.club-guideline-operation-question'
		, key: 'club-guideline-operationn'
	});

	var section_8 = $('div', sectionOpts, [
		$('p', i18n.t('help.club-guideline-operation-answer-1'))
		, $('p', i18n.t('help.club-guideline-operation-answer-2'))
		, $('p', i18n.t('help.club-guideline-operation-answer-3'))
		, $('p', i18n.t('help.club-guideline-operation-answer-4'))
		, $('p', i18n.t('help.club-guideline-operation-answer-5'))
	]);

	var section_title_9 = sectionTitleTemplate({
		title: 'help.club-guideline-content-question'
		, key: 'club-guideline-content'
	});

	var section_9 = $('div', sectionOpts, [
		$('p', i18n.t('help.club-guideline-content-answer-1'))
		, $('p', i18n.t('help.club-guideline-content-answer-2'))
		, $('p', i18n.t('help.club-guideline-content-answer-3'))
		, $('p', i18n.t('help.club-guideline-content-answer-4'))
		, $('p', i18n.t('help.club-guideline-content-answer-5'))
		, $('p', i18n.t('help.club-guideline-content-answer-6'))
	]);

	var section_title_10 = sectionTitleTemplate({
		title: 'help.game-rule-question'
		, key: 'game-rule'
	});

	var section_10 = $('div', sectionOpts, [
		$('p', i18n.t('help.game-rule-answer-1'))
		, $('p', i18n.t('help.game-rule-answer-2'))
	]);

	var section_title_11 = sectionTitleTemplate({
		title: 'help.game-rule-user-question'
		, key: 'game-rule-user'
	});

	var section_11 = $('div', sectionOpts, [
		$('p', i18n.t('help.game-rule-user-answer-1'))
		, $('p', i18n.t('help.game-rule-user-answer-2'))
		, $('p', i18n.t('help.game-rule-user-answer-3'))
		, $('p', i18n.t('help.game-rule-user-answer-4'))
		, $('p', i18n.t('help.game-rule-user-answer-5'))
		, $('p', i18n.t('help.game-rule-user-answer-6'))
		, $('p', i18n.t('help.game-rule-user-answer-7'))
		, $('p', i18n.t('help.game-rule-user-answer-8'))
		, $('p', i18n.t('help.game-rule-user-answer-9'))
	]);

	var section_title_12 = sectionTitleTemplate({
		title: 'help.game-rule-club-question'
		, key: 'game-rule-club'
	});

	var section_12 = $('div', sectionOpts, [
		$('p', i18n.t('help.game-rule-club-answer-1'))
		, $('p', i18n.t('help.game-rule-club-answer-2'))
		, $('p', i18n.t('help.game-rule-club-answer-3'))
		, $('p', i18n.t('help.game-rule-club-answer-4'))
		, $('p', i18n.t('help.game-rule-club-answer-5'))
	]);

	// page content
	var manualOpts = {
		id: 'content'
		, key: 'content'
		, className: 'page-content'
	};

	var manual = $('div', manualOpts, [
		section_title_1
		, section_1
		, section_title_2
		, section_2
		, section_title_3
		, section_3
		, section_title_4
		, section_4
		, section_title_5
		, section_5
		, section_title_6
		, section_6
		, section_title_7
		, section_7
		, section_title_8
		, section_8
		, section_title_9
		, section_9
		, section_title_10
		, section_10
		, section_title_11
		, section_11
		, section_title_12
		, section_12
	]);

	return manual;
};