import angular from 'angular';
import modificationFilter from '../common/date.filter';
import uiRouter from 'angular-ui-router';
import newsRestModule from '../common/news.service';
import newsCommentsRest from '../common/news-comments.service';
import uiBootstrap from 'angular-ui-bootstrap';
import commentsOpened from '../common/comments.service';
import commentDelete from '../comment-delete-modal/comment-delete-modal.component';
import commentEdit from '../comment-edit-modal/comment-edit-modal.component';
import ngCookies from 'angular-cookies';

const MODULE_NAME = 'newsHubNewsCommentsModule';

angular.module(MODULE_NAME, [modificationFilter, uiRouter, commentsOpened, newsRestModule, commentDelete,
    commentEdit, newsCommentsRest, uiBootstrap, ngCookies])
    .component('newsHubNewsComments', {
        template: require('./news-comments.template.html'),
        controller: ['newsHubNewsService', 'newsHubNewsCommentsService', 'newsHubCommentsOpened', '$state',
            '$stateParams', '$uibModal', '$log', '$cookies',
            function (newsHubNewsService, newsHubNewsCommentsService, newsHubCommentsOpened, $state,
                      $stateParams, $uibModal, $log, $cookies) {
                var scpe = this;
                scpe.itemsPerPage = 3;
                scpe.maxSize = 5;

                scpe.prevRequest = newsHubNewsService.getComments(
                    {id: $stateParams.id, limit: scpe.itemsPerPage, offset: 0},
                    function (pageInfo) {
                        scpe.pageNumber = pageInfo.pageNumber;
                        scpe.totalCount = pageInfo.totalCount;
                        scpe.comments = pageInfo.entities;
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
                scpe.pageChanged = function () {
                    scpe.prevRequest.$cancelRequest();
                    scpe.prevRequest = newsHubNewsService.getComments(
                        {
                            id: $stateParams.id,
                            limit: scpe.itemsPerPage,
                            offset: (scpe.pageNumber - 1) * scpe.itemsPerPage
                        },
                        function (pageInfo) {
                            scpe.pageNumber = pageInfo.pageNumber;
                            scpe.totalCount = pageInfo.totalCount;
                            scpe.comments = pageInfo.entities;
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
                scpe.commentToAdd = {
                    news: {
                        id: $stateParams.id
                    }
                };
                scpe.addNewsComment = function () {
                    var returnedComment = newsHubNewsCommentsService.save({}, scpe.commentToAdd,
                        function () {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
                                        return "COMMENT_ADDED";
                                    }
                                }
                            });
                            $state.reload();
                        }, function (error) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return error.data.reason;
                                    }
                                }
                            });
                        });
                };
                scpe.addComment = function (addForm) {
                    if (addForm.$valid) {
                        scpe.addNewsComment();
                    }
                };
                scpe.hideComments = function () {
                    $state.go('news', {}, {reload: true});
                };
                scpe.openDelete = function (comments) {
                    var confirmModal = $uibModal.open({
                        component: 'newsHubCommentDelete',
                        resolve: {
                            comment: function () {
                                return comments;
                            }
                        }
                    });
                    confirmModal.result.then(function (deleted) {
                            if (deleted) {
                                $state.reload();
                            }
                        },
                        function (ex) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    info: function () {
                                        return ex.reason;
                                    }
                                }
                            });
                        }
                    );
                };
                scpe.openEdit = function (comments) {
                    var editModal = $uibModal.open({
                        component: 'newsHubCommentEdit',
                        resolve: {
                            comment: function () {
                                return comments;
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
            }],
        controllerAs: 'newsCommentsCtrl'
    });

export default MODULE_NAME;