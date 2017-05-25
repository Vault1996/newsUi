import angular from 'angular';
import moment from 'moment';

const MODULE_NAME = 'newsHubDateFilterModule';

angular.module(MODULE_NAME, [])
    .filter('newsHubDateFilter', [function () {
        function dateFilter(input) {
            return moment(input).calendar();
        }

        dateFilter.$stateful = true;
        return dateFilter;
    }]);

export default MODULE_NAME;