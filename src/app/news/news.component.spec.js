require('./news.component');


describe("newsModule", function () {

    beforeEach(angular.mock.module('newsModule'));

    var newsHubNews;

    var newsHubNewsService, uibModal, state, q, rootScope;

    var expectedNews = {id: 1, name: 'One'};

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('$stateParams', {id: 1});
    }));

    beforeEach(angular.mock.inject(function ($componentController, _newsHubNewsService_, _$state_,
                                             _$uibModal_, _$q_, _$rootScope_) {
        q = _$q_;
        rootScope = _$rootScope_;
        uibModal = _$uibModal_;
        state = _$state_;
        spyOn(state, 'go');
        spyOn(state, 'reload');
        newsHubNewsService = _newsHubNewsService_;
        spyOn(newsHubNewsService, 'get');

        newsHubNews = $componentController('newsHubNews');
    }));

    it("should not be undefined", function () {
        expect(newsHubNews).toBeDefined();
    });

    it("should find news", function () {
        expect(newsHubNewsService.get).toHaveBeenCalledWith({id: 1}, jasmine.any(Function), jasmine.any(Function));
    });

    it("should change show variable when showComments", function () {
        var show = newsHubNews.show;
        newsHubNews.showComments();
        expect(newsHubNews.show).not.toBe(show);
        expect(state.go).toHaveBeenCalled();
    });

    it("should call open method of $uibModal when calling openDelete and go to another state", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.when(true)});

        newsHubNews.openDelete();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
    });

    it("should call open method of $uibModal when calling openDelete and not to go to another state", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.when(false)});

        newsHubNews.openDelete();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
    });

    it("should call open method of $uibModal 2 times when calling openDelete", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.reject({reason: "Not null"})});

        newsHubNews.openDelete();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalledTimes(2);
    });

    it("should call open method of $uibModal only 1 time when calling openDelete", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.reject({})});

        newsHubNews.openDelete();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalledTimes(1);
    });

    it("should call open method of $uibModal when calling openEdit and call reload of state", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.when(true)});

        newsHubNews.openEdit();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalled();
        expect(state.reload).toHaveBeenCalled();
    });

    it("should call open method of $uibModal 2 times when calling openEdit", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.reject({reason: "Not null"})});

        newsHubNews.openEdit();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalledTimes(2);
    });

    it("should call open method of $uibModal only 1 time when calling openEdit", function () {
        spyOn(uibModal, 'open').and.returnValue({result: q.reject({})});

        newsHubNews.openEdit();
        rootScope.$apply();
        expect(uibModal.open).toHaveBeenCalledTimes(1);
    });

});