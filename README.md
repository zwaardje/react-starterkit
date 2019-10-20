Starter kit
==========================

Prerequisites
-------------

- Git client of your choice
- NodeJS (Installation through brew(macos)/chocolatey(windows) recommended)

Install
-------

- Clone project from https://github.com/
- Run `npm i` to install NPM dependencies
- Test project with `npm run test`

NPM Commands
------------

- `storybook`: Storybook development environment
- `build-storybook`: Generate static storybook environment
- `deploy-storybook`: Deploy storybook to github pages,
- `serve-storybook`: Server production build of storybook locally
- `build`:Build webpack production variant of the application
- `dev`: Start local webpack dev environment
- `proxy`: Starts up a proxy server for the actual backend (needed for cors settings). *Note that the production env is currently proxied*
- `test` :Execute jest snapshot testing for the storybook components
- `lint`: Lints all typscript

### Publish storybook

1. `npm run deploy-storybook`: Deploys the production build of storybook to github page


### Versioning

Npm versioning will update the packjson and package-lock file. This will help with versioning of the state saved in the local storage. A new version will trigger a reset of a clean state given there might have been state changes on which the application could fail.

`npm version patch` 0.0.x
`npm version minor` 0.x.0
`npm version major` x.0.0

### Hygen Timesavers
We’ve added [hygen](http://www.hygen.io/), the scalable code generator that saves you time, to the stack so that you can quickly generate a __new__ component using our component standard, which is reflected in the component structure outputted by the command.

Below is an example of issuing the command to create an `atom` component called `my-component`.

```sh
npx hygen modules component --name my-component --type atom
```

#### options - type
* `atom`
* `molecule`
* `organism`
* `page`
