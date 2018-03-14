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
        template: `
            <li class="col-12 col-lg-6 col-xl-4">
                <div class="card border-primary">
                    <div class="card-header text-primary font-weight-bold">
                        <div v-show="!edit">{{skill.name}}</div>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">技能</span>
                            </div>
                            <input type="text" v-model="skill.name" class="form-control" aria-label="default" aria-describedby="inputgroup-sizing-default">
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text" v-show="!edit">{{skill.desc}}</p>
                        <div class="input-group" v-show="edit">
                            <div class="input-group-prepend">
                                <span class="input-group-text">描述</span>
                            </div>
                            <textarea v-model="skill.desc" class="form-control" aria-label="with textarea" rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <button type="button" v-on:click="remove" class="close" v-show="edit" aria-label="close">
                    <span class="text-primary" aria-hidden="true">&times;</span>
                </button>
            </li>
        `,
        watch: {
            save: function (newsave) {
                if (newsave) {
                    this.$emit('save', this.skill);
                }
            }
        },
        methods: {
            remove() {
                this.$emit('remove', {
                    skill: this.index
                });
            }
        }
    });
}
