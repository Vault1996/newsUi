import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import newsRestModule from '../common/news.service';
import uiRouter from 'angular-ui-router';
import newsTagsRestModule from '../common/news-tags.service';
import newsAuthorsRestModule from '../common/news-authors.service';
import 'angular-ui-validate';
import 'ng-tags-input/build/ng-tags-input';

const MODULE_NAME = 'newsHubNewsEditModule';

angular.module(MODULE_NAME, [newsRestModule, newsAuthorsRestModule, newsTagsRestModule, uiBootstrap,
    uiRouter, 'ui.validate', 'ngTagsInput'])
    .component('newsHubNewsEdit', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./news-edit-modal.template.html'),
        controller: ['newsHubNewsService', '$state', 'newsHubNewsTagsService', '$uibModal',
            'newsHubNewsAuthorsService', '$log', '$rootScope',
            function (newsHubNewsService, $state, newsHubNewsTagsService, $uibModal,
                      newsHubNewsAuthorsService, $log, $rootScope) {
                var scpe = this;
                scpe.$onInit = function () {
                    scpe.newsToEdit = newsHubNewsService.get({id: scpe.resolve.news.id}, function (nws) {
                        scpe.newsToEdit = nws;
                    }, function (ex) {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                info: function () {
                                    return ex.data.reason;
                                }
                            }
                        });
                        $state.go('newsList');
                    });
                };

                scpe.loadTags = function (query) {
                    return newsHubNewsTagsService.query().$promise.then(function (tags) {
                        return tags.filter(function (tag) {
                                return tag.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                            }
                        );
                    }, function (error) {
                        scpe.dismiss({$value: error.data});
                    });
                };

                scpe.loadAuthors = function (query) {
                    return newsHubNewsAuthorsService.query().$promise.then(function (authors) {
                        return authors.filter(function (author) {
                                return author.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                            }
                        );
                    }, function (error) {
                        scpe.dismiss({$value: error.data});
                    });
                };

                scpe.editNews = function () {
                    var returnedNews = newsHubNewsService.update({}, scpe.newsToEdit,
                        function () {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
                                        return "NEWS_EDITED";
                                    }
                                }
                            });
                            $rootScope.$emit('UpdateSidebar', {});
                            scpe.close({$value: true});
                        }, function (error) {
                            if(angular.isArray(error.data)) {
                                var resultStr = error.data.map(function(a) {return a.reason;}).join('\n');
                                scpe.dismiss({$value: {reason : resultStr}})
                            } else {
                                scpe.dismiss({$value: error.data})
                            }
                        });
                };
                scpe.edit = function (form) {
                    if (form.$valid) {
                        scpe.editNews();
                    }
                };
            }],
        controllerAs: 'editNewsCtrl'
    });

export default MODULE_NAME;