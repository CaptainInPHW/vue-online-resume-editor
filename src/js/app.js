/*
 * app.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

import AV from 'leancloud-storage';
import swal from 'sweetalert2';
import router from './route/router';

{
    Vue.config.devtools = true;
    let app = new Vue({
        el: '#editor',
        router,
        data: {
            login: false,
            edit: false,
            save: false,
            share: false,
            refresh: true,
            currentUser: undefined,
            resume: {},
            default: {
                names: 'Hello!',
                intros: 'Welcome to online resume editor! If you want to make your resume, please click the 【Sign in】 button upper right.',
                contacts: {
                    QQ: '12345567890',
                    WeChat: 'wechatID',
                    Tel: '18888888888',
                    Mail: 'example@mail.com',
                    Blog: 'http://example.blog.com/',
                    GitHub: 'http://github.com/'
                },
                skills: [
                    {name: 'HTML', desc: '熟练掌握 HTML ...'},
                    {name: 'CSS', desc: '熟练掌握 CSS...'},
                    {name: 'JavaScript', desc: '熟练掌握 JavaScript...'}
                ],
                works: [
                    {name: 'HTML', link: 'http://example.html.com', desc: 'HTML 作品...'},
                    {name: 'CSS', link: 'http://example.css.com', desc: 'CSS 作品...'},
                    {name: 'JavaScript', link: 'http://example.javascript.com', desc: 'JavaScript 作品...'},
                ]
            }
        },
        updated() {
            if (this.save) {
                let user = AV.Object.createWithoutData('_User', this.currentUser);
                user.set('resume', this.resume);
                user.save();
            }
        },
        methods: {
            init() {
                this.initLeanCloud();
                this.initData();
            },
            initLeanCloud() {
                let APP_ID = '7xLRJmuuHmPsOaEr9jiHussB-gzGzoHsz';
                let APP_KEY = 'maekXbNkQ2ODAr9A5BPKRzDy';
                AV.init({
                    appId: APP_ID,
                    appKey: APP_KEY
                });
            },
            initData() {
                let isShare = this.isShare();
                let user = AV.User.current();
                if (isShare) {
                    let query = new AV.Query('_User');
                    query.get(isShare).then(
                        (userData) => {
                            let latestUserData = userData.toJSON();
                            this.resume = latestUserData.resume;
                            this.login = true;
                            this.save = false;
                            this.share = true;
                        },
                        (error) => {
                            switch (error.code) {
                                case 211:
                                    swal({
                                        type: 'error',
                                        title: 'Sorry...',
                                        text: 'The share link is invalid!'
                                    });
                                    break;
                            }
                            this.resume = this.default;
                            this.login = false;
                            this.share = false;
                        }
                    );
                } else if (user) {
                    this.currentUser = user.toJSON().objectId;
                    let query = new AV.Query('_User');
                    query.get(this.currentUser).then(
                        (userData) => {
                            let latestUserData = userData.toJSON();
                            this.resume = latestUserData.resume;
                            this.login = true;
                            this.save = false;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                } else {
                    this.resume = this.default;
                    this.login = false;
                    this.share = false;
                }
            },
            isShare() {
                let regexp = /uid=([^$]+)/;
                let uid = window.location.hash.match(regexp);
                if (uid) {
                    return uid[1];
                }
            },
            signIn(userData) {
                this.login = true;
                this.currentUser = userData.objectId;
                this.resume = userData.resume;
            },
            signUp(userData) {
                this.login = true;
                this.currentUser = userData.objectId;
                this.resume = this.default;
                let user = AV.Object.createWithoutData('_User', this.currentUser);
                user.set('resume', this.resume);
                user.save();
            },
            signOut() {
                if (this.edit) {
                    swal({
                        type: 'warning',
                        text: 'Please save your resume first!'
                    })
                } else {
                    AV.User.logOut();
                    this.login = false;
                    this.resume = this.default;
                    swal({
                        type: 'success',
                        text: 'Log out success!'
                    })
                }
            },
            dataLoaded() {
                this.refresh = false;
            },
            onClickEdit() {
                this.edit = true;
                this.save = false;
            },
            onClickSave() {
                this.edit = false;
                this.save = true;
            },
            onClickPrint() {
                window.print();
            },
            onClickShare() {
                if (this.edit) {
                    swal({
                        type: 'warning',
                        text: 'Please save your resume first!'
                    })
                } else {
                    let shareLink = window.location + '?uid=' + this.currentUser;
                    swal({
                        type: 'success',
                        title: 'Copy the following link!',
                        text: shareLink.toString()
                    });
                }
            },
            saveResume(data) {
                Object.assign(this.resume, data);
            },
            addItem(data) {
                switch (data) {
                    case 'skill':
                        this.resume.skills.push({
                            name: '',
                            desc: ''
                        });
                        break;
                    case 'work':
                        this.resume.works.push({
                            name: '',
                            link: '',
                            desc: ''
                        });
                        break;
                }
            },
            removeItem(data) {
                if ('skill' in data) {
                    this.resume.skills.splice(data.skill, 1);
                } else if ('work' in data) {
                    this.resume.works.splice(data.work, 1);
                }
            }
        }
    });

    app.init();
}
