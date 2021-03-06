var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    $scope.rows = [];
    
    $scope.getAllSubjects = function() {
        var data = { 
            studentNumber: $scope.studentNumberS
        }
        
	    $http.post('/getPlanOfStudy', data).then(function(response) {
	       $scope.content = response.data;
           for(var i=0; i<response.data.length; i++) {
                $scope.rows.push({
                    'year': $scope.content[i].year,
                    'semester': $scope.content[i].semester,
		            'course': $scope.content[i].course,
		            'title': $scope.content[i].title,
		            'units': $scope.content[i].units,
		            'id': $scope.content[i].id
	            });
           }
        }, function(response) {
            $scope.content = "Something went wrong";
        });
        
        $http.post('/getTotalUnits', data).then(function(response) {
	       $scope.totalUnits = response.data[0].totalNumOfUnits;
           
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    }; 
    
    $scope.getDetails = function(rowContent) {
        var rowArray = eval($scope.rows);
        for(var i=0; i<rowArray.length; i++) {
            if( rowArray[i].id === rowContent.id ) {
                $scope.titleNew = rowArray[i].title;
                $scope.unitsNew = rowArray[i].units;
                $scope.idNew = rowArray[i].id;
                break;
             }
        }
        
        $('#edit_course').openModal();
    };
    
    $scope.updateCourse = function() {               
        var data = { 
            title : $scope.titleNew,
            units : $scope.unitsNew,
            id : $scope.idNew
        }
        
	    $http.post('/updateCourse', data).then(function(response) {
           Materialize.toast('Successfully updated course!', 1000);
           
            $scope.rows = [];
            
            var data2 = { 
                studentNumber: $scope.studentNumberS
            }
            
            $http.post('/getPlanOfStudy', data2).then(function(response) {
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
            
            $http.post('/getTotalUnits', data2).then(function(response) {
               $scope.totalUnits = response.data[0].totalNumOfUnits;
               
            }, function(response) {
                $scope.content = "Something went wrong";
            });
        }, function(response) {
                $scope.content = "Something went wrong";
        });
    };
});
