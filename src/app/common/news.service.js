'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubNewsRest';

angular.module(MODULE_NAME, [angularResource])
    .factory('newsHubNewsService', function ($resource) {
        return $resource(URL_API + '/backend/news/:id', {id: '@id'}, {
            query: {
                method: 'GET',
                isArray: false,
                cancellable: true
            },
            update: {
                method: 'PUT'
            },
            getComments: {
                method: 'GET',
                url: URL_API + '/backend/news/:id/comments',
                cancellable: true
            },
            search: {
                method: 'POST',
                url: URL_API + '/backend/news/search'
            }
        });
    });

export default MODULE_NAME;