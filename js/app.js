var app = angular.module('app', ['ngRoute','lumberghControllers', 'CalculatorService']);

// Configure all the Routing
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/months.html',
                controller: 'MonthController'
            }).
            when('/groups/:groupId', {
                templateUrl: '/partials/groups.html',
                controller: 'GroupController'
            }).
            otherwise({
                redirectTo: '/index.html'
            });
    }]);

// Initialize all the data
app.run(function($rootScope, Calculator) {
    
    $rootScope.initialDataLoad = function() {
        console.log('Application Initializing...');
        console.log('Loading Sample Data...');
        
        
        // project.tasks.resources[]
        
        var tasks = [
            { id: '0', name: 'Primary Team', actual: 3494, hours: 0, forecast: 0, variance: 0, headwind: 0,
             resources: [
                      { id: 'e1234', name:'Elon Musk', rate: 98, start:'01/01/2015', end:'12/31/2015', off_time: 4.5,
                       dedicated:'1', hours: '', cost:''},
                      { id: 'b5678', name:'Bill Gates', rate: 98, start:'10/12/2015', end:'10/23/2015', off_time: 1.2,
                       dedicated:'1', hours:'', cost:''},
                      { id: 's5678', name:'Steve Jobs', rate: 98, start:'10/08/2015', end:'10/22/2015', off_time: 6.2,
                       dedicated:'.6', hours:'', cost:''}
                      ]
             },
             { id: '1', name: 'Secondary Team', actual: 9897, hours: 0, forecast: 0, variance: 0, headwind: 0, 
             resources: [
                      { id: 'l1234', name:'Larry Page', rate: 98, start:'06/01/2015', end:'12/31/2015', off_time: 4.5,
                       dedicated:'1', hours: '', cost:''},
                      { id: 'm8765', name:'Marissa Mayer', rate: 98, start:'08/20/2015', end:'10/23/2015', off_time: 1.2,
                       dedicated:'1', hours:'', cost:''}
                      ]
             },
             { id: '2', name: 'Airwatch (*FC)', actual: 28000, hours: 0, forecast: 0, variance: 0, headwind: 0, 
             resources: [
                      { id: 'NA', name:'Fixed Cost', rate: 98, start:'06/01/2015', end:'12/31/2015', off_time: 0,
                       dedicated:'1', hours: '', cost:''}
                      ]
             }
            ];
            
                                
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        
        $rootScope.project = { name: 'My Important Project', start:'01/01/2015', end:'12/31/2015', actual: 0, hours: 0, forecast: 0, months: [] };
        $rootScope.project['tasks'] = tasks;
        $rootScope.project['months'] = months;
        

    };
    
    
    // Load the Initial Data
    $rootScope.initialDataLoad();
    
    // Calculate Project Totals
    Calculator.calculateProjectTotals($rootScope.project);
    
});