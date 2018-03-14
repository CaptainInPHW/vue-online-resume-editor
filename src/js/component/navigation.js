/*
 * navigation.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

{
    Vue.component('navigation', {
        props: ['login', 'share'],
        template: `
            <div v-show="!share" class="fixed-top site-nav">
                <nav class="navbar navbar-expand-md navbar-light">
                    <a class="navbar-brand text-primary site-logo" href="javascript: void(0);">Resume&nbsp;editor</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto nav-list">
                            <li v-show="login" class="nav-item edit-btn">
                                <a @click.prevent="edit" class="nav-link text-primary" href="javascript: void(0);">Edit</a>
                            </li>
                            <li v-show="login" class="nav-item prev-btn">
                                <a @click.prevent="save" class="nav-link text-primary" href="javascript: void(0);">Save</a>
                            </li>
                            <li v-show="login" class="nav-item print-btn">
                                <a @click.prevent="print" class="nav-link text-primary" href="javascript: void(0);">Print</a>
                            </li>
                            <li v-show="login" class="nav-item download-btn">
                                <a @click.prevent="onClickShare" class="nav-link text-primary" href="javascript: void(0);">Share</a>
                            </li>
                        </ul>
                        <router-link to="/signin" v-show="!login" class="btn btn-outline-primary my-2 my-sm-0 login-btn" role="button">Sign&nbsp;in</router-link>
                        <button v-show="login" @click="signOut" class="btn btn-outline-danger my-2 my-sm-0 login-btn" role="button">Sign&nbsp;out</button>
                    </div>
                </nav>
            </div>
        `,
        methods: {
            edit() {
                this.$emit('edit');
            },
            save() {
                this.$emit('save');
            },
            print() {
                this.$emit('print');
            },
            onClickShare() {
                this.$emit('share');
            },
            signOut() {
                this.$emit('signout');
            }
        }
    })
}
