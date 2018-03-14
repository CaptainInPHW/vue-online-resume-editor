/*
 * name.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('name', {
        props: ['names', 'edit', 'save', 'refresh'],
        data: function () {
            return {
                names_: undefined
            }
        },
        template: `
            <div class="row name">
                <div class="col-12 text-center">
                    <h1 v-show="!edit">{{names}}</h1>
                    <div class="input-group mb-3" v-show="edit">
                        <div class="input-group-prepend">
                            <span class="input-group-text">姓名</span>
                        </div>
                        <input type="text" v-model="names_" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
            </div>
        `,
        created() {
            this.names_ = this.names;
        },
        beforeUpdate() {
            if (this.save || this.refresh) {
                this.names_ = this.names;
            }
        },
        watch: {
            save: function (newSave) {
                if (newSave) {
                    this.$emit('save', {
                        names: this.names_
                    });
                }
            }
        }
    });
}
