require('./news-search-request.service');

describe("newsHubNewsSearchRequestService", function () {

    beforeEach(angular.mock.module('newsHubNewsSearchRequestService'));

    var newsHubNewsSearchRequest;

    beforeEach(function () {
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(angular.mock.inject(function (_newsHubNewsSearchRequest_) {
        newsHubNewsSearchRequest = _newsHubNewsSearchRequest_;
    }));

    it("should not be undefined", function () {
        expect(newsHubNewsSearchRequest).toBeDefined();
    });

    it("should contain empty search request object", function () {
        expect(newsHubNewsSearchRequest.searchRequest).toBeDefined();
        expect(newsHubNewsSearchRequest.searchRequest.tags).toEqual([]);
        expect(newsHubNewsSearchRequest.searchRequest.authors.length).toBe(0);
    });

    it("should return ids object", function () {
        newsHubNewsSearchRequest.searchRequest = {
            tags: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}],
            authors: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}]
        };
        expect(newsHubNewsSearchRequest.getNewsSearchRequestIds()).toEqual({ authorIds: [1, 2, 3], tagIds: [1, 2] });
    });

    it("should clean search request object", function () {
        newsHubNewsSearchRequest.searchRequest = {
            tags: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}],
            authors: [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}]
        };
        newsHubNewsSearchRequest.clearSearchRequest();
        expect(newsHubNewsSearchRequest.searchRequest).toEqual({ authors: [], tags: [] });
    });
});