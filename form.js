var app = angular.module('appp', []);

app.controller('formCtr', function($scope, $http){
	$scope.valid = function(param){
    	return param < 10 ? '0' + param : param;
    };
  	$scope.res = {};
    $scope.createArticle = function(){

        console.log($scope.text);
        console.log($scope.title);
        date = new Date();
        currDate = '' + $scope.valid(date.getDate()) + '-' + $scope.valid(date.getMonth()+1) + '-' + date.getFullYear();
        data = {
            "title": $scope.title,
            "text": $scope.text,
            "author": $scope.author,
            "date": currDate
        };

        $http.post("http://localhost:3000/api/articles/create", data).
        success(function(result){
            console.log(result);
        })
        .error(function(error) {
        console.log(error);
        });
        // data = {
        //     "sortField": orderField,
        //     "sortOrder": orderField
        // };
    }


});