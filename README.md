# Fryd

Disclaimer: Fryd is in Beta and we can not guarantee everything working. We appreciate any feedback and bug reports a lot.

## About

This library is meant to help you implement the Fryd gamification platform into your Javascript project.

You can find an API description in german here: http://publicwiki.fryd.zone/index.php?title=Schnittstellen_Beschreibung

To use it you have to create a developer account on https://www.fryd.zone/register

## Installation

Install with yarn or `npm install`.

## Usage

The Fryd API is limited to 10 requests per second and a burst of 20 requests right now which are defaulted to if you instantiate a Fryd class without parameters.

It is promised based and based on the `request` library.

Basically you use it like this:

```
var Fryd = require('fryd');

var fryd = new Fryd(20, 10);

fryd.getTrophiesFromList('<token>', '<id>')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
```

## Methods

### Application

#### getTrophiesFromList(appToken, id)

Returns all trophies provided a valid trophy list id.

#### getTrophyLists(appToken, id)

Returns all tropy lists provided a valid location id.

#### getLocationInfo(appToken, id)

Returns the location info from a valid location id.

#### getTrophyInfo(appToken, id)

Returns the info provided a valid trophy id.

### User

#### getUserInfo(userToken)

As the token has the user information encoded you can call this method to get all public info.

#### postTrophySuccess(userToken, appToken, location, secret)

Method to post a successfull achievment. Find the trophy information in the developer dashboard.

#### getAllUserTrophies(userToken)

Get all trophies a user achieved.

### OAuth2

You can find Info to the OAuth2 implementation on Fryd here http://publicwiki.fryd.zone/index.php?title=OAuth2

Use the passport-fryd library for easy authentication in every middleware based framework like express. https://www.npmjs.com/package/passport-fryd

#### getTokenFromClientCred(clientId, clientSecret, state)

Use to request an access token from client credentials that you can find in the developer dashboard.

#### getTokenFromCode(code, redUri, clientId, clientSecret, state)

You get a code from the first OAuth2 callback if you need access to a user method For example for authentification with Fryd directly from your application). With that code and a redirection url you can call this method to be granted an access token and refresh token.

#### getTokenFromCodeRefreshToken(refreshToken, clientId, clientSecret, state)

Get a new access token from a refresh token. Access token expire after 24h and refresh token expire after 72h.
