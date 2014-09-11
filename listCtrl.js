var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

	function listCtrl($scope, $http) {

		$scope.completedList = [];

		//loop through mongodb array and push the to-do strings and identifiers into client array (to-do list)
		function loadList(data) {
			$scope.toDoList = [];
			angular.forEach(data, function(value, key){
				//console.log(key,value.item,value._id);
				$scope.toDoList.push({item:value.item, id:value._id});
			});
		}

		function logError(data) {
			console.log('Error: ' + data);
		}

		//allow searching for new item in to-do list to prevent user from adding same thing twice
		function objectIndexOf(array, searchTerm, property) {
			for(var i=0; i<array.length; i++) {
				if (array[i][property] === searchTerm) {
					return i;
				}
			}
			return -1;
		}

		//retrieve existing to-dos upon landing on page
		$http.get('/api/items')
			.success(function(data) {
				loadList(data);
			})
			.error(function(data) {
				logError(data);
			});

		$scope.itemAdd = function(newItem) {
			var item = {};
			item.text = newItem;
			//console.log(item.text);

			$http.post('/api/items', item)
				.success(function(data) {
					loadList(data);
				})
				.error(function(data) {
					logError(data);
				});

				$scope.newItem = ""; //clear input box
		};

		$scope.itemRemove = function(toDoItem) {

			$scope.completedList.push(toDoItem.item); //display completed items for this session

			$http.delete('/api/items/' + toDoItem.id)
				.success(function(data) {
					loadList(data);
				})
				.error(function(data) {
					logError(data);
				});

		};

	}

]);