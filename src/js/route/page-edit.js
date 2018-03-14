/*
 * page-edit.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

export default {
    props: [
        'login',
        'share',
        'edit',
        'save',
        'refresh',
        'names',
        'intros',
        'contacts',
        'skills',
        'works',
    ],
    template: `
        <div class="editor-wrapper">
            <navigation :login="login" :share="share" @edit="onClickEdit" @save="onClickSave" @print="onClickPrint" @share="onClickShare" @signout="signoutsuccess"></navigation>
            <!-- 简历主体页面 -->
            <main class="site-edit">
                <div class="container">
                    <!-- 姓名 -->
                    <name :names="names" :edit="edit" :save="save" :refresh="refresh" @save="saveResume" @loaded="dataLoaded"></name>
                    <!-- 简介 -->
                    <intro :intros="intros" :edit="edit" :save="save" :refresh="refresh" @save="saveResume" @loaded="dataLoaded"></intro>
                    <!--&lt;!&ndash; 联系 &ndash;&gt;-->
                    <contact :contacts="contacts" :edit="edit" :save="save" @save="saveResume"></contact>
                    <!--&lt;!&ndash; 技能 &ndash;&gt;-->
                    <skill :skills="skills" :edit="edit" :save="save" @add="addItem('skill')" @remove="removeItem" @save="saveResume"></skill>
                    <!--&lt;!&ndash; 作品 &ndash;&gt;-->
                    <work :works="works" :edit="edit" :save="save" @add="addItem('work')" @remove="removeItem" @save="saveResume"></work>
                </div>
            </main>
            <!-- 底部版权 -->
            <copyright></copyright>
        </div>
    `,
    methods: {
        onClickEdit() {
            this.$emit('onclickedit');
        },
        onClickSave() {
            this.$emit('onclicksave');
        },
        onClickPrint() {
            this.$emit('onclickprint');
        },
        onClickShare() {
            this.$emit('onclickshare');
        },
        signoutsuccess() {
            this.$emit('signoutsuccess');
        },
        saveResume(data) {
            this.$emit('saveresume', data);
        },
        addItem(data) {
            this.$emit('add', data);
        },
        removeItem(data) {
            this.$emit('remove', data);
        },
        dataLoaded() {
            this.$emit('loaded');
        }
    }
};
