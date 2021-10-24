# github-touch - <img src="https://img.shields.io/npm/v/github-touch.svg?maxAge=3600" alt="version"><img src="https://img.shields.io/npm/dt/github-touch.svg?maxAge=3600" alt="download">
[docs](https://githubtouch.js.org)
[npm](https://npmjs.com/package/github-touch)
> Thanks to [js.org](https://github.com/js-org/js.org)

# quick docs

## Installation
you must install github-touch first via npm package and call github-touch - read this
```
npm i github-touch
```
```js
const GithubTouch = require("github-touch")
```

## Documentations
### .searchTopic()
search any topic in github

#### parameters: `Query`
#### return: `JSON`
```js
.searchTopic('github')
```

### .getUser()
get a github user information

#### parameters: `Username`
#### return: `Object`
```js
.getUser('Vins2106')
```

### .getUserRepos()
get a user repositories

#### parameters: `Username`, `?RepoName`
#### return: `JSON`, `?Object`
```js
.getUserRepos('Vins2106')
```

### .getUserGists()
get a user gists

#### parameters: `Username`, `?GistId`
#### return: `JSON`, `?Object`
```js
.getUserGists('Vins2106')
```

### .getOrg()
get a github organization

#### parameters: `OrganizationName`
#### return: `Object`
```js
.getOrg(bellshade')
```

### .getOrgRepos()
get a github organization repositories

#### parameters: `OrganizationName`, `?RepoName`
#### return: `JSON`, `Object`
```js
.getOrgRepos('bellshade')
```

### .getOrgTeams() (disabled)
get a github organization teams

#### parameters: `OrganizationName`
#### return: `JSON`
```js
.getOrgTeams('bellshade')
```
