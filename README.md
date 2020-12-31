# [Piala](http://3dphantom.pascaliaasia.com/)

## Prerequisite
- Prefer Node >= v13.

- Install dependencies
`yarn`

- VScode (strongly recommend)


## Installation 
To install, using:
```
yarn install
```

## Development
### Starting
To start, using:
```
yarn dev
```

## Migration
### Create a new migration
You can create a new migration using CLI:
```
yarn migrate:create [name of file]
e.g: yarn migrate:create Campaign
```


### Run Bundle
```
yarn run run-webpack
```

### Run eslint check
```
yarn run lint
```

### Run prettier format
```
yarn run prettier
```

### Git Convention
- **If you havent run install with yarn, please run, this to setup the git hooks properly**
```
yarn install
```
- Create a branch with your task is feature or fix bug, for example feature, maintenance
```
git branch feature/live-call
```
- Commit with
```
git commit -m "Your commit message"
```
- The message will be automatically formatted as
```
feature/live-call: Your commit message
```
- Also, linting will be trigger when pre-committing, to make sure no linting error

