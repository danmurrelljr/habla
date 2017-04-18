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


