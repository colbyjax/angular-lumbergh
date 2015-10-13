var lumberghControllers = angular.module('lumberghControllers',[]);

lumberghControllers.controller('GroupController', function($scope, $routeParams, Calculator) {
    
    console.log("Group Controller running....");
    $scope.currentGroup = $scope.project.tasks[$routeParams.groupId];
    
    $scope.addTask = function() {
        console.log('Adding Task...');
        $scope.currentGroup.resources.push({id: $scope.newId, name: $scope.newName, rate: $scope.newRate, start: $scope.newStart,
                      end: $scope.newEnd, off_time: $scope.newOffTime, dedicated: $scope.newDedicated, hours:'',cost:''});
         Calculator.calculateProjectTotals($scope.project);
    };
    
    $scope.removeTask = function(eventId) {
        console.log("removeTask -> Event Id: " + eventId);
        var index = $scope.currentGroup.resources.map(function(e1) { return e1.id}).indexOf(eventId);
        $scope.currentGroup.resources.splice(index,1);
        
         //Calculator.calculateResourceTotals($scope.currentGroup);
        Calculator.calculateProjectTotals($scope.project);
    }
    
});



lumberghControllers.controller('MonthController', function($scope, $routeParams, Calculator) {
    console.log('Month Controller running...');
    
    $scope.removeTask = function(eventId) {
        console.log("removeTask -> Event Id: " + eventId);
        var index = $scope.project.tasks.map(function(e1) { return e1.id}).indexOf(eventId);
        $scope.project.tasks.splice(index,1);
        
         //Calculator.calculateResourceTotals($scope.currentGroup);
        Calculator.calculateProjectTotals($scope.project);
    }
    
});