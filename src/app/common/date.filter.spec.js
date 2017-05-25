require('./date.filter');

describe("DateFilter", function () {

    beforeEach(angular.mock.module('newsHubDateFilterModule'));

    var newsHubDateFilter;

    beforeEach(angular.mock.inject(function ($filter) {
        newsHubDateFilter = $filter('newsHubDateFilter');
    }));

    it("filter should not be undefined", function () {
        expect(newsHubDateFilter).toBeDefined();
    });

    it("filter output should not be null", function () {
        expect(newsHubDateFilter(new Date())).not.toBeNull();
    });

    it("filter output should contains Today", function () {
        expect(newsHubDateFilter(new Date())).toContain('Today');
    });

    it("should not throw exception when date is null", function () {
        expect(function() {newsHubDateFilter(null)}).not.toThrow();
    });

    it("should be 'Invalid date' when date has invalid format", function () {
        expect(newsHubDateFilter('invalid format')).toBe('Invalid date');
    });

});