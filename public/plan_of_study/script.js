var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    $scope.rows = [];
    
    $scope.getAllSubjects = function() {
        var data = { 
            studentNumber: $scope.studentNumberS
        }
        
	    $http.post('/getAllSubjects', data).then(function(response) {
	       $scope.content = response.data;
           for(var i=0; i<response.data.length; i++) {
                $scope.rows.push({
                    'year': $scope.content[i].year,
                    'semester': $scope.content[i].semester,
		            'course': $scope.content[i].course,
		            'title': $scope.content[i].title,
		            'units': $scope.content[i].units
	            });
           }
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    }; 
});
