'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubCommentsOpenedService';

angular.module(MODULE_NAME, [angularResource])
    .service('newsHubCommentsOpened', function () {
        var scpe = this;
        scpe.isCommentsOpened = false;
    });

export default MODULE_NAME;