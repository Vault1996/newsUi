import angular from 'angular';
import modificationFilter from '../common/date.filter';
import uiRouter from 'angular-ui-router';
import newsRestModule from '../common/news.service';
import uiBootstrap from 'angular-ui-bootstrap';
import addModal from '../add-modal/add-modal.component';
import infoModal from '../info-modal/info-modal.component';
import newsRequestService from '../common/news-search-request.service';
import ngCookies from 'angular-cookies';
import angularTranslate from 'angular-translate';

const MODULE_NAME = 'newsHubNewsSearchModule';

angular.module(MODULE_NAME, [modificationFilter, uiRouter, ngCookies, newsRestModule, angularTranslate,
    newsRequestService, uiBootstrap, addModal, infoModal])
    .component('newsHubNewsSearch', {
        template: require('./news-search.template.html'),
        controller: ['newsHubNewsService', '$state', '$stateParams', '$translate',
            '$cookies', 'newsHubNewsSearchRequest', '$uibModal', '$log',
            function (newsHubNewsService, $state, $stateParams, $translate,
                      $cookies, newsHubNewsSearchRequest, $uibModal, $log) {
                var scpe = this;

                scpe.searchReq = newsHubNewsSearchRequest.searchRequest;
                scpe.maxSize = 5;
                if ($cookies.get('newsLimit')) {
                    scpe.limit = $cookies.get('newsLimit');
                } else {
                    scpe.limit = '10';
                }

                scpe.prevRequest = newsHubNewsService.search(
                    {offset: 0, limit: scpe.limit},
                    newsHubNewsSearchRequest.getNewsSearchRequestIds(),
                    function (pageInfo) {
                        scpe.pageNumber = pageInfo.pageNumber;
                        scpe.totalCount = pageInfo.totalCount;
                        scpe.itemsPerPage = scpe.limit;
                        scpe.newsList = pageInfo.entities;
                        if(scpe.newsList.length == 0) {
                            $uibModal.open({
                                component: 'newsHubInfo',
                                resolve: {
                                    translateInfo: function () {
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

                scpe.pageChanged = function () {
                    scpe.prevRequest = newsHubNewsService.search(
                        {offset: (scpe.pageNumber - 1) * scpe.limit, limit: scpe.limit},
                        newsHubNewsSearchRequest.getNewsSearchRequestIds(),
                        function (pageInfo) {
                            scpe.pageNumber = pageInfo.pageNumber;
                            scpe.totalCount = pageInfo.totalCount;
                            scpe.itemsPerPage = scpe.limit;
                            scpe.newsList = pageInfo.entities;
                            if(scpe.newsList.length == 0) {
                                $uibModal.open({
                                    component: 'newsHubInfo',
                                    resolve: {
                                        translateInfo: function () {
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

                scpe.backToNewsList = function () {
                    newsHubNewsSearchRequest.clearSearchRequest();
                    $state.go('newsList');
                };
                scpe.deleteTagFromRequest = function (tag) {
                    var array = newsHubNewsSearchRequest.searchRequest.tags;
                    var i = array.indexOf(tag);
                    if (i != -1) {
                        array.splice(i, 1);
                    }
                    $state.reload();
                };
                scpe.deleteAuthorFromRequest = function (author) {
                    var array = newsHubNewsSearchRequest.searchRequest.authors;
                    var i = array.indexOf(author);
                    if (i != -1) {
                        array.splice(i, 1);
                    }
                    $state.reload();
                };
                scpe.changeNumberOfNewsPerPage = function () {
                    $state.reload();
                    $cookies.put('newsLimit', scpe.limit);
                };
            }],
        controllerAs: 'newsSearchCtrl'
    });

export default MODULE_NAME;