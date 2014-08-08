var app = angular.module('app', ['ngResource','lbServices']);

app.controller('TaskController', [
  '$scope',
  'Task',
  function($scope, Task) {

    $scope.newTask = {};
    $scope.tasks = Task.query();

    //Add New Employee
    $scope.addNewTask = function(task_type) {
      
      //LoopBack Angular SDK goodness
      Task.create(task_type,
        // success
        function(response){
          $scope.newTask = {};
          $scope.tasks = Task.query();
          console.log('good add employee: ' + JSON.stringify(response));
        },
        // error
        function(response){
          console.log('bad add employee: ' + JSON.stringify(response));
        }
      );
    };

    //Set Employee Completed State
    $scope.setCompleted = function(task_type){
      
      //LoopBack Angular SDK goodness
      Task.upsert(task_type,
        // success
        function(response){
          console.log('good employee update: ' + JSON.stringify(response));
        },
        // error
        function(response){
          console.log('bad employee update: ' + JSON.stringify(response));
        }
      );
    };
  }
]);
