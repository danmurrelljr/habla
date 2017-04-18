'use strict';

var assert = require('assert');
var Habla = require('../index.js')
var habla;

describe('Habla', function() {
	beforeEach('Initialize habla object', function() {
		habla = new Habla();
	});

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

		it('should return \'This is a localized string\' from enLibrary for \'key\' when en is default language and en library is set', function() {
			var enLibrary = { 'key': 'This is a localized en string' };
			habla.setLibrary(enLibrary, 'en');
			var shouldReturnThisIsLocalized = habla.localize('key');
			assert.equal(shouldReturnThisIsLocalized, 'This is a localized en string');
		});
	});

	describe('#localize(key, language)', function() {
		it('should return \'This is a localized en string\' from enLibrary for \'key\' when language is \'en\'', function () {
			var enLibrary = { 'key': 'This is a localized en string' };
			habla.setLibrary(enLibrary, 'en');
			var shouldReturnLocalizedEn = habla.localize('key', 'en');
			assert.equal(shouldReturnLocalizedEn, 'This is a localized en string');
		});

		it('should return \'This is a localized en string\' from enLibrary for \'key\' when language is \'undefined\'', function () {
			var enLibrary = { 'key': 'This is a localized en string when undefined' };
			habla.setLibrary(enLibrary, 'en');
			var shouldReturnLocalizedEn = habla.localize('key', undefined);
			assert.equal(shouldReturnLocalizedEn, 'This is a localized en string when undefined');
		});
	});

	describe('#localize(key, language, territory)', function() {
		it('should return \'This is a localized en_US string\' from enLibrary for \'key\' when language is \'en\' and territory is \'US\'', function () {
			var enUSLibrary = { 'key': 'This is a localized en_US string' };
			habla.setLibrary(enUSLibrary, 'en', 'US');
			var shouldReturnLocalizedEnUS = habla.localize('key', 'en', 'US');
			assert.equal(shouldReturnLocalizedEnUS, 'This is a localized en_US string');
		});
	});

	describe('#setDefaultLibrary(library)', function() {
		it('should set default library when called', function() {
			var defaultLibrary = {};
			habla.setDefaultLibrary(defaultLibrary);
			var shouldReturnDefaultLibrary = habla.defaultLibrary;
			assert.equal(shouldReturnDefaultLibrary, defaultLibrary);
		});
	});

	describe('#setDefaultLanguage(language)', function() {
		it('should set default language when called', function() {
			var es = "es";
			habla.setDefaultLanguage(es);
			var shouldReturnEsLanguage = habla.defaultLanguage;
			assert.equal(shouldReturnEsLanguage, es);
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

	describe('#setLibrary(forLibrary, language, territory)', function() {
		it('should set library for \'en\' and \'US\' when called', function() {
			var enUSLibrary = { 'key': 'This is a localized en_US string' };
			habla.setLibrary(enUSLibrary, 'en', 'US');
			var shouldReturnEnUSLibrary = habla.libraries['en_US'];
			assert.equal(shouldReturnEnUSLibrary, enUSLibrary);
		});
	});

	describe('#add(key, localized)', function() {
		it('should add \'localized\' for \'key\' to default library when called', function() {
			habla.add('default key', 'default localized');
			var shouldReturnDefaultLocalized = habla.localize('default key');
			assert.equal(shouldReturnDefaultLocalized, 'default localized');
		});
	});

	describe('#add(key, localized, language)', function() {
		it('should create a library for \'language\' if not exists when called', function() {
			habla.add('en key', 'en is localized', 'en');
			var shouldReturnEnLibrary = habla.libraries['en'];
			console.log("enLibrary: " + JSON.stringify(shouldReturnEnLibrary));
			assert.notEqual(shouldReturnEnLibrary, undefined);
		});

		it('should add \'localized\' for \'key\' to library for \'language\' when called', function() {
			habla.add('en key', 'en is localized', 'en');
			var enLibrary = habla.libraries['en'];
			var shouldReturnEnLocalized = enLibrary['en key'];
			assert.equal(shouldReturnEnLocalized, 'en is localized');
		});
	});

	describe('#add(key, localized, language, territory)', function() {
		it('should create a library for \'language\' and \'territory\' if not exists when called', function() {
			habla.add('en_US key', 'en_US is localized', 'en', 'US');
			var shouldReturnEnUSLibrary = habla.libraries['en_US'];
			assert.notEqual(shouldReturnEnUSLibrary, undefined);
		});

		it('should add \'localized\' for \'key\' to library for \'language\' and \'territory\' when called', function() {
			habla.add('en_US key', 'en_US is localized', 'en', 'US');
			var shouldReturnEnUSLibrary = habla.libraries['en_US'];
			var shouldReturnEnUSLocalized = shouldReturnEnUSLibrary['en_US key'];
			assert.equal(shouldReturnEnUSLocalized, 'en_US is localized');
		});
	});
});
