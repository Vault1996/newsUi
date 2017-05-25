'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubNewsTagsRest';

angular.module(MODULE_NAME, [angularResource])
    .factory('newsHubNewsTagsService', function ($resource) {
        return $resource(URL_API + '/backend/tags/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    });

export default MODULE_NAME;