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
})({10:[function(require,module,exports) {
/*
 * skills.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('skill', {
        props: ['skills', 'edit', 'save'],
        data: function () {
            return {
                editedSkills: undefined
            }
        },
        template: `
            <div class="row skills">
                <div class="col-12 text-center">
                    <h2>技能</h2>
                    <p class="site-en">Professional&nbsp;Skills</p>
                </div>
                <div class="col-12">
                    <ul class="list-unstyled d-flex flex-wrap">
                        <skill-item v-for="(item, index) in skills"
                                    :index="index"
                                    :skill="item"
                                    :edit="edit"
                                    :save="save"
                                    @remove="removeSkill"
                                    @save="saveSkills">
                        </skill-item>
                    </ul>
                </div>
                <div class="col-12 add-btn-wrapper">
                    <button type="button" v-show="edit" v-on:click="addSkill" class="btn btn-block btn-outline-primary">Add&nbsp;skill</button>
                </div>
            </div>
        `,
        updated() {
            if (this.editedSkills) {
                this.$emit('save', {
                    skills: this.editedSkills
                });
                this.editedSkills = undefined;
            }
        },
        watch: {
            save: function (newSave, oldSave) {
                if (newSave && typeof oldSave !== 'function') {
                    this.editedSkills = [];
                }
            }
        },
        methods: {
            addSkill() {
                this.$emit('add');
            },
            saveSkills(skill) {
                this.editedSkills.push(skill);
            },
            removeSkill(data) {
                this.$emit('remove', data);
            }
        }
    });
    Vue.component('skill-item', {
        props: ['index', 'skill', 'edit', 'save'],
        data: function () {
            return {
                index_: undefined,
                skill_: undefined
            }
        },
        template: `
            <li class="col-12 col-lg-6 col-xl-4">
                <div class="card border-primary">
                    <div class="card-header text-primary font-weight-bold">
                        <div v-show="!edit">{{skill.name}}</div>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">技能</span>
                            </div>
                            <input type="text" v-model="skill_.name" class="form-control" aria-label="default" aria-describedby="inputgroup-sizing-default">
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text" v-show="!edit">{{skill.desc}}</p>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">描述</span>
                            </div>
                            <textarea v-model="skill_.desc" class="form-control" aria-label="with textarea" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <button type="button" v-on:click="remove" class="close" v-show="edit" aria-label="close">
                    <span class="text-primary" aria-hidden="true">&times;</span>
                </button>
            </li>
        `,
        created() {
            this.index_ = this.index;
            this.skill_ = this.skill;
        },
        watch: {
            save: function (newsave) {
                if (newsave) {
                    this.$emit('save', this.skill_);
                }
            }
        },
        methods: {
            remove() {
                this.$emit('remove', {
                    skills: this.index_
                });
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
},{}]},{},[40,10])
//# sourceMappingURL=/dist/6e14bc617a967d05b674d8d0a91782a1.map