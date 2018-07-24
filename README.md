# TSS Inventory app Frontend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The following are required installed and set up before starting this app

```
NODE
```

### Installing

To start this app, perform the following step in order

1. Clone this repo to your machine 
```
git clone https://samcyn@bitbucket.org/tssdevs1/inventory-management.git

```
2. run "npm install" on the root directory of the project

```
npm install
```

3. Run the command "npm run dev"
```
npm run dev
```


## Deployment

The steps highlighted are use to deploy to Heroku via the command line


1. run "heroku config:set NPM_CONFIG_PRODUCTION=false" on the root directory of the project
```
heroku config:set NPM_CONFIG_PRODUCTION=false
```
2. run "heroku config:set HOST=0.0.0.0" on the root directory of the project
```
heroku config:set HOST=0.0.0.0
```
3. run "heroku config:set NODE_ENV=production" on the root directory of the project
```
heroku config:set NODE_ENV=production
```
4. run "git push heroku master" on the root directory of the project
```
git push heroku master
```
## Built With

* [Vue JS](http://www.vuejs.org) - The Progressive JavaScript Framework
* [Nuxt JS](https://www.nuxtjs.org/) - Universal Vue.js Applications
* [Bulma](https://www.bulma.io) - CSS framework based on Flexbox
