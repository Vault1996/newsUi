import angular from 'angular';
import modificationFilter from '../common/date.filter';
import uiRouter from 'angular-ui-router';
import newsTagsRestModule from '../common/news-tags.service';
import newsAuthorsRestModule from '../common/news-authors.service';
import uiBootstrap from 'angular-ui-bootstrap';
import infoModal from '../info-modal/info-modal.component';
import newsRequestService from '../common/news-search-request.service';

const MODULE_NAME = 'newsHubNewsSidebarModule';

angular.module(MODULE_NAME, [modificationFilter, uiRouter, newsTagsRestModule, newsAuthorsRestModule,
    uiBootstrap, infoModal, newsRequestService])
    .component('newsHubNewsSidebar', {
        template: require('./news-sidebar.template.html'),
        controller: ['newsHubNewsTagsService', 'newsHubNewsAuthorsService', 'newsHubNewsSearchRequest', '$rootScope',
            '$state', '$uibModal', '$log',
            function (newsHubNewsTagsService, newsHubNewsAuthorsService, newsHubNewsSearchRequest, $rootScope,
                      $state, $uibModal, $log) {
                var scpe = this;
                scpe.tagRequest = newsHubNewsTagsService.query(function (tags) {
                        scpe.tags = tags;
                    },
                    function (ex) {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                info: function () {
                                    return ex.data.reason;
                                }
                            }
                        });
                    }
                );
                scpe.authorsRequest = newsHubNewsAuthorsService.query(function (authors) {
                        scpe.authors = authors;
                    },
                    function (ex) {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                info: function () {
                                    return ex.data.reason;
                                }
                            }
                        });
                    }
                );
                scpe.searchRequest = newsHubNewsSearchRequest.searchRequest;

                scpe.searchTag = function (tag) {
                    var array = scpe.searchRequest.tags;
                    var i = array.indexOf(tag);
                    if (i != -1) {
                        array.splice(i, 1);
                    } else {
                        array.push(tag);
                    }
                    $state.go('search', {}, {reload: true});
                };
                scpe.searchAuthor = function (author) {
                    var array = scpe.searchRequest.authors;
                    var i = array.indexOf(author);
                    if (i != -1) {
                        array.splice(i, 1);
                    } else {
                        array.push(author);
                    }
                    $state.go('search', {}, {reload: true});
                };
                scpe.tagToAdd = {};
                scpe.addTag = function (addTagForm) {
                    newsHubNewsTagsService.save({},
                        scpe.tagToAdd,
                        function () {
                            scpe.tagToAdd.name = '';
                            addTagForm.$setPristine();
                            scpe.tagRequest = newsHubNewsTagsService.query(function (tags) {
                                    scpe.tags = tags;
                                },
                                function (ex) {
                                    $uibModal.open({
                                        component: 'newsHubInfo',
                                        resolve: {
                                            info: function () {
                                                return ex.data.reason;
                                            }
                                        }
                                    });
                                }
                            );
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
                                        return "TAG_ADDED";
                                    }
                                }
                            });
                        },
                        function (ex) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return ex.data.reason;
                                    }
                                }
                            });
                        }
                    )
                };
                scpe.authorToAdd = {};
                scpe.addAuthor = function (addAuthorForm) {
                    newsHubNewsAuthorsService.save({},
                        scpe.authorToAdd,
                        function () {
                            scpe.authorToAdd.name = '';
                            addAuthorForm.$setPristine();
                            scpe.authorRequest = newsHubNewsAuthorsService.query(function (authors) {
                                    scpe.authors = authors;
                                },
                                function (ex) {
                                    $uibModal.open({
                                        component: 'newsHubInfo',
                                        resolve: {
                                            info: function () {
                                                return ex.data.reason;
                                            }
                                        }
                                    });
                                }
                            );
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
                                        return "AUTHOR_ADDED";
                                    }
                                }
                            });
                        },
                        function (ex) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return ex.data.reason;
                                    }
                                }
                            });
                        }
                    )
                };
                $rootScope.$on('UpdateSidebar', function (event, arg) {
                    scpe.tagRequest = newsHubNewsTagsService.query(function (tags) {
                            scpe.tags = tags;
                        },
                        function (ex) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return ex.data.reason;
                                    }
                                }
                            });
                        }
                    );
                    scpe.authorsRequest = newsHubNewsAuthorsService.query(function (authors) {
                            scpe.authors = authors;
                        },
                        function (ex) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return ex.data.reason;
                                    }
                                }
                            });
                        }
                    );
                });
            }],
        controllerAs: 'newsSidebarCtrl'
    });

export default MODULE_NAME;