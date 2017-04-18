# Habla - Easy Localization for Chatbots

Habla is designed to help digital entities such as chatbots add support for multiple languages.
It is based on localization used in the mobile application world.

Habla allows the designer of a chatbot's conversational user interface to defer writing the actual text until later, using key-value pairs to separate user-facing text from code. In your bot code, every response can be keyed using a language-neutral key, allowing the bot to then look up the actual user-facing text for the user's locale via the key.

As long as a set of keyed values exist for a locale (or a suitable default), the bot should be able to look up its responses on demand before sending to the user.

Some entities like dates and numbers, should be localized separately from regular text. They can be subsequently inserted in sentences after being localized.

## How

Habla builds a dictionary of responses for each language the chatbot supports. The format uses simple key-value pairs.

Under the hood, a library with support for English and Spanish is stored as:

```
{
	"en": {
		"hello": "Hi! How are you?"
	},
	"es": {
		"hello": "¡Hola! ¿Cómo estás?"
	}
}
```

Habla also supports regional territory variations on a language, such as Australian English:

```
{
	"en_AU": {
		"hello": "G'day! How ya goin'?"
	}
}
```

## Best practices

A best practice from mobile app development when dealing with localized strings is that strings should be unique for the context where they're used, and it should be glaringly obvious that they're untranslated. 

One way to accomplish both is to use name-spaced keys. For example,

```"greeting.first-time-user.ask-name" = "Hi there! I don't believe we've met before. My name is Bottie, what's yours?"```

The string has an English translation, but what if the user is chatting with a bot in Spanish? Instead of seeing a friendly greeting, they should see the key itself.

## Usage

Habla uses two libraries. One library is designed for the various languages you will support, while the other is a default library for responses that are not categorized for any particular language. 

### Default Library

To set the default library, use:

```
var Habla = require('habla');
var habla = new Habla();

var myDefaultLibrary = { "key": "value", "key2": "value2", "key3": "value3" };
habla.setDefaultLibrary(myDefaultLibrary);
```

### Language Libraries

When setting a language library, you can specify just a language, or both a language and a territory. Habla combines language and territory in the format `{language}_{territory}`. For example, `"en_US"`. You can also specify both in one parameter. 

To set libraries, use:

```
var myEnLibrary = { "en key": "en value", "en key2": "en value2", "en key3": "en value3" };
habla.setLibrary(myEnLibrary, "en");
```

```
var myEnUSLibrary = { "en US key": "en US value", "en US key2": "en US value2", "en US key3": "en US value3" };
habla.setLibrary(myEnUSLibrary, "en", "US");
```

### Default Language

Habla supports a default language, initially set to "en" (English). To change the default language, call:

`habla.setDefaultLanguage(language);`

### Retrieving Localized Text

To retrieve a localized string from the library, use:

`var string = habla.localize(key[, language, territory]);`

Language and territory are optional parameters. If Habla cannot find the correct localized string, it will return the original requested key. A benefit is it will allow you to easily identify strings that have not been localized, due to a typo or having been missed.

When Habla is searching for a localized string, the order it searches the libraries is:

1. If language and territory is given, check the language_Territory library and return the value for matching key.
2. If not found and language is given, check the language library and return the value for matching key.
3. If not found, check the default library and return the value for matching key.
4. Return the key.

### Adding and Removing Keys

Habla allows you to individually add and remove a key from the libraries.

To add a key, use:

`habla.add(key, value[, language, territory]);`

Language and territory are optional, and if not provided, the key is added to the default library. If a language library doesn't currently exist, one will be created.

To remove a key, use:

`habla.remove(key[, language, territory]);`

Language and territory are optional, and if not provided, the key is removed from the default library.

## Tests

Habla uses mocha for unit tests. To run all tests, use:

`npm test`

## Future Enhancements

