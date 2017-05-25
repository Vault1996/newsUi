import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import newsRestModule from '../common/news.service';

const MODULE_NAME = 'newsHubNewsDeleteModule';

angular.module(MODULE_NAME, [newsRestModule, uiBootstrap])
    .component('newsHubNewsDelete', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./news-delete-modal.template.html'),
        controller: ['newsHubNewsService', '$uibModal', '$rootScope', function (newsHubNewsService, $uibModal, $rootScope) {
            var scpe = this;

            scpe.$onInit = function () {
                scpe.newsToDelete = scpe.resolve.news;
            };

            scpe.deleteNews = function () {
                newsHubNewsService.delete({}, scpe.newsToDelete, function () {
                    $rootScope.$emit('UpdateSidebar', {});
                    $uibModal.open({
                        component: 'newsHubInfo',
                        resolve: {
                            translateInfo: function () {
                                return 'NEWS_DELETED';
                            }
                        }
                    });
                    scpe.close({$value: true});
                }, function (error) {
                    scpe.dismiss({$value: error.data});
                });
            };
        }],
        controllerAs: 'deleteCtrl'
    });

export default MODULE_NAME;