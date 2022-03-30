# Getting started

```sh
$ yarn install

$ cp .env.example .env
```

Do not forget to change the .env variables

## Running the app

### Start the API

```sh
yarn start
```

### Tests

```sh
yarn test
```

## Requests

The requests are hosted by hoppscotch, in order for hoppscotch to reach your `localhost` you need to install the browser extension :

[Chrome](https://chrome.google.com/webstore/detail/hoppscotch-browser-extens/amknoiejhlmhancpahfcfcfhllgkpbld)

[Firefox](https://addons.mozilla.org/en-US/firefox/addon/hoppscotch/)

### Endpoints

[/image-analysis](https://hopp.sh/r/lSwULy1KtRNf)

# Project management

## Branching strategy

The brancing strategy chosen is the trunk based strategy [(More info)](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development).

This strategy was chosen as it allows for fast iterations and small increments, this is essential for this project as it is a small project (8 weeks).

# FAQ

## Could not load default credentials on my dev environment

Running `gcloud auth application-default login` should fix the problem.
