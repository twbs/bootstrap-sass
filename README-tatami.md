# tatami

All commands are run at PROJECT_ROOT.

### Develop
Changes to the files in the following directories are monitored and rebuilt.
- assets/
- demo/tatami/src/client/

The local server also starts up on port 2500.

```
$ npm run watch-demo
```

Open http://localhost:2500/ in your browser.

If the first time, you need to run:
```
$ npm run prepare-demo
```

### Update github pages
Before push to master branch, run below command.
```
$ npm run build-demo
```
