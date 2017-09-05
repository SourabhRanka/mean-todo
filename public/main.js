
var myApp = angular.module('todo', []);

myApp.controller('ListController', function ($scope, $http) {

  $scope.getList = function () {
    $http.get('/api/todos').then(function (res) {
      $scope.list = res.data;
    }, function (err) {
      $scope.list = []
    });
  };

  $scope.addItem = function (item) {
    var parseditem = {};
    parseditem.text = item;
    if (item !== '') {
      $http.post('/api/todos', parseditem).then(function (res) {
        $scope.list = res.data;
      }, function (err) {
        console.log('cannot add item : error' + err);
      });
    }
    $scope.name = '';
  };

  $scope.removeItem = function (content) {
    var index = $scope.list.indexOf(content);
    $http.delete('/api/todos/' + $scope.list[index].text).then(function (res) {
      $scope.list = res.data;
    }, function (err) {
      console.log('cannot remove item : error' + err);
    });
  };

  $scope.resetItems = function () {
    $http.delete('/api/todos').then(function (res) {
      $scope.list = res.data;
    }, function (err) {
      console.log('cannot reset item : error' + err);
    });
  };

  $scope.enterKeyHandler = function (e) {
    if (e.which === 13) {
      $scope.addItem($scope.name);
    }
  };

  $scope.getList();
  
});