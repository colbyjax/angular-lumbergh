var lumberghControllers = angular.module('lumberghControllers',[]);

lumberghControllers.controller('LumberghController', function($scope, $location) {
    
    console.log("Controller running....");
    
    $scope.addTask = function() {
        console.log('Adding Task...');
        $scope.resources.push({id: $scope.newId, name: $scope.newName, rate: $scope.newRate, start: $scope.newStart,
                      end: $scope.newEnd, off_time: $scope.newOffTime, dedicated: $scope.newDedicated, hours:'',cost:''});
        reCalculate();
        //$location.path('/groups');
    };
    
    $scope.removeTask = function(eventId) {
        console.log("removeTask -> Event Id: " + eventId);
        var index = $scope.resources.map(function(e1) { return e1.id}).indexOf(eventId);
        $scope.resources.splice(index,1);
        
        reCalculate();
    }

    // Initializes the controller - calculates hours & cost for each resource
    var reCalculate = function() {
          console.log('Running reCalculate...');
        
          // Reset Totals
          $scope.totals.totalCost = 0;
          $scope.totals.totalHours = 0;
          $scope.totals.totalOffTime = 0;
          
          for(var key in $scope.resources)
          {
              var resource = $scope.resources[key];
              resource.hours = calculateHours(resource.start, resource.end);
              
              // Now that we have the hours, calculate the cost
              resource.cost = calculateCost(resource);
              
              // Add to Totals
              $scope.totals.totalCost += resource.cost;
              $scope.totals.totalHours += resource.hours;
              $scope.totals.totalOffTime += resource.off_time;
          }
    };
    
    
    var calculateHours = function (start, end) {
        // Calculate the number of weekdays between the two dates
        var startDate = new Date(start);
        var endDate = new Date(end);
        //console.log('Start Date: ' + start);

        var hours = workingDaysBetweenDates(startDate, endDate)*8;
        //console.log('Hours: ' + hours);
        return hours;

    };
    
    var calculateCost = function(resource) {
        //console.log('Calculating cost: ' + resource.hours + ', ' + resource.off_time + ', ' + resource.dedicated +
        //            ', ' + resource.rate);
        var cost = ((resource.hours - resource.off_time)*resource.dedicated)*resource.rate;
        //console.log('Cost: ' + cost);
        return cost;
        
    }
    
    
    var workingDaysBetweenDates = function(startDate, endDate) {

        // Validate input
        if (endDate < startDate)
            return 0;

        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0,0,0,1);  // Start just after midnight
        endDate.setHours(23,59,59,999);  // End just before midnight
        var diff = endDate - startDate;  // Milliseconds between datetime objects    
        var days = Math.ceil(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        var weeks = Math.floor(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1)         
            days = days - 2;      

        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6)
            days = days - 1  

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0)
            days = days - 1  

        return days;
    };
    
    reCalculate();
    
});
