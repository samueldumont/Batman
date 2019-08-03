const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/saplingmats/Projects/Batman/frontend/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/saplingmats/Projects/Batman/frontend/src/pages/index.js"))),
  "component---src-pages-sightings-create-js": hot(preferDefault(require("/Users/saplingmats/Projects/Batman/frontend/src/pages/sightings/create.js"))),
  "component---src-pages-sightings-view-js": hot(preferDefault(require("/Users/saplingmats/Projects/Batman/frontend/src/pages/sightings/view.js")))
}

