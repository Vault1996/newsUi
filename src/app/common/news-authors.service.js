'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubNewsAuthorsRest';

angular.module(MODULE_NAME, [angularResource])
    .factory('newsHubNewsAuthorsService', function ($resource) {
        return $resource(URL_API + '/backend/authors/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    });

export default MODULE_NAME;