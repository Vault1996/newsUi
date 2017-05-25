require('./news-header.component');


describe("newsHubNewsHeaderModule", function () {

    beforeEach(angular.mock.module('newsHubNewsHeaderModule'));

    var newsHubNewsHeader;

    var translate, cookies;

    beforeEach(angular.mock.inject(function ($componentController, _$translate_, _$cookies_) {
        translate = _$translate_;
        cookies = _$cookies_;
        newsHubNewsHeader = $componentController('newsHubNewsHeader');
    }));

    it("should not be undefined", function () {
        expect(newsHubNewsHeader).toBeDefined();
    });

    it("should change language", function () {
        spyOn(translate, 'use');
        newsHubNewsHeader.changeLanguage('en');
        expect(translate.use).toHaveBeenCalledTimes(1);
        expect(translate.use).toHaveBeenCalledWith('en');
    });

    it("should remember last language", function () {
        spyOn(cookies, 'put');
        newsHubNewsHeader.changeLanguage('en');
        expect(cookies.put).toHaveBeenCalledTimes(1);
        expect(cookies.put).toHaveBeenCalledWith(jasmine.any(String), 'en');
    });

});