'use strict';

import 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'ng-tags-input/build/ng-tags-input.css';
import '../style/style.css';

import angular from 'angular';
import translate from 'angular-translate';
import 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import moment from 'moment';
import uiBootstrap from 'angular-ui-bootstrap';

const MODULE_NAME = 'newsHubApp';

import newsHeaderModule from './news-header/news-header.component';
import newsFooterModule from './news-footer/news-footer.component';
import newsModule from './news/news.component';
import newsListModule from './news-list/news-list.component';
import newsRestModule from './common/news.service';
import newsSidebarModule from './news-sidebar/news-sidebar.component';
import newsCommentsModule from './news-comments/news-comments.component';
import newsSearchModule from './news-search/news-search.component';
import commentsShown from './common/comments.service';

angular.module(MODULE_NAME, [
    newsFooterModule,
    newsHeaderModule,
    newsModule,
    newsListModule,
    newsSidebarModule,
    newsCommentsModule,
    newsSearchModule,
    newsRestModule,
    commentsShown,
    ngResource,
    translate,
    uiRouter,
    uiBootstrap,
    ngCookies
]);

require('./app.config');

angular.module(MODULE_NAME).component('newsHubApp', {
    template: require('./app.template.html'),
    controller: ['$cookies', '$translate', function ($cookies, $translate) {
        var scpe = this;
        var lang = $cookies.get('locale');
        if (lang) {
            $translate.use(lang);
            moment.locale(lang);
        }
    }],
    controllerAs: 'appCtrl'
});

export default MODULE_NAME;
