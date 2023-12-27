# Sharetreats V3 B2C Client for experimental

## Requirements
```
node : v12 or 14.18.3 above
vue : 3.xx
tailwindcss : 3.xx
```

```
# Command line with Administrator
$ nvm list
    16.15.0
    14.18.3 
  * 12.22.6 (Currently using 64-bit executable)
$ nvm use 14.18.3
$ node -v
v14.18.3
```
## Summary
```
src : Source folder
mock : mock server data folder
public : usage image/css/html(template) for vue
dist : after build, static html/css/js created in this directory (default configured)
```

## Install guide
```
# Check you node version
$ npm --version

# Update install packages by package.json
$ npm install
# -- OR If you have already package-lock.json use instead ci
$ npm ci
```

## Dev guide
```
# run local
$ npm run serve-loc
$ npm run mock

# build as local profile
$ npm run build-loc
```