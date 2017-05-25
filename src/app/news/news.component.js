import angular from 'angular';
import modificationFilter from '../common/date.filter';
import uiRouter from 'angular-ui-router';
import newsRestModule from '../common/news.service';
import uiBootstrap from 'angular-ui-bootstrap';
import editModal from '../news-edit-modal/news-edit-modal.component';
import deleteModal from '../news-delete-modal/news-delete-modal.component';
import infoModal from '../info-modal/info-modal.component';
import commentsOpened from '../common/comments.service';

const MODULE_NAME = 'newsModule';

angular.module(MODULE_NAME, [modificationFilter, uiRouter, commentsOpened, newsRestModule, uiRouter, uiBootstrap,
    editModal, deleteModal, infoModal])
    .component('newsHubNews', {
        template: require('./news.template.html'),
        controller: ['newsHubNewsService', 'newsHubCommentsOpened', '$stateParams', '$state', '$uibModal',
            function (newsHubNewsService, newsHubCommentsOpened, $stateParams, $state, $uibModal) {
                var scpe = this;
                scpe.show = !newsHubCommentsOpened.isCommentsOpened;
                var nws = newsHubNewsService.get({id: $stateParams.id}, function () {
                    scpe.news = nws;
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

                scpe.openDelete = function () {
                    var confirmModal = $uibModal.open({
                        component: 'newsHubNewsDelete',
                        resolve: {
                            news: function () {
                                return scpe.news;
                            }
                        }
                    });
                    confirmModal.result.then(function (deleted) {
                            if (deleted) {
                                $state.go('newsList');
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

                scpe.openEdit = function () {
                    var editModal = $uibModal.open({
                        component: 'newsHubNewsEdit',
                        resolve: {
                            news: function () {
                                return scpe.news;
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
                scpe.showComments = function () {
                    scpe.show = !scpe.show;
                    $state.go('.comments', {'#': 'commentStart'});
                };
            }],
        controllerAs: 'newsCtrl'
    });

export default MODULE_NAME;