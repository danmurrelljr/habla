'use strict';

var assert = require('assert');
var Habla = require('../index.js')
var habla = new Habla();

describe('Habla', function() {
	describe('#localize()', function() {
		it('should return \'undefined\' when localize key not provided', function() {
			var shouldReturnUndefined = habla.localize();
			assert.equal(shouldReturnUndefined, undefined);
		});
	});

	describe('#localize(key)', function() {
		it('should return \'key\' when localized string libraries are not present', function() {
			var shouldReturnKey = habla.localize("key");
			assert.equal(shouldReturnKey, 'key');
		});

		it('should return \'This is a localized string\' from defaultLibrary for \'key\'', function() {
			var keyLibrary = { 'key': 'This is a localized string' };
			habla.setDefaultLibrary(keyLibrary);
			var shouldReturnThisIsLocalized = habla.localize('key');
			assert.equal(shouldReturnThisIsLocalized, 'This is a localized string');
		});
	});

	describe('#localize(key, language)', function() {
		it('should return \'This is a localized en string\' from enLibrary for \'key\' when language is \'en\'', function () {
			var enLibrary = { 'key': 'This is a localized en string' };
			habla.setLibrary(enLibrary, 'en');
			var shouldReturnLocalizedEn = habla.localize('key', 'en');
			assert.equal(shouldReturnLocalizedEn, 'This is a localized en string');
		});
	});

	var defaultLibrary = {};

	describe('#setDefaultLibrary(library)', function() {
		it('should set default library when called', function() {
			habla.setDefaultLibrary(defaultLibrary);
			var shouldReturnDefaultLibrary = habla.defaultLibrary;
			assert.equal(shouldReturnDefaultLibrary, defaultLibrary);
		});
	});

	describe('#setLibrary(forLibrary, language)', function() {
		it('should set library for \'en\' when called', function() {
			var enLibrary = { 'key': 'This is a localized en string' };
			habla.setLibrary(enLibrary, 'en');
			var shouldReturnEnLibrary = habla.libraries['en'];
			assert.equal(shouldReturnEnLibrary, enLibrary);
		})
	});
});
