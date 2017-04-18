
module.exports = Habla;
function Habla() {
	this.libraries = {};
	this.defaultLibrary = {};
	this.defaultLanguage = 'en';
}

Habla.prototype.localize = function (key, language, territory) {
	// if no language specified, use default
	if (language === undefined) {
		language = this.defaultLanguage;
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

	var localeLibrary = this.libraries[locale];
	var languageLibrary = this.libraries[language];

	// look in locale library 
	if (localeLibrary != undefined) {
		localized = localeLibrary[key];
	}

	// if not found, look in language library
	if (localized === undefined && languageLibrary != undefined) {
		localized = languageLibrary[key];
	}

	// if not found, look in default library
	if (localized === undefined) {
		localized = this.defaultLibrary[key];
	}

	if (localized != undefined) {
		return localized;
	} else {
		return key;
	}
}

Habla.prototype.setDefaultLanguage = function (language) {
	this.defaultLanguage = language;
}

Habla.prototype.setDefaultLibrary = function (library) {
	this.defaultLibrary = library;
}

Habla.prototype.setLibrary = function (library, language, territory) {
	if (language != undefined && territory != undefined) {
		this.libraries[language + '_' + territory] = library;
	} else if (language != undefined) {
		this.libraries[language] = library;
	}
}

Habla.prototype.add = function(key, localized, language, territory) {
	if (key != undefined && language != undefined && territory != undefined) {
		if (this.libraries[(language + '_' + territory)] === undefined) {
			this.libraries[language + '_' + territory] = {};
		}
		this.libraries[language + '_' + territory][key] = localized;
	} else if (key != undefined && language != undefined) {
		if (this.libraries[language] === undefined) {
			this.libraries[language] = {};
		}
		this.libraries[language][key] = localized;
	} else if (key != undefined) {
		this.defaultLibrary[key] = localized;
	}
}

Habla.prototype.remove = function(key, language, territory) {
	if (key != undefined && language != undefined && territory != undefined) {
		if (this.libraries[(language + '_' + territory)] !== undefined) {
		this.libraries[language + '_' + territory][key] = undefined;
		}
	} else if (key != undefined && language != undefined) {
		if (this.libraries[language] !== undefined) {
			this.libraries[language][key] = undefined;
		}
	} else if (key != undefined) {
		this.defaultLibrary[key] = undefined;
	}
}
