import angular from 'angular';

const MODULE_NAME = 'newsHubNewsFooterModule';

angular.module(MODULE_NAME, [])
    .component('newsHubNewsFooter', {
        template: require('./news-footer.template.html'),
    });

export default MODULE_NAME;