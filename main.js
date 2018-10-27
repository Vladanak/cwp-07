var app = angular.module('app', []);



app.controller('ctr', function($scope, $http){
    $http.get("http://localhost:3000/api/articles/readall").
    success(function(result){
        console.log(result);
        $scope.articles = result.items;
    }).
    error(function(error) {
        console.log(error);
    });


    $scope.reload = function(orderField, orderBy){
        console.log(orderBy);
        console.log(orderField);
        data = {
            "sortField": orderField,
            "sortOrder": orderField
        };

        $http.post("http://localhost:3000/api/articles/readall", data).
        success(function(result){
            console.log(result);
            $scope.articles = result.items;
        }).
        error(function(error) {
        console.log(error);
    });
    }

});