var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

	function listCtrl($scope, $http) {

		//$scope.formData = {};
		$scope.completedList = [];

		//loop through mongodb array and push the to-do strings into client array (to-do list)
		function loadList(data) {
			$scope.toDoList = [];
			angular.forEach(data, function(value, key){
				//console.log(key + ' ' ,value);
				$scope.toDoList.push(value.item);
			});
		}

		function logError(data) {
			console.log('Error: ' + data);
		}

		//retrieve existing to-dos upon landing on page
		$http.get('/api/items')
			.success(function(data) {
				loadList(data);
			})
			.error(function(data) {
				logError(data);
			});

		$scope.itemAdd = function() {
			var item = {};
			item.text = $scope.toDoItem;
			console.log(item.text);

			$http.post('/api/items', item)
				.success(function(data) {
					loadList(data);
				})
				.error(function(data) {
					logError(data);
				});
		};

		$scope.itemRemove = function(id) {

			$scope.completedList.push(id); //display completed items for this session

			$http.delete('/api/items/' + id)
				.success(function(data) {
					loadList(data);
				})
				.error(function(data) {
					logError(data);
				});
		};

	}

]);