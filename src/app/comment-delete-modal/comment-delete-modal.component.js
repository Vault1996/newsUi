import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import newsCommentRest from '../common/news-comments.service';

const MODULE_NAME = 'newsHubCommentDeleteModule';

angular.module(MODULE_NAME, [newsCommentRest, uiBootstrap])
    .component('newsHubCommentDelete', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./comment-delete-modal.template.html'),
        controller: ['newsHubNewsCommentsService', '$uibModal',
            function (newsHubNewsCommentsService, $uibModal) {
                var scpe = this;

                scpe.$onInit = function () {
                    scpe.commentToDelete = scpe.resolve.comment;
                };

                scpe.deleteComment = function () {
                    newsHubNewsCommentsService.delete({}, scpe.commentToDelete, function () {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                translateInfo: function () {
                                    return 'COMMENT_DELETED';
                                }
                            }
                        });
                        scpe.close({$value: true});
                    }, function (error) {
                        scpe.dismiss({$value: error.data});
                    });
                };
            }],
        controllerAs: 'deleteCommentCtrl'
    });

export default MODULE_NAME;