'use strict';
import angular from 'angular';
import angularResource from 'angular-resource';

const MODULE_NAME = 'newsHubNewsSearchRequestService';

angular.module(MODULE_NAME, [angularResource])
    .service('newsHubNewsSearchRequest', function () {
        var scpe = this;
        scpe.searchRequest = {
            tags: [],
            authors: []
        };
        scpe.clearSearchRequest = function () {
            scpe.searchRequest.tags = [];
            scpe.searchRequest.authors = [];
        };
        scpe.getNewsSearchRequestIds = function() {
            var req = {};
            req.tagIds = scpe.searchRequest.tags.map(function(a) {return a.id;});
            req.authorIds = scpe.searchRequest.authors.map(function(a) {return a.id;});
            return req;
        }
    });

export default MODULE_NAME;