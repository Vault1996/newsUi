import angular from 'angular';
import translate from 'angular-translate';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import moment from 'moment';

const MODULE_NAME = 'newsHubNewsHeaderModule';

angular.module(MODULE_NAME, [translate, uiRouter, ngCookies])
    .component('newsHubNewsHeader', {
            template: require('./news-header.template.html'),
            controller: ['$translate', '$cookies', function ($translate, $cookies) {
                this.changeLanguage = function (key) {
                    $cookies.put('locale', key);
                    $translate.use(key);
                    moment.locale([key, 'en']);
                }
            }],
            controllerAs: 'newsHeaderCtrl'
        }
    );
export default MODULE_NAME;