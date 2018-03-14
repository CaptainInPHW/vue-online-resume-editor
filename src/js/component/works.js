/*
 * works.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('work', {
        props: ['works', 'edit', 'save'],
        data: function () {
            return {
                editedWorks: undefined
            }
        },
        template: `
            <div class="row works">
                <div class="col-12 text-center">
                    <h2>作品</h2>
                    <p class="site-en">Portfolio&nbsp;Show</p>
                </div>
                <div class="col-12">
                    <ul class="list-unstyled d-flex flex-wrap">
                        <work-item v-for="(item, index) in works"
                                   :index="index"
                                   :work="item"
                                   :edit="edit"
                                   :save="save"
                                   @remove="removeWork"
                                   @save="saveWorks">
                        </work-item>
                    </ul>
                </div>
                <div class="col-12 add-btn-wrapper">
                    <button type="button" v-show="edit" v-on:click="addWork" class="btn btn-block btn-outline-primary">Add&nbsp;work</button>
                </div>
            </div>
        `,
        updated() {
            if (this.editedWorks) {
                this.$emit('save', {
                    works: this.editedWorks
                });
                this.editedWorks = undefined;
            }
        },
        watch: {
            save: function (newSave, oldSave) {
                if (newSave && typeof oldSave !== 'function') {
                    this.editedWorks = [];
                }
            }
        },
        methods: {
            addWork() {
                this.$emit('add');
            },
            saveWorks(work) {
                this.editedWorks.push(work);
            },
            removeWork(data) {
                this.$emit('remove', data);
            }
        }
    });
    Vue.component('work-item', {
        props: ['index', 'work', 'edit', 'save'],
        template: `
            <li class="col-xl-6">
                <div class="card border-primary">
                    <div class="card-header text-primary font-weight-bold">
                        <div v-show="!edit">
                            <u><a v-bind:href="work.link">{{work.name}}</a></u>
                        </div>
                        <div class="input-group mb-3" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">作品</span>
                            </div>
                            <input type="text" v-model="work.name" class="form-control" aria-label="Default"
                                   aria-describedby="inputGroup-sizing-default">
                        </div>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">链接</span>
                            </div>
                            <input type="text" v-model="work.link" class="form-control" aria-label="Default"
                                   aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text" v-show="!edit">{{work.desc}}</p>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">说明</span>
                            </div>
                            <textarea v-model="work.desc" class="form-control" aria-label="With textarea" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <button type="button" v-show="edit" v-on:click="remove" class="close" aria-label="Close">
                    <span class="text-primary" aria-hidden="true">&times;</span>
                </button>
            </li>
        `,
        watch: {
            save: function (newSave) {
                if (newSave) {
                    this.$emit('save', this.work);
                }
            }
        },
        methods: {
            remove() {
                this.$emit('remove', {
                    work: this.index
                });
            }
        }
    })
}

