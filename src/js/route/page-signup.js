/*
 * page-signup.js
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
                <form @submit.prevent="signUp($event)">
                    <p class="logo font-italic text-primary font-weight-bold">Vue&nbsp;Resume&nbsp;Editor</p>
                    <p class="slogan font-italic text-primary text-right font-weight-light">New&nbsp;jobs,&nbsp;new&nbsp;lives</p>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="example@mail.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Enter a password">
                    </div>
                    <div class="form-group">
                        <label>Comfirm&nbsp;password</label>
                        <input type="password" class="form-control" placeholder="Comfirm your password">
                    </div>
                    <button type="submit" class="btn btn-block btn-primary submit">Sign&nbsp;up</button>
                    <small class="form-text text-danger font-weight-light">Please remember your account and password, this site does not support the recovery.</small>
                </form>
            </div>
            <div class="col-12 col-md-8 col-lg-5 mx-auto text-center tip">
                Already&nbsp;have&nbsp;an&nbsp;account?&nbsp;
                <router-link to="/signin" class="text-primary font-weight-bold submit-btn">Sign&nbsp;in</router-link>
            </div>
        </div>
    </div>
    `,
    methods: {
        signUp(event) {
            let {username, password} = this.parseUserData(event);
            let User = new AV.User();
            User.setUsername(username);
            User.setPassword(password);
            User.setEmail(username);
            User.signUp().then(
                (user) => {
                    console.log(user.toJSON());
                    this.$emit('signupsuccess', user.toJSON());
                    this.$router.push('/edit');
                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: "Let's begin to make your first resume.",
                    })
                },
                (error) => {
                    switch (error.code) {
                        case 203:
                            swal({
                                type: 'error',
                                title: 'Sorry...',
                                text: 'The Email already exists!',
                                footer: `<p>If you already signed up, please click the <b style="color: #007bff;">Sign In</b> option below!</p>`,
                            });
                            break;
                    }
                }
            );
        },
        parseUserData(event) {
            let [username, password, comfirm] = [event.target[0].value, event.target[1].value, event.target[2].value];
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
            } else if (comfirm === '') {
                swal({
                    type: 'warning',
                    text: 'Please comfirm your password!',
                });
                return false;
            } else if (password !== comfirm) {
                swal({
                    type: 'error',
                    text: 'The password is inconsistent!',
                });
            } else {
                return {
                    username: username,
                    password: password
                };
            }
        },
    }
}
