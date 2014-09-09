function listCtrl($scope) {

	//$scope.toDoList = ["Learn AngularJS","Learn Node.js","Learn Git"];
	//$scope.completedList = ["Go to work","Shave a cat","Pee pants (not mine)"];

	$scope.toDoList = [];
	$scope.completedList = [];

	$scope.itemAdd = function (item) {
		$scope.toDoList.push(item);
		$scope.toDoItem = "";
	}

	$scope.itemRemove = function (item) {
		$scope.completedList.push(item);
		$scope.toDoList.splice($scope.toDoList.indexOf(item), 1);
	}
}