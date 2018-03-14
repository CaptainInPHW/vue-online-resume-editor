require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({7:[function(require,module,exports) {
Vue.component("navigation",{props:["login","share"],template:'\n            <div v-show="!share" class="fixed-top site-nav">\n                <nav class="navbar navbar-expand-md navbar-light">\n                    <a class="navbar-brand text-primary site-logo" href="javascript: void(0);">Resume&nbsp;editor</a>\n                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n                        <span class="navbar-toggler-icon"></span>\n                    </button>\n                    <div class="collapse navbar-collapse" id="navbarSupportedContent">\n                        <ul class="navbar-nav mr-auto nav-list">\n                            <li v-show="login" class="nav-item edit-btn">\n                                <a @click.prevent="edit" class="nav-link text-primary" href="javascript: void(0);">Edit</a>\n                            </li>\n                            <li v-show="login" class="nav-item prev-btn">\n                                <a @click.prevent="save" class="nav-link text-primary" href="javascript: void(0);">Save</a>\n                            </li>\n                            <li v-show="login" class="nav-item print-btn">\n                                <a @click.prevent="print" class="nav-link text-primary" href="javascript: void(0);">Print</a>\n                            </li>\n                            <li v-show="login" class="nav-item download-btn">\n                                <a @click.prevent="onClickShare" class="nav-link text-primary" href="javascript: void(0);">Share</a>\n                            </li>\n                        </ul>\n                        <router-link to="/signin" v-show="!login" class="btn btn-outline-primary my-2 my-sm-0 login-btn" role="button">Sign&nbsp;in</router-link>\n                        <button v-show="login" @click="signOut" class="btn btn-outline-danger my-2 my-sm-0 login-btn" role="button">Sign&nbsp;out</button>\n                    </div>\n                </nav>\n            </div>\n        ',methods:{edit(){this.$emit("edit")},save(){this.$emit("save")},print(){this.$emit("print")},onClickShare(){this.$emit("share")},signOut(){this.$emit("signout")}}});
},{}]},{},[7])