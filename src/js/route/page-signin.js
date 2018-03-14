/*
 * page-signin.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
import AV from 'leancloud-storage';
import swal from 'sweetalert2';

export default {
    template: `
    <div class="signin-wrapper d-flex flex-column align-content-center justify-content-center">
        <div class="container">
            <div class="col-12 col-md-8 col-lg-5 mx-auto" style="padding: 0;">
                <form @submit.prevent="signIn($event)">
                    <p class="logo font-italic text-primary font-weight-bold">Vue&nbsp;Resume&nbsp;Editor</p>
                    <p class="slogan font-italic text-primary text-right font-weight-light">New&nbsp;jobs,&nbsp;new&nbsp;lives</p>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="username" class="form-control" aria-describedby="emailHelp" placeholder="example@mail.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Enter password">
                    </div>
                    <button type="submit" class="btn btn-block btn-primary submit">Sign&nbsp;in</button>
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </form>
            </div>
            <div class="col-12 col-md-8 col-lg-5 mx-auto text-center tip">
                Don't&nbsp;have&nbsp;an&nbsp;account?&nbsp;
                <router-link to="/signup" class="text-primary font-weight-bold">Sign&nbsp;up</router-link>
            </div>
        </div>
    </div>
    `,
    methods: {
        signIn(event) {
            let user = this.parseUserData(event);
            this.isUserExist(user);
        },
        parseUserData(event) {
            let [username, password] = [event.target[0].value, event.target[1].value];
            if (username === '') {
                swal({
                    type: 'warning',
                    text: 'Email is required!',
                });
                return false;
            } else if (password === '') {
                swal({
                    type: 'warning',
                    text: 'Password is required!',
                });
                return false;
            } else {
                return {
                    username: username,
                    password: password
                };
            }
        },
        isUserExist({username, password}) {
            if (username && password) {
                AV.User.logIn(username, password).then(
                    (user) => {
                        this.$emit('signinsuccess', user.toJSON());
                        this.$router.push('/edit');
                    },
                    (error) => {
                        switch (error.code) {
                            case 211:
                                swal({
                                    type: 'error',
                                    title: 'Oop...',
                                    text: 'Email does not exist!',
                                    footer: `<p>If you are a new user, please click the <b style="color: #007bff;">Sign Up</b> option below!</p>`,
                                });
                                break;
                            case 210:
                                swal({
                                    type: 'error',
                                    title: 'Sorry...',
                                    text: 'The password is wrong! Please try again!',
                                });
                                break;
                            case undefined:
                                swal({
                                    type: 'warning',
                                    text: '登录操作过频繁，请稍后再试！'
                                });
                                break;
                        }
                    }
                );
            }
        },
    }
}
