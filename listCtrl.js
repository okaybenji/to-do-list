var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

	function listCtrl($scope, $http) {

		$scope.completedList = [];
		$scope.toDoList = [];
		$scope.newItem = "";

		//loop through mongodb array and push the to-do strings and identifiers into client array (to-do list)
		function loadList(data) {
			$scope.toDoList = [];
			angular.forEach(data, function(value, key){
				$scope.toDoList.push({item:value.item, id:value._id});
			});
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

		$scope.itemRemove = function(toDoItem) {
			$scope.completedList.push(toDoItem.item); //display completed items for this session (from completedList array)
			$http.delete('/api/items/' + toDoItem.id).success(loadList).error(logError);
		};

		//allow searching for new item in to-do list to prevent user from adding same thing twice
		$scope.indexOfObject = function(array, property, value) {

			if(array.length) {
				for(var i=0; i<array.length; i++) {
					//console.log(array[i][property]);
					if (array[i][property] == value) {
						return i;
						console.log(i);
					}
				}
			}
			return -1;
		}

	}

]);