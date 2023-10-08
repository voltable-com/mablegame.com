/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-fc5f5acf'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "favicon-114.png",
    "revision": "66e458704aeaf30480e7e4136c0af13a"
  }, {
    "url": "favicon-120.png",
    "revision": "528c60790bfc46054aeb994af15fd33b"
  }, {
    "url": "favicon-144.png",
    "revision": "0df338ca85da185687714045938a853a"
  }, {
    "url": "favicon-152.png",
    "revision": "cb874d412cc3f427674f3c125c60a07e"
  }, {
    "url": "favicon-16.png",
    "revision": "a6bd1c693e69762ac99c913ccc1a6dc4"
  }, {
    "url": "favicon-180.png",
    "revision": "ecb19d311e5cf0473bd7f9bb2b3f4125"
  }, {
    "url": "favicon-192.png",
    "revision": "069749175e678b2ae64a367ec3621668"
  }, {
    "url": "favicon-250.png",
    "revision": "d6940ca1b6c5bd91b88c7425e7ace23e"
  }, {
    "url": "favicon-32.png",
    "revision": "7f1f1f150ae7f7448d82491f93982ed6"
  }, {
    "url": "favicon-325.png",
    "revision": "7e9c11c65fd4c82c34abc6608295aae3"
  }, {
    "url": "favicon-48.png",
    "revision": "a2f5f0e722615007d3ed13f27975ce0f"
  }, {
    "url": "favicon-512.png",
    "revision": "c1869605bdd6c4279bbfac7b51a0d79d"
  }, {
    "url": "favicon-57.png",
    "revision": "68ecb963f666473c25b5b61e5188ab28"
  }, {
    "url": "favicon-60.png",
    "revision": "01b5093875bb96a7378ee5ed2a156e3d"
  }, {
    "url": "favicon-72.png",
    "revision": "45f054fcb39fd34fb056fea6ca73e87e"
  }, {
    "url": "favicon-76.png",
    "revision": "552730b5114559e168073fb2592099f7"
  }, {
    "url": "favicon-96.png",
    "revision": "db46c48ed08966dc9cb64af6081872e3"
  }, {
    "url": "favicon.ico",
    "revision": "53d3a9ca2fe71cfac3b8d9eff7a4eec1"
  }, {
    "url": "favicon.png",
    "revision": "53d3a9ca2fe71cfac3b8d9eff7a4eec1"
  }, {
    "url": "favicon.svg",
    "revision": "7536b0eda62e2c06d45a31f1f1ee55c2"
  }, {
    "url": "humans.txt",
    "revision": "c0c62f629982b1e05bb101814f89df13"
  }, {
    "url": "img/mable.png",
    "revision": "66e458704aeaf30480e7e4136c0af13a"
  }, {
    "url": "/",
    "revision": "f3690ddb7cca1c7ee153d28424ae875a"
  }, {
    "url": "js/a.js",
    "revision": "abb64a8baaae5976882416ce3c4563be"
  }, {
    "url": "js/m.js",
    "revision": "b015bc9e978dc23b6ecbf9c2644e6c20"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "robots.txt",
    "revision": "5e0bd1c281a62a380d7a948085bfe2d1"
  }, {
    "url": "favicon.svg",
    "revision": "7536b0eda62e2c06d45a31f1f1ee55c2"
  }, {
    "url": "manifest.webmanifest",
    "revision": "990637790174d344a964c5d74b32ff89"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/")));

}));
