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
import uiBootstrap from 'angular-ui-bootstrap';
import moment from 'moment';

const MODULE_NAME = 'newsHubApp';

// LANGUAGE CONFIGURATION
angular.module(MODULE_NAME).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.registerAvailableLanguageKeys(['en', 'ru'], {
        'en_*': 'en',
        'ru_*': 'ru'
    });

    $translateProvider.useStaticFilesLoader({
        prefix: '/lang/',
        suffix: '.json'
    });
    const PREFERRED_LANGUAGE = 'en';

    $translateProvider.preferredLanguage(PREFERRED_LANGUAGE);
    moment.locale(PREFERRED_LANGUAGE);


    $translateProvider.useSanitizeValueStrategy('escape');
}]);

// UI_ROUTER CONFIG
angular.module(MODULE_NAME).config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: 'newsList',
            url: '/',
            component: 'newsHubNewsList'
        });
        $stateProvider.state({
            name: 'search',
            url: '/search',
            component: 'newsHubNewsSearch'
        });
        $stateProvider.state({
            name: 'news',
            url: '/news/{id}',
            component: 'newsHubNews'
        });
        $stateProvider.state({
            name:'news.comments',
            url: '/comments',
            component: 'newsHubNewsComments',
            onEnter: function(newsHubCommentsOpened){
                newsHubCommentsOpened.isCommentsOpened = true;
            },
            onExit: function(newsHubCommentsOpened){
                newsHubCommentsOpened.isCommentsOpened = false;
            }

        });

        $urlRouterProvider.otherwise('/');
    }]);

angular.module(MODULE_NAME).config(
    function() {
        moment.updateLocale('en', {
            calendar: {
                sameElse: 'L [at] LT'
            }
        });

        moment.updateLocale('ru', {
            months : {
                format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
                standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
            },
            monthsShort : {
                // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
                format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
                standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
            },
            weekdays : {
                standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
                format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
                isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
            },
            weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
            weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),

            // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
            monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

            // копия предыдущего
            monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

            // полные названия с падежами
            monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

            // Выражение, которое соотвествует только сокращённым формам
            monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
            longDateFormat : {
                LT : 'HH:mm',
                LTS : 'HH:mm:ss',
                L : 'DD.MM.YYYY',
                LL : 'D MMMM YYYY г.',
                LLL : 'D MMMM YYYY г., HH:mm',
                LLLL : 'dddd, D MMMM YYYY г., HH:mm'
            },
            calendar : {
                sameDay: '[Сегодня в] LT',
                nextDay: '[Завтра в] LT',
                lastDay: '[Вчера в] LT',
                nextWeek: function (now) {
                    if (now.week() !== this.week()) {
                        switch (this.day()) {
                            case 0:
                                return '[В следующее] dddd [в] LT';
                            case 1:
                            case 2:
                            case 4:
                                return '[В следующий] dddd [в] LT';
                            case 3:
                            case 5:
                            case 6:
                                return '[В следующую] dddd [в] LT';
                        }
                    } else {
                        if (this.day() === 2) {
                            return '[Во] dddd [в] LT';
                        } else {
                            return '[В] dddd [в] LT';
                        }
                    }
                },
                lastWeek: function (now) {
                    if (now.week() !== this.week()) {
                        switch (this.day()) {
                            case 0:
                                return '[В прошлое] dddd [в] LT';
                            case 1:
                            case 2:
                            case 4:
                                return '[В прошлый] dddd [в] LT';
                            case 3:
                            case 5:
                            case 6:
                                return '[В прошлую] dddd [в] LT';
                        }
                    } else {
                        if (this.day() === 2) {
                            return '[Во] dddd [в] LT';
                        } else {
                            return '[В] dddd [в] LT';
                        }
                    }
                },
                sameElse: 'L [в] LT'
            },
            meridiemParse: /ночи|утра|дня|вечера/i,
            isPM : function (input) {
                return /^(дня|вечера)$/.test(input);
            },
            meridiem : function (hour, minute, isLower) {
                if (hour < 4) {
                    return 'ночи';
                } else if (hour < 12) {
                    return 'утра';
                } else if (hour < 17) {
                    return 'дня';
                } else {
                    return 'вечера';
                }
            },
            ordinalParse: /\d{1,2}-(й|го|я)/,
            ordinal: function (number, period) {
                switch (period) {
                    case 'M':
                    case 'd':
                    case 'DDD':
                        return number + '-й';
                    case 'D':
                        return number + '-го';
                    case 'w':
                    case 'W':
                        return number + '-я';
                    default:
                        return number;
                }
            },
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 7  // The week that contains Jan 1st is the first week of the year.
            }
        });
    }
);

angular.module(MODULE_NAME).config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
