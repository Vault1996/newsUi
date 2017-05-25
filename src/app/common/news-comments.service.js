'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubNewsCommentsRest';

angular.module(MODULE_NAME, [angularResource])
    .factory('newsHubNewsCommentsService', function ($resource) {
        return $resource(URL_API + '/backend/comments/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    });

export default MODULE_NAME;