'use strict';

var libraries = {};

var defaultLibrary = {};
var defaultLanguage = "en";

function localize(key, language, territory) {
	// if no language specified, use default
	if (language == undefined) {
		language = defaultLanguage;
	}

	// get appropriate library and retrieve localized string from the key
	// 		First, look in the full locale library.
	//		If not in the full locale library, look in the language library.
	//		If not found in the language library, look in the default library.
	//		If not found in the default library, return the key, since
	//		we have no localized string available.
	var locale;
	var localized;

	if (territory != undefined) {
		locale = language + "_" + territory;
	} else {
		locale = language;
	}

	var localeLibrary = libraries[locale];
	var languageLibrary = libraries[language];

	// look in locale library 
	if (localeLibrary != undefined) {
		localized = localeLibrary[key];
	}

	// if not found, look in language library
	if (localized == undefined && languageLibrary != undefined) {
		localized = languageLibrary[key];
	}

	// if not found, look in default library
	if (localized == undefined) {
		localized = defaultLibrary[key];
	}

	if (localized != undefined) {
		return localized;
	} else {
		return key;
	}
}

function setDefaultLibrary(library) {
	this.defaultLibrary = library;
}

module.exports = {
	localize: localize,
	defaultLibrary: defaultLibrary,
	setDefaultLibrary: setDefaultLibrary,

}
