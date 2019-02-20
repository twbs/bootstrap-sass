# tatami

All commands are run at PROJECT_ROOT.

### Develop
Changes to the files in the following directories are monitored and rebuilt.
- assets/
- demo/tatami/src/client/

The local server also starts up on port 2500.

```
$ npm run watch
```

Open http://localhost:2500/ in your browser.

### Deploy to GitHub Pages
Static files will be generated in `./demo/tatami/gh-pages/` and deployed to the `origin/gh-pages` branch.
```
$ npm run gh-pages
```

#### Demos
- https://nota.github.io/tatami/
- https://nota.github.io/tatami/default.html
