var assert = require('assert');
var habla = require('../index.js')

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
		})
	});

	var defaultLibrary = {};

	describe('#setDefaultLibrary(library)', function() {
		it('should set default library when called', function() {
			habla.setDefaultLibrary(defaultLibrary);
			var shouldReturnDefaultLibrary = habla.defaultLibrary;
			assert.equal(shouldReturnDefaultLibrary, defaultLibrary);
		});
	});
});
