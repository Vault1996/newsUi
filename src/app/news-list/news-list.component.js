import angular from 'angular';
import modificationFilter from '../common/date.filter';
import uiRouter from 'angular-ui-router';
import newsRestModule from '../common/news.service';
import uiBootstrap from 'angular-ui-bootstrap';
import addModal from '../add-modal/add-modal.component';
import infoModal from '../info-modal/info-modal.component';
import editModal from '../news-edit-modal/news-edit-modal.component';
import deleteModal from '../news-delete-modal/news-delete-modal.component';
import ngCookies from 'angular-cookies';

const MODULE_NAME = 'newsHubNewsListModule';

angular.module(MODULE_NAME, [editModal, deleteModal, modificationFilter, ngCookies, uiRouter,
    newsRestModule, uiBootstrap, addModal, infoModal])
    .component('newsHubNewsList', {
        template: require('./news-list.template.html'),
        controller: ['newsHubNewsService', '$state', '$uibModal', '$cookies',
            function (newsHubNewsService, $state, $uibModal, $cookies) {
                var scpe = this;
                scpe.maxSize = 5;
                if ($cookies.get('newsLimit')) {
                    scpe.limit = $cookies.get('newsLimit');
                } else {
                    scpe.limit = '10';
                }
                scpe.prevRequest = newsHubNewsService.query({offset: 0, limit: scpe.limit}, function (pageInfo) {
                    scpe.pageNumber = pageInfo.pageNumber;
                    scpe.totalCount = pageInfo.totalCount;
                    scpe.itemsPerPage = scpe.limit;
                    scpe.newsList = pageInfo.entities;
                    if (scpe.newsList.length == 0) {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                translateInfo: function () {
                                    return "NO_ENTITY_FOUND";
                                }
                            }
                        });
                    }
                }, function (ex) {
                    $uibModal.open({
                        component: 'newsHubInfo',
                        resolve: {
                            info: function () {
                                return ex.data.reason;
                            }
                        }
                    });
                });
                scpe.openEdit = function (nws) {
                    var editModal = $uibModal.open({
                        component: 'newsHubNewsEdit',
                        resolve: {
                            news: function () {
                                return nws;
                            }
                        }
                    });
                    editModal.result.then(function (edited) {
                            if (edited) {
                                $state.reload();
                            }
                        },
                        function (ex) {
                            if (ex.reason) {
                                $uibModal.open({
                                    component: 'newsHubInfo',
                                    resolve: {
                                        info: function () {
                                            return ex.reason;
                                        }
                                    }
                                });
                            }
                        }
                    );
                };
                scpe.openAdd = function () {
                    var addModal = $uibModal.open({
                        component: 'newsHubAdd'
                    });
                    addModal.result.then(function (added) {
                            if (added) {
                                $state.reload();
                            }
                        },
                        function (ex) {
                            if (ex.reason) {
                                $uibModal.open({
                                    component: 'newsHubInfo',
                                    resolve: {
                                        info: function () {
                                            return ex.reason;
                                        }
                                    }
                                });
                            }
                        }
                    );
                };
                scpe.pageChanged = function () {
                    scpe.prevRequest.$cancelRequest();
                    scpe.prevRequest = newsHubNewsService.query(
                        {offset: (scpe.pageNumber - 1) * scpe.limit, limit: scpe.limit},
                        function (pageInfo) {
                            scpe.pageNumber = pageInfo.pageNumber;
                            scpe.totalCount = pageInfo.totalCount;
                            scpe.itemsPerPage = scpe.limit;
                            scpe.newsList = pageInfo.entities;
                            if (scpe.newsList.length == 0) {
                                $uibModal.open({
                                    component: 'newsHubInfo',
                                    resolve: {
                                        info: function () {
                                            return 'NO_ENTITY_FOUND';
                                        }
                                    }
                                });
                            }
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
                };
                scpe.openDelete = function (nws) {
                    var confirmModal = $uibModal.open({
                        component: 'newsHubNewsDelete',
                        resolve: {
                            news: function () {
                                return nws;
                            }
                        }
                    });
                    confirmModal.result.then(function (deleted) {
                            if (deleted) {
                                $state.reload();
                            }
                        },
                        function (ex) {
                            if (ex.reason) {
                                $uibModal.open({
                                    component: 'newsHubInfo',
                                    resolve: {
                                        info: function () {
                                            return ex.reason;
                                        }
                                    }
                                });
                            }
                        }
                    );
                };
                scpe.changeNumberOfNewsPerPage = function () {
                    $state.reload();
                    $cookies.put('newsLimit', scpe.limit);
                }
            }],
        controllerAs: 'newsListCtrl'
    });

export default MODULE_NAME;