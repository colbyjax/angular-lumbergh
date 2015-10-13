var calculatorService = angular.module('CalculatorService', []);

calculatorService.service('Calculator', function() {
    this.square = function(a) {
        return a*a;
    };
    
    // Calculate Project Totals
    this.calculateProjectTotals = function(project) {
        console.log('Calculating Project Totals...');
        
        project.forecast = 0;
        project.hours = 0;
        project.actual = 0;
        
        // Calculate the Initial Totals by cycling through each task and each resource.
        for(i=0; i < project.tasks.length; i++) {
              var task = project.tasks[i];
              console.log('Calculating for task: ' + task.id);
              this.calculateResourceTotals(task);
              
              project.forecast += task.forecast;
              project.hours += task.hours;
              project.actual += task.actual;
        }  
    };
    
    
    // Calculates hours & cost for each resource
    this.calculateResourceTotals = function(currentGroup) {
          console.log('Calculating Resource Totals...');
        
          // Reset Totals
          currentGroup.hours = 0;
          currentGroup.forecast = 0;
          
          for(var key in currentGroup.resources)
          {
              var resource = currentGroup.resources[key];
              resource.hours = this.calculateResourceHours(resource.start, resource.end);
              
              // Now that we have the hours, calculate the cost
              resource.cost = this.calculateResourceCost(resource);
              
              // Add to Totals
              currentGroup.forecast += resource.cost;
              currentGroup.hours += resource.hours;
          }
    };
    
    this.calculateResourceHours = function (start, end) {
        console.log('Calculating Resource Hours...');
        // Calculate the number of weekdays between the two dates
        var startDate = new Date(start);
        var endDate = new Date(end);
        //console.log('Start Date: ' + start);

        var hours = this.workingDaysBetweenDates(startDate, endDate)*8;
        //console.log('Hours: ' + hours);
        return hours;

    };
    
    this.calculateResourceCost = function(resource) {
        //console.log('Calculating cost: ' + resource.hours + ', ' + resource.off_time + ', ' + resource.dedicated +
        //            ', ' + resource.rate);
        var cost = ((resource.hours - resource.off_time)*resource.dedicated)*resource.rate;
        //console.log('Cost: ' + cost);
        return cost;
        
    }
    
    
    // Function that calculates the number of Working Days between a start and end date
    this.workingDaysBetweenDates = function(startDate, endDate) {

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
});