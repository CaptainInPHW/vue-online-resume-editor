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
