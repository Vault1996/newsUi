import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';

const MODULE_NAME = 'newsHubInfoModule';

angular.module(MODULE_NAME, [uiBootstrap])
    .component('newsHubInfo', {
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        template: require('./info-modal.template.html'),
        controller: function () {
            var scpe = this;

            scpe.$onInit = function () {
                scpe.info = scpe.resolve.info;
                scpe.translateInfo = scpe.resolve.translateInfo;
            };

        },
        controllerAs: 'infoCtrl'
    });

export default MODULE_NAME;