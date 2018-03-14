// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({9:[function(require,module,exports) {
/*
 * contact.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('contact', {
        props: ['contacts', 'edit', 'save'],
        data: function () {
            return {
                editedContacts: undefined
            }
        },
        template: `
            <div class="row contact">
                <div class="col-12 text-center">
                    <h2>联系</h2>
                    <p class="site-en">Contact&nbsp;Information</p>
                </div>
                <div class="col-12 contact-list">
                    <div class="card border-primary">
                        <div class="card-body">
                            <ul class="list-unstyled d-flex flex-wrap justify-content-center">
                                <contact-item v-for="(content, keyword, index) in contacts"
                                              v-bind:index="index"
                                              v-bind:keyword="keyword"
                                              v-bind:content="content"
                                              v-bind:edit="edit"
                                              v-bind:save="save"
                                              v-on:save="saveContacts">
                                </contact-item>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `,
        updated() {
            if (this.editedContacts) {
                this.$emit('save', {
                    contacts: this.editedContacts
                });
                this.editedContacts = undefined;
            }
        },
        watch: {
            save: function (newSave, oldSave) {
                if (newSave && typeof oldSave !== 'function') {
                    this.editedContacts = {};
                }
            }
        },
        methods: {
            addSkill() {
                this.$emit('add');
            },
            saveContacts({keyword, content}) {
                if (!(keyword in this.editedContacts)) {
                   this.editedContacts[keyword] = content;
                }
            },
        }
    });
    Vue.component('contact-item', {
        props: ['index', 'keyword', 'content', 'edit', 'save'],
        data: function () {
            return {
                classes: [
                    "iconfont icon-qq text-primary",
                    "iconfont icon-wechat text-primary",
                    "iconfont icon-tel02 text-primary",
                    "iconfont icon-mail text-primary",
                    "iconfont icon-blog text-primary",
                    "iconfont icon-github text-primary"
                ],
                links: [
                    'javascript: void(0);',
                    'javascript: void(0);',
                    'tel:',
                    'mailto:',
                    '',
                    ''
                ],
                content_: undefined
            }
        },
        template: `
            <li class="col-12 col-md-6 col-lg-2">
                <div v-show="!edit && (keyword === 'QQ' || keyword === 'WeChat')">
                    <i v-bind:class="classes[index]"></i>{{content}}
                </div>
                <div v-show="!edit && keyword !== 'QQ' && keyword !== 'WeChat'">
                    <i v-bind:class="classes[index]"></i>
                    <u><a v-bind:href="links[index] + content" class="text-dark">{{content}}</a></u>
                </div>
                <div class="input-group" v-show="edit">
                    <div class="input-group-prepend">
                        <span class="input-group-text">{{keyword}}</span>
                    </div>
                    <input type="text" v-model="content_" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>
            </li>
        `,
        created() {
            this.content_ = this.content;
        },
        watch: {
            save: function (newSave) {
                if (newSave) {
                    this.$emit('save', {
                        keyword: this.keyword,
                        content: this.content_
                    });
                }
            }
        },
        methods: {
            remove(e) {
                console.log(e.path[2]);
                // e.path[2].remove()
            }
        }
    });
}

},{}],40:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '51693' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[40,9])
//# sourceMappingURL=/dist/fbdb8180741ee3eee8e0e91548a3ed6c.map