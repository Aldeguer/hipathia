hypathiaAcademy.directive('uniDetailList', function() {
    // Runs during compile
    return {

        scope: {
            model: '=items',
            isTheUser: '=',

        },
        restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'code/common/directives/uniDetail/uniDetailList.html',

    };
});

