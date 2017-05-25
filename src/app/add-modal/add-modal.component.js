import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import newsRestModule from '../common/news.service';
import newsTagsRestModule from '../common/news-tags.service';
import newsAuthorsRestModule from '../common/news-authors.service';
import 'angular-ui-validate';
import 'ng-tags-input/build/ng-tags-input';

const MODULE_NAME = 'newsHubAddModule';

angular.module(MODULE_NAME, [newsRestModule, uiBootstrap, newsTagsRestModule, newsAuthorsRestModule, 'ui.validate', 'ngTagsInput'])
    .component('newsHubAdd', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./add-modal.template.html'),
        controller: ['newsHubNewsService', 'newsHubNewsTagsService', 'newsHubNewsAuthorsService', '$rootScope', '$uibModal', '$log',
            function (newsHubNewsService, newsHubNewsTagsService, newsHubNewsAuthorsService, $rootScope, $uibModal, $log) {
                var scpe = this;

                scpe.loadTags = function (query) {
                    return newsHubNewsTagsService.query().$promise.then(function (tags) {
                        return tags.filter(function (tag) {
                                return tag.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
                            }
                        )
                    }, function (error) {
                        scpe.dismiss({$value: error.data})
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

                scpe.newsToAdd = new newsHubNewsService();

                scpe.addNews = function () {
                    var returnedNews = newsHubNewsService.save(scpe.newsToAdd,
                        function () {
                            $rootScope.$emit('UpdateSidebar', {});
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
                                        return "NEWS_ADDED";
                                    }
                                }
                            });
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

                scpe.add = function (form) {
                    if (form.$valid) {
                        scpe.addNews();
                    }
                };
            }],
        controllerAs: 'addCtrl'
    });

export default MODULE_NAME;