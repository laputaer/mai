
/**
 * menu-escape.js
 *
 * Listen to esc key when menu is open
 */

'use strict';

var doc = document;

module.exports = MenuEscape;

/**
 * Toggle keyboard listener
 *
 * @param   Object  emitter  Event emitter
 * @param   Object  opts     Extra options
 * @return  Void
 */
function MenuEscape(emitter, opts) {
	if (!(this instanceof MenuEscape)) {
		return new MenuEscape(emitter, opts);
	}

	this.emitter = emitter;
	this.opts = opts || {};
	this.idle = true;

	if (this.opts.enable) {
		doc.addEventListener('keydown', this.closeMenu.bind(this));
	} else {
		doc.removeEventListener('keydown', this.closeMenu.bind(this));
	}
};

/**
 * Fire menu close event 
 *
 * @param   Object  ev  Keyboard event
 * @return  Void
 */
MenuEscape.prototype.closeMenu = function (ev) {
	if (!this.idle) {
		return;
	}

	if (ev.keyCode !== 27) {
		return;
	}

	this.idle = false;

	var self = this;
	setTimeout(function () {
		self.emitter.emit(self.opts.name, self.opts.data);
	}, 100);
};
