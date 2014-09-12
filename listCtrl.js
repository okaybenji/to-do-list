var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

	function listCtrl($scope, $http) {

		$scope.completedList = [];

		//loop through mongodb array and push the to-do items into the to-do list;
		//this will reload entire list each call -- not the best for performance, but keeps it simple to code [:
		function loadList(data) {
			$scope.toDoList = [];
			angular.forEach(data, pushItem);
		}

		//push to-do item (string and identifiers) into client array (to-do list)
		function pushItem(value, key) {
			$scope.toDoList.push({item:value.item, id:value._id});
		}

		function logError(data) {
			console.log('Error: ' + data);
		}

		//retrieve existing to-dos upon landing on page
		$http.get('/api/items').success(loadList).error(logError);

		//add new item on demand
		$scope.itemAdd = function(newItem) {
			var item = {};
			item.text = newItem;
			$http.post('/api/items', item).success(loadList).error(logError);
			$scope.newItem = ""; //clear input box
		};

		//remove item on demand
		$scope.itemRemove = function(toDoItem) {
			$scope.completedList.push(toDoItem.item); //add to array of completed items for this session
			$http.delete('/api/items/' + toDoItem.id).success(loadList).error(logError);
		};

		//allow searching for new item in to-do list to prevent user from adding same thing twice
		$scope.inList = function() {
			if ($scope.toDoList) {
				return $.grep($scope.toDoList, function(e) {return e.item == $scope.newItem});
			}
		}

	}

]);