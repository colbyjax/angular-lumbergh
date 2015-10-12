var app = angular.module('app', ['ngRoute','lumberghControllers']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/months.html',
                controller: 'LumberghController'
            }).
            when('/groups', {
                templateUrl: 'partials/groups.html',
                controller: 'LumberghController'
            }).
            when('/tasks', {
                templateUrl: 'partials/addTask.html',
                controller: 'LumberghController'
            
            }).
            otherwise({
                redirectTo: '/index.html'
            });
    }]);

// Initialization
app.run(function($rootScope) {
    
    $rootScope.initialDataLoad = function() {
        console.log('Application Initializing...');

        // Setup initial data arrays
        $rootScope.costs = [
          { item: 'Team 1', actual: '3494', forecast: '4000', variance: '1506', headwind: '300' },
          { item: 'Team 2', actual: '2095', forecast: '2500', variance: '422', headwind: '0' },
          { item: 'Fixed Cost (Airwatch)', actual: '28000', forecast: '50000', variance: '22000', headwind: '22000' }
          ];
        $rootScope.resources = [
          { id: 'e1234', name:'Elon Musk', rate:'98', start:'01/01/2015', end:'12/31/2015', off_time:'4.5',
           dedicated:'1', hours: '', cost:''},
          { id: 'b5678', name:'Bill Gates', rate:'98', start:'10/12/2015', end:'10/23/2015', off_time:'1.2',
           dedicated:'1', hours:'', cost:''},
          { id: 's5678', name:'Steve Jobs', rate:'98', start:'10/08/2015', end:'10/22/2015', off_time:'6.2',
           dedicated:'.6', hours:'', cost:''}
          ];
        
        $rootScope.totals = { totalHours: 0, totalOffTime: 0.0, totalCost: 0 };

    }
    
    $rootScope.initialDataLoad();
    
});