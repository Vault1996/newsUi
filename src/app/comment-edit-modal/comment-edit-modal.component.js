import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import newsCommentsRestModule from '../common/news-comments.service';
import 'angular-ui-validate';

const MODULE_NAME = 'newsHubCommentEditModule';

angular.module(MODULE_NAME, [newsCommentsRestModule, uiBootstrap, 'ui.validate'])
    .component('newsHubCommentEdit', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./comment-edit-modal.template.html'),
        controller: ['newsHubNewsCommentsService', '$uibModal', function (newsHubNewsCommentsService, $uibModal) {
            var scpe = this;

            scpe.$onInit = function () {
                scpe.commentToEdit = angular.copy(scpe.resolve.comment);
            };

            scpe.editComment = function () {
                var commentRequest = newsHubNewsCommentsService.update({}, scpe.commentToEdit,
                    function () {
                        $uibModal.open({
                            component: 'newsHubInfo',
                            resolve: {
                                translateInfo: function () {
                                    return "COMMENT_EDITED";
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
            scpe.edit = function (form) {
                if (form.$valid) {
                    scpe.editComment();
                }
            };
        }],
        controllerAs: 'editCommentCtrl'
    });

export default MODULE_NAME;