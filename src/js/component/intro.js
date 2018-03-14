/*
 * intro.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('intro', {
        props: ['intros', 'edit', 'save', 'refresh'],
        data: function () {
            return {
                intros_: undefined
            }
        },
        template: `
            <div class="row introduction">
                <div class="col-12 text-center">
                    <p v-show="!edit" class="text-primary">{{intros}}</p>
                    <div class="input-group mb-3" v-show="edit">
                        <div class="input-group-prepend">
                            <span class="input-group-text">简介</span>
                        </div>
                        <input type="text" v-model="intros_" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
            </div>
        `,
        created() {
            this.intros_ = this.intros;
        },
        beforeUpdate() {
            if (this.save || this.refresh) {
                this.intros_ = this.intros;
                if (this.refresh) {
                    this.$emit('loaded');
                }
            }
        },
        watch: {
            save: function (newPropsave) {
                if (newPropsave) {
                    this.$emit('save', {
                        intros: this.intros_
                    });
                }
            }
        }
    })
}
