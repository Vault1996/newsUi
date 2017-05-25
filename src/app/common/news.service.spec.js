require('./news.service');

describe("newsHubNewsRest", function () {

    beforeEach(angular.mock.module('newsHubNewsRest'));

    var newsHubNewsService;

    describe("stubbed resource", function () {

        beforeEach(angular.mock.module(function($provide) {
            $provide.factory('$resource', function() {
                return function() {return 'Hello';}
            });
        }));

        beforeEach(angular.mock.inject(function (_newsHubNewsService_) {
            newsHubNewsService = _newsHubNewsService_;
        }));

        it("should not be undefined", function () {
            expect(newsHubNewsService).toBe('Hello');
        });
    });

    describe("initial state", function () {
        var httpBackend;

        var expectedNews = {id: 1, name: 'GET'};
        var postedNews = {name: 'POST'};

        var postRequest;

        beforeEach(angular.mock.inject(function (_newsHubNewsService_, _$httpBackend_) {
            httpBackend = _$httpBackend_;
            httpBackend.whenGET(URL_API + '/backend/news/1')
                .respond(200, expectedNews);
            postRequest = httpBackend.whenPOST(URL_API + '/backend/news', postedNews);
            postRequest.respond(204);

            httpBackend.whenPUT(URL_API + '/backend/news/1', expectedNews).respond(200);

            newsHubNewsService = _newsHubNewsService_;
        }));

        it("should not be undefined", function () {
            expect(newsHubNewsService).toBeDefined();
        });

        it("should return news", function () {
            var returnedNewsName;
            newsHubNewsService.get({id: 1}, function (response) {
                returnedNewsName = response.name;
            });
            httpBackend.flush();
            expect(returnedNewsName).toEqual(expectedNews.name);
        });

        it("should create news", function () {
            httpBackend.expectPOST(URL_API + '/backend/news', postedNews);
            newsHubNewsService.save(postedNews);
            httpBackend.flush();
        });

        it("should fail if wrong data", function () {
            postRequest.respond(400);
            httpBackend.expectPOST(URL_API + '/backend/news', postedNews);
            newsHubNewsService.save(postedNews, function () {
                fail("Callback has been called");
            }, function () {});
            httpBackend.flush();
        });

        it("should update data", function () {
            httpBackend.expectPUT(URL_API + '/backend/news/1', expectedNews);
            newsHubNewsService.update(expectedNews);
            httpBackend.flush();
        });

    });

});